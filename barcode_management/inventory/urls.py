from django.contrib import admin
from django.urls import path
from .views import FabricViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("fabrics",FabricViewSet)


urlpatterns = router.urls
