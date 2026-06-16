from django.shortcuts import render
from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.db import transaction
from django.db.models import Max, Sum, Q, F

from .models import Fabric,Barcode,Roll, Dispatch
from .serializer import FabricSerializer, RollSerializer, DispatchSerializer
from django.db.models.functions import ExtractMonth
from django.db.models.functions import TruncMonth
from .utils import get_financial_year,create_dispatch

from barcode import Code128
from barcode.writer import ImageWriter
from io import BytesIO
from django.http import HttpResponse
from datetime import timedelta

class DispatchPagination(PageNumberPagination): # Serve-side pagination done in Dispatch list section
    page_size = 7

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
    
    @action( detail=False, methods=["get"] )
    def stock_distribution(self, request):

        fabrics = Fabric.objects.order_by("-stock")

        top_five = fabrics[:5]
        remaining = fabrics[5:]

        chart_data = []

        for fabric in top_five:

            chart_data.append({
                "name": fabric.type,
                "value": fabric.stock
            })

        others_stock = sum(
            fabric.stock
            for fabric in remaining
        )

        if others_stock > 0:

            chart_data.append({
                "name": "Others",
                "value": others_stock
            })

        return Response(chart_data)
    


        
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

        Fabric.objects.filter(
                id=roll_obj.fabric_type_id
        ).update(
                stock=F('stock') + roll_obj.meters
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
    
    @action(detail=False, methods=["get"]) # Used in Barcode section to list out barcode
    def list_barcode(self, request):

        rolls = Roll.objects.filter(
            dispatch_status="not_dispatched"
        ).select_related(
                "barcode",
                "fabric_type"
        ).order_by("-id")

        serializer = self.get_serializer(
            rolls,
            many=True
        )

        return Response(serializer.data)

    

class DispatchViewSet(ModelViewSet):
    queryset = Dispatch.objects.all()
    serializer_class = DispatchSerializer
    pagination_class = DispatchPagination


    @action(
        detail=False,
        methods=["get"]
    )
    def recent_dispatch(self,request):

        queryset = Dispatch.objects.order_by(
            "-dispatched_at"
        )[:5]
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # Used to obtained filtered data using their month for dispatch list section
    @action(
        detail=False,
        methods=["get"]
    )
    def by_month(self, request):

        month = request.GET.get("month")
        queryset = Dispatch.objects.all()
        if month:
            queryset = queryset.filter(
                dispatched_at__month=month
            )

        page = self.paginate_queryset(
            queryset.order_by("-dispatched_at")
        )

        serializer = DispatchSerializer(
            page,
            many=True
        )

        return self.get_paginated_response(
            serializer.data
        )

    #USed to obtain the available financial months for filtering in the Dispatch list section (Data in the drop down box for month)
    @action(
        detail=False,
        methods=["get"]
    )
    def available_months(self, request):

        months = (
            Dispatch.objects
            .annotate(
                month=TruncMonth("dispatched_at")
            )
            .values(
                "month",
                "financial_year"
            )
            .distinct()
            .order_by("-month")
        )   

        data = []

        for item in months:

            data.append({
                "month": item["month"].month,
                "year": item["month"].year,
                "financial_year": item["financial_year"],
                "label": (
                    f"{item['month'].strftime('%B %Y')} "
                    f"(FY {item['financial_year']})"
                )
            })
        return Response(data)


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
    def preview(self, request):

        barcodes = request.data.get(
            "barcodes",
            []
        )

        customer_name = request.data.get(
            "customer_name"
        )

        vehicle_no = request.data.get(
            "vehicle_no"
        )

        fabric_type_id = request.data.get(
            "fabric_type"
        )

        rolls_data = []

        total_meters = 0
        total_weight = 0

        for index, barcode_value in enumerate(barcodes, start=1):

            try:

                barcode = Barcode.objects.select_related(
                    "roll",
                    "roll__fabric_type"
                ).get(
                    barcode=barcode_value
                )

            except Barcode.DoesNotExist:

                continue

            roll = barcode.roll

            rolls_data.append({

                "sno": index,

                "roll_no": roll.roll_no,

                "machine_no": roll.machine_no,

                "weight": roll.weight,

                "meters": roll.meters,

                "gram":
                    round(
                        roll.weight / roll.meters,
                        3
                    )
                    if roll.meters else 0

            })

            total_meters += roll.meters
            total_weight += roll.weight

        fabric_name = ""

        if fabric_type_id:

            fabric = Fabric.objects.get(
                id=fabric_type_id
            )

            fabric_name = fabric.type

        return Response({

            "customer_name": customer_name,

            "vehicle_no": vehicle_no,

            "fabric_name": fabric_name,

            "total_rolls": len(rolls_data),

            "total_meters": total_meters,

            "total_weight": total_weight,

            "rolls": rolls_data

        })


    @action(
        detail=False,
        methods=["post"]
    )
    def confirm_dispatch(self, request):

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

        total_meters = request.data.get(
            "total_meters",
            0
        )

        total_weight = request.data.get(
            "total_weight",
            0
        )

        total_rolls = request.data.get(
            "total_rolls",
            0
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
                fabric_type_id,
                total_meters,
                total_weight,
                total_rolls
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

                Fabric.objects.filter(
                    id=roll.fabric_type_id
                ).update(
                    stock=F('stock') - roll.meters
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
        


class DashboardAPIView(APIView):

    def get(self, request):

        # Bar Chart Data
        one_months_ago = (
            timezone.now().date()
            - timedelta(days=30)
        )

        top_fabrics = (
            Fabric.objects
            .annotate(

                dispatched=Sum(
                    "rolls__meters",
                    filter=Q(
                        rolls__dispatch_status="dispatched",
                        rolls__date__gte=one_months_ago
                    )
                ),

                remaining=Sum(
                    "rolls__meters",
                    filter=Q(
                        rolls__dispatch_status="not_dispatched",
                        rolls__date__gte=one_months_ago
                    )
                )

            )
            .order_by("-remaining")[:10]
        )

        production_chart = []

        for fabric in top_fabrics:

            

            dispatched = fabric.dispatched or 0
            remaining = fabric.remaining or 0

            production_chart.append({

                "fabric": fabric.type,

                "dispatched": dispatched,

                "remaining": remaining,

            })

        return Response(production_chart)