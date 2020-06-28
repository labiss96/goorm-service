from django.db import models
from user.models import User

class Brand(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Tobacco(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='tobacco')
    name = models.CharField(max_length=50)
    price = models.IntegerField(blank=True)
    nicotine =  models.FloatField()
    tar = models.FloatField()
    throat_hit = models.CharField(max_length=10)
    is_menthol = models.BooleanField(default = False)
    
    def __str__(self):
        return self.name


class Review(models.Model):
    tobacco = models.ForeignKey(Tobacco, on_delete = models.CASCADE, related_name= 'reviews')
    writer = models.ForeignKey(User, on_delete = models.CASCADE, related_name= 'writer')
    pub_date = models.DateTimeField(auto_now_add= True)
    contents = models.TextField()
    score = models.PositiveIntegerField(default=3)