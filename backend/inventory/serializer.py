from rest_framework import serializers
from .models import Fabric, Roll, Dispatch

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
            "barcode",
            "dispatch_status",
        ]

        read_only_fields = [
            "roll_no",
            "barcode"
        ]

class DispatchSerializer(serializers.ModelSerializer):

    fabric_name = serializers.CharField(
        source="fabric_type.type",
        read_only=True
    )

    class Meta:
        model = Dispatch

        fields = [
            "id",
            "dispatch_no",
            "customer_name",
            "vehicle_no",
            "dispatched_at",
            "fabric_type",
            "fabric_name",
            "total_rolls",
            "total_meters",
            "total_weight"
        ]

        read_only_fields = [
            "dispatch_no"
        ]