from django.db import models

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
    isMenthol = models.BooleanField(default = False)
    
    def __str__(self):
        return self.name