from datetime import datetime
from ninja import Schema


class CreateUserSchema(Schema):
    name: str
    email: str
    password: str


class GetUserSchema(Schema):
    name: str
    email: str
    is_staff: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime
