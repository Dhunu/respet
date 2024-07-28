from ninja import NinjaAPI, Schema

from ninja_extra import NinjaExtraAPI
from ninja_jwt.authentication import JWTAuth
from ninja_jwt.controller import NinjaJWTDefaultController

api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)
api.add_router("/recipe/", "recipe.api.router")


@api.get("/hello")
def hello(request):
    return {
        # "user": {
        #     "name": "Angel Saikia",
        #     "emails": [
        #         {
        #             "email": "angelsaikia333@gmail.com"
        #         },
        #         {
        #             "email": "developer@angelsaikia.com"
        #         }
        #     ]
        # }
        "message": "Hello World"
    }
