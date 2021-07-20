from toDo.models import Todo
from rest_framework import serializers
from django.contrib.auth.models import User


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'text', 'status']


class UserSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True)

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'todos']
