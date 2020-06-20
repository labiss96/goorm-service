from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# from django.utils.translation import gettext as _

import datetime

class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, username, password):
        user = self.model(
            email = self.normalize_email(email),            
            username = username
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # def create_staffuser(self, username, email, password):
    #     user = self.create_user(
    #         username=username,
    #         email=email,
    #         password=password,
    #     )
    #     user.staff = True
    #     user.save(using=self._db)
    #     return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email = self.normalize_email(email),
            username=username,
            password=password,
        )
        user.is_admin = True        
        user.is_superuser = True        
        user.is_staff = True    
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):

    objects = UserManager()

    username = models.CharField(max_length=100, unique=True)
    # email = models.EmailField(_('email address'), unique=True)
    email = models.EmailField(max_length=255, unique=True)
    # date_of_birth = models.DateField(default=datetime.date.today)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    is_active = models.BooleanField(default=True)    
    is_admin = models.BooleanField(default=False)    
    is_superuser = models.BooleanField(default=False)    
    is_staff = models.BooleanField(default=False)     
    date_joined = models.DateTimeField(auto_now_add=True) 
    

    def __str__(self):
        return self.username


