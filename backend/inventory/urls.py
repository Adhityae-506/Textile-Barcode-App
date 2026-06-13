from django.contrib import admin
from django.urls import path
from .views import FabricViewSet, RollViewSet, DispatchViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("fabrics",FabricViewSet)
router.register("barcode",RollViewSet)
router.register("dispatch",DispatchViewSet)


urlpatterns = router.urls
