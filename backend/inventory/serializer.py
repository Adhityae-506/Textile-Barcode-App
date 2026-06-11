from rest_framework import serializers
from .models import Fabric, Barcode

class FabricSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Fabric
        fields = "__all__"

class BarcodeSerializer(serializers.ModelSerializer):

    fabric_name = serializers.CharField(
        source='fabric_type.type',
        read_only=True
    )
    
    class Meta:
        model = Barcode

        fields = [
            "id",
            "fabric_type",
            'fabric_name',
            "machine_no",
            "meters",
            "weight",
            "barcode",
            "roll_no"
        ]

        read_only_fields = [
            "barcode",
            "roll_no"
        ]