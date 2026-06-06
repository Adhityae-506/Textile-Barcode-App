from django.contrib import admin
from django.urls import path
from .views import FabricViewSet, BarcodeViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("fabrics",FabricViewSet)
router.register("barcode",BarcodeViewSet)


urlpatterns = router.urls
