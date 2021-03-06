from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('brand', views.BrandViewSet)
router.register('tobacco', views.TobaccoViewSet)
router.register('review', views.ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
