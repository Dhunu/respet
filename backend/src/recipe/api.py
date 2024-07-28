from typing import List

from django.shortcuts import get_object_or_404
from ninja import Router

from .models import Recipe
from .schemas import CreateRecipeSchema, GetRecipeSchema, GetAllRecipeSchema


router = Router()


@router.post("", response=CreateRecipeSchema)
def create_recipe(request, data: CreateRecipeSchema):
    obj = Recipe.objects.create(**data.dict())
    return obj


@router.get("{slug}/", response=GetRecipeSchema)
def get_recipe(request, slug: str):
    obj = get_object_or_404(Recipe, slug=slug)
    return obj


@router.get("", response=List[GetAllRecipeSchema])
def get_all_recipes(request):
    return Recipe.objects.all()
