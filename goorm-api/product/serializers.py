from rest_framework import serializers
from .models import Brand,Tobacco, Review

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class TobaccoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tobacco
        # depth=1
        # fields = ('brand', 'id', 'name', 'price', 'nicotine', 'tar', 'throat_hit', 'is_menthol', 'reviews')
        fields = ('__all__')    

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review        
        fields = ('__all__')