from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):  
    ADMIN = "admin"
    NON_MEMBER = "non-member"
    MEMBER = "member"
    STATUS = (
        (ADMIN, "admin"),
        (NON_MEMBER, "non-member"),
        (MEMBER, "member"),
    )
    user_type = models.CharField(max_length=15, choices=STATUS, default=NON_MEMBER)
    # img = models.ImageField(upload_to='images/', default='../static/images/default_profile_img.png')