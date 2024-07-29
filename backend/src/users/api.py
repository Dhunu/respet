from django.shortcuts import get_object_or_404
from ninja import Router

from .models import User
from .schemas import CreateUserSchema, GetUserSchema, GetAllUserSchema
