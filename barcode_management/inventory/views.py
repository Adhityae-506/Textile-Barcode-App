from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Fabric,Barcode
from .serializer import FabricSerializer, BarcodeSerializer

from barcode import Code128
from barcode.writer import ImageWriter

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
        
class BarcodeViewSet(ModelViewSet):
    queryset = Barcode.objects.all()
    serializer_class = BarcodeSerializer

    def perform_create(self,serializer):
        barcode_obj = serializer.save()
        print("ID =", barcode_obj.id)
        barcode_obj.barcode = f"FAB{barcode_obj.id:06d}"
        barcode_obj.save()
        return Response(
                {"message" : "Barcode created"},
                status = status.HTTP_200_OK
            )
    @action(detail = True, methods=["get"])
    def generatebarcode(self, request, pk=None):

        barcode_obj = self.get_object()

        img = Code128(barcode_obj.barcode, writer=ImageWriter())
        img.save(f"barcodes/{barcode_obj.barcode}")

        return Response(
                {"message" : "Barcode Generated"},
                status = status.HTTP_200_OK
            )