from datetime import datetime
from ninja import Schema


class CreateRecipeSchema(Schema):
    slug: str
    imageURL: str
    title: str
    description: str
    cooking_time: int
    prep_time: int
    servings: int
    ingredients: list[str]
    steps: list[str]
    rating: float


class GetRecipeSchema(Schema):
    slug: str
    imageURL: str
    title: str
    description: str
    cooking_time: int
    prep_time: int
    servings: int
    ingredients: list[str]
    steps: list[str]
    rating: float
    created_at: datetime
    updated_at: datetime


class GetAllRecipeSchema(Schema):
    slug: str
    title: str
    description: str
    imageURL: str
    rating: float
    created_at: datetime
    updated_at: datetime
