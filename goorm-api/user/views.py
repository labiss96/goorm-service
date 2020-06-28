# from django.shortcuts import render
import json
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from knox.models import AuthToken
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(["POST"])
def CertifyAPI(request):
    json_userdata = request.body
    userdata = json.loads(json_userdata)

    birth = userdata['birth'].split('-')
    user_id = userdata['user_id']
    name = userdata['name']
    
    # print(birth)
    
    year = birth[0]
    month = birth[1]
    day = birth[2]

    user_object = User.objects.get(id=user_id)

    if int(year) < 2001:
        user_object.user_type = 'member'
        user_object.save()
        print(user_object)
        return Response({'result' : 'accept'})
    else:
        return Response({'result' : 'reject'})   


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        if len(request.data["username"]) < 6 or len(request.data["password"]) < 4:
            body = {"message": "short field"}
            return Response(body, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user 