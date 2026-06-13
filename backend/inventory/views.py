from django.shortcuts import render
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.db import transaction
from django.db.models import Max

from .models import Fabric,Barcode,Roll, Dispatch
from .serializer import FabricSerializer, RollSerializer, DispatchSerializer
from .utils import get_financial_year,create_dispatch

from barcode import Code128
from barcode.writer import ImageWriter
from io import BytesIO
from django.http import HttpResponse


class FabricViewSet(ModelViewSet):
    queryset = Fabric.objects.all()
    serializer_class = FabricSerializer

    def perform_create(self,serializer):
        fabric = serializer.save()
        fabric.save()
        return Response(
            {"message" : "New Fabric created"},
            status = status.HTTP_200_OK
        )
        
class RollViewSet(ModelViewSet):
    queryset = Roll.objects.all()
    serializer_class = RollSerializer

    def perform_create(self,serializer):

        now = timezone.now()

        year = now.year
        month = now.month

        last_sequence = Roll.objects.filter(
            date__year=year
        ).aggregate(
            max_seq=Max('sequence_no')
        )['max_seq']

        next_sequence = 1


        if last_sequence:
            next_sequence = last_sequence + 1
        

        roll_obj = serializer.save(
            sequence_no=next_sequence
        )
        
        roll_no = (
            f"{year}"
            f"{month:02d}"
            f"{next_sequence:06d}"
        )

        roll_obj.roll_no = roll_no

        roll_obj.save()

        Barcode.objects.create(
            roll=roll_obj,
            barcode=f"ST{roll_no}"
        )

        return Response(
                {"message" : "Barcode created"},
                status = status.HTTP_200_OK
            )
    
    @action(detail=True, methods=["get"])
    def preview(self, request, pk=None):

        roll_obj = self.get_object()

        barcode_obj = roll_obj.barcode

        buffer = BytesIO()


        barcode = Code128(
            barcode_obj.barcode,
            writer=ImageWriter()
        )

        barcode.write(buffer)

        buffer.seek(0)

        return HttpResponse(
            buffer.getvalue(),
            content_type="image/png"
        )
    

class DispatchViewSet(ModelViewSet):
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer

    def perform_create(self,serializer):

        fy = get_financial_year()

        max_seq = Dispatch.objects.filter(
            financial_year=fy
        ).aggregate(
            max_sequence=Max('sequence_no')
        )['max_sequence']

        next_seq = 1 if max_seq is None else max_seq + 1
        
        dispatch_no = f"{fy}{next_seq:04d}"

        serializer.save(
            financial_year=fy,
            sequence_no=next_seq,
            dispatch_no=dispatch_no
        )

    @action( 
        detail=False,
        methods=["post"]
    )

    def add_roll(self, request):

        barcode_value = request.data.get( "barcode" )
        fabric_type_id = int(request.data.get("fabric_type")) #If frontend send string converts to int

        try:
            barcode = Barcode.objects.select_related(
                "roll",
                "roll__fabric_type"
            ).get(barcode=barcode_value)

        except Barcode.DoesNotExist:

            return Response(
                {"error":"Barcode not found"},
                status=400
            )
        
        roll = barcode.roll

        if (roll.fabric_type.id != fabric_type_id):

            return Response({
                    "error" : "Mismatching Fabric type"
                },status=400
            )
        
        if roll.dispatch_status == "dispatched":

            return Response({
                    "error":"Roll already dispatched"
                },status=400
            )
        
        return Response({
            "id": roll.id,
            "roll_no": roll.roll_no,
            "meters": roll.meters,
            "weight": roll.weight,
            "barcode": barcode.barcode,
            "fabric_name": roll.fabric_type.type
        })

    @action(
        detail=False,
        methods=["post"]
    )
    def finalize(self, request):

        customer_name = request.data.get(
            "customer_name"
        )

        vehicle_no = request.data.get(
            "vehicle_no"
        )

        fabric_type_id = request.data.get(
            "fabric_type"
        )

        barcodes = request.data.get(
            "barcodes",
            []
        )

        if not barcodes:

            return Response(
                {
                    "error":
                    "No rolls selected"
                },
                status=400
            )

        with transaction.atomic():

            # Create Dispatch
            dispatch = create_dispatch(
                customer_name,
                vehicle_no,
                fabric_type_id
            )

            for barcode_value in barcodes:

                try:

                    barcode = Barcode.objects.select_related(
                        "roll",
                        "roll__fabric_type"
                    ).get(
                        barcode=barcode_value
                    )

                except Barcode.DoesNotExist:

                    raise ValidationError(
                        f"{barcode_value} not found"
                    )

                roll = barcode.roll

                # Fabric validation
                if (
                    roll.fabric_type_id
                    != fabric_type_id
                ):

                    raise ValidationError(
                        f"{roll.roll_no} fabric mismatch"
                    )

                # Already dispatched
                if roll.dispatch_status == "dispatched":

                    raise ValidationError(
                        f"{roll.roll_no} already dispatched"
                    )

                roll.dispatch_status = "dispatched"
                roll.dispatched = dispatch

                roll.save()

                barcode.delete()

            return Response({
                "message":
                "Dispatch completed",
                "dispatch_no":
                dispatch.dispatch_no
            })