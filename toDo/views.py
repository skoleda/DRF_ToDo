from django.shortcuts import render
from rest_framework import viewsets, generics
from toDo.models import Todo
from django.contrib.auth.models import User
from toDo.serializers import TodoSerializer, UserSerializer
# from toDo.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
