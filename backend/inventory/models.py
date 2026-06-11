from django.db import models

# Create your models here.

class Fabric(models.Model):
    type = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.type

    
class Barcode(models.Model):
    fabric_type = models.ForeignKey(
        Fabric,
        on_delete = models.CASCADE,
        related_name = 'barcodes'
    )
    barcode = models.CharField(max_length=50,blank=True)
    roll_no = models.CharField(
                unique=True, 
                blank=True,
                null=True
            )
    sequence_no = models.IntegerField(
        blank=True,
        null=True
    )
    machine_no = models.IntegerField()
    meters = models.IntegerField()
    weight = models.IntegerField()
    date = models.DateField(auto_now_add=True)
    dispatched = models.CharField( max_length = 15,
            default = 'not_dispatched',
            choices = [
                ('not_dispatched', 'Yet to dispatch'),
                ('dispatched', 'Dispatched')
            ]
        )

    
    def __str__(self):
        return self.roll_no
    
