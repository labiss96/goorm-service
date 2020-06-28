from django.urls import path, include
from django.contrib import admin
from knox import views as knox_views
from user.views import RegistrationAPI, LoginAPI, UserAPI, CertifyAPI
import product.urls
import clinic.urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/logout/", knox_views.LogoutView.as_view(), name='knox_logout'),
    path("auth/user/", UserAPI.as_view(),name="token_validate"),
    path('product/',include(product.urls)),
    path('service/',include(clinic.urls)),
    path('certify/', CertifyAPI),
]
