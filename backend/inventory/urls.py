from django.contrib import admin
from django.urls import path, include
from .views import FabricViewSet, RollViewSet, DispatchViewSet, DashboardAPIView, login_view, logout_view, auth_check
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register("fabrics",FabricViewSet)
router.register("barcode",RollViewSet)
router.register("dispatch",DispatchViewSet)


urlpatterns = [
    
    path(
        "",
        include(router.urls)
    ),

    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),
     path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    path(
        "logout/",
        logout_view,
        name="logout"
    ),

    path(
        "auth/check/",
          auth_check
    ),

    path(
        "dashboard/",
        DashboardAPIView.as_view(),
        name="dashboard"
    ),
    

]