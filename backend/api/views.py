from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import *
from .serializers import *
# Create your views here.
from .models import *
from rest_framework.parsers import MultiPartParser, FormParser


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class HomePageView(generics.RetrieveUpdateAPIView):
    serializer_class = HomePageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_object(self):
        return HomePage.objects.first()
    
class ProjectView(generics.ListCreateAPIView):
    queryset = Project.objects.all().prefetch_related('phases', 'gallery', 'challenges')
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]
    def perform_create(self, serializer):
        serializer.save()

class ProjectEditView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all().prefetch_related('phases', 'gallery', 'challenges')
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'

class TeamMemberView(generics.ListCreateAPIView):
    queryset = TeamMember.objects.all().order_by('order')
    serializer_class = TeamMemberSerializer
    permission_classes = [AllowAny]

class TeamMemberRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'
