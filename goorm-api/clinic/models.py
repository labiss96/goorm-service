from django.db import models

# Create your models here.
class Clinic(models.Model):
    title = models.CharField(max_length=200)
    contents = models.TextField()
    provider = models.CharField(max_length=50)    
    amount = models.IntegerField(blank=True)
    url = models.URLField(max_length=200, null=True)
    
    def __str__(self):
        return self.title