from rest_framework import serializers
from .models import Fabric, Barcode

class FabricSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Fabric
        fields = "__all__"

class BarcodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Barcode
        fields = "__all__"