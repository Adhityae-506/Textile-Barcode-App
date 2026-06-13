from django.contrib import admin
from django.urls import path
from .views import FabricViewSet, RollViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("fabrics",FabricViewSet)
router.register("barcode",RollViewSet)


urlpatterns = router.urls
