from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = '__all__'

class PhaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Phase
        fields = ['title', 'description', 'order']
    
class ProjectGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectGallery
        fields = ['image', 'order']
class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ['title', 'description', 'solution']

    
    
class ProjectSerializer(serializers.ModelSerializer):
    phases = PhaseSerializer(many=True, required=False)
    gallery = ProjectGallerySerializer(many=True, required=False)
    challenges = ChallengeSerializer(many=True, required=False)
    class Meta:
        model = Project
        fields = '__all__'
    
    def create(self, validated_data):
        phases_data = validated_data.pop('phases', [])
        gallery_data = validated_data.pop('gallery', [])
        challenge_data = validated_data.pop('challenges', [])
        project = Project.objects.create(**validated_data)
        
        for phase_data in phases_data:
            Phase.objects.create(project=project, **phase_data)
        
        for gallery_data in gallery_data:
            ProjectGallery.objects.create(project=project, **gallery_data)

        for challenge_data in challenge_data:
            Challenge.objects.create(project=project, **challenge_data)
        
        return project
    


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'full_name', 'role', 'image', 'description', 'order']
        extra_kwargs = {
            'id': {'read_only': True},
            'order': {'required': False}
        }
    def create(self, validated_data):
        team_member = TeamMember.objects.create(**validated_data)
        return team_member
    



