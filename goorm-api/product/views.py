from rest_framework import viewsets
from .models import Brand,Tobacco, Review
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import BrandSerializer,TobaccoSerializer, ReviewSerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class TobaccoViewSet(viewsets.ModelViewSet):
    queryset = Tobacco.objects.all()
    serializer_class = TobaccoSerializer

    @action(methods=['get'], detail=True, url_path='get_reviews', url_name='get_reviews')
    def get_reviews(self, request, *args, **kwargs):
        tobacco = self.get_object()
        reviews = Review.objects.filter(tobacco=tobacco)

        print(reviews)

        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer    