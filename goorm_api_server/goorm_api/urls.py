from django.contrib import admin
from django.urls import path, include
import product.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('product/',include(product.urls)),
]

