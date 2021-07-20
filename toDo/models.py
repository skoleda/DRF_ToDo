from django.db import models


# Create your models here.

class Todo(models.Model):
    owner = models.ForeignKey('auth.User', related_name='todos', on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=120)
    status = models.BooleanField(default=False)
