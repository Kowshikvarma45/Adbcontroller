from django.urls import path
from .views import getAdbdevices,togglewifi,restartapp,connectwifi,scannetworks

urlpatterns = [
    path('getadbdevices/',getAdbdevices),
    path('togglewifi/',togglewifi),
    path('restartapp/',restartapp),
    path('connectwifi/',connectwifi),
    path('scan/',scannetworks)
]
