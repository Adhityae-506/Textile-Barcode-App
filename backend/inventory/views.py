from django.shortcuts import render
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.db.models import Max

from .models import Fabric,Barcode, Roll
from .serializer import FabricSerializer, RollSerializer

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
    