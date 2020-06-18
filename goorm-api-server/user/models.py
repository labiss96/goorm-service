from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext as _

import datetime

class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, name, date_of_birth, password=None):
        user = self.model(
            email=self.normalize_email(email),
            date_of_birth=date_of_birth,
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, name, date_of_birth, password):
        user = self.create_user(
            email,
            password=password,
            date_of_birth=date_of_birth,         
            name=name,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, date_of_birth, password):
        user = self.create_user(
            email,
            password=password,
            date_of_birth=date_of_birth,
            name= "True",
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):

    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField(default=datetime.date.today)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'date_of_birth','name' ]

    objects = UserManager()

    def __str__(self):
        return self.email


