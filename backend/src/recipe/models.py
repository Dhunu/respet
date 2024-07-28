from django.db import models
from django.contrib.postgres.fields import ArrayField


class Recipe(models.Model):
    # user =
    slug = models.SlugField(max_length=255)
    imageURL = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField()
    cooking_time = models.IntegerField()
    prep_time = models.IntegerField()
    servings = models.IntegerField()
    ingredients = ArrayField(models.TextField())
    steps = ArrayField(models.TextField())
    rating = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
