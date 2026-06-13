from rest_framework import serializers
from .models import Fabric, Roll

class FabricSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Fabric
        fields = "__all__"

class RollSerializer(serializers.ModelSerializer):

    fabric_name = serializers.CharField(
        source='fabric_type.type',
        read_only=True
    )

    barcode = serializers.CharField(
        source='barcode.barcode',
        read_only=True
    )
    
    class Meta:
        model = Roll

        fields = [
            "id",
            "fabric_type",
            'fabric_name',
            "machine_no",
            "meters",
            "weight",
            "roll_no",
            "barcode"
        ]

        read_only_fields = [
            "roll_no",
            "barcode"
        ]