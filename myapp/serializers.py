from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Expense

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =User
        fields=['id', 'name', 'email', 'password']
        extra_kwargs={'password': {'write_only': True}}

    def create(self, validated_data):
        user=User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)
    
class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'amount', 'category', 'description', 'date']  # Date is read-only
        read_only_fields = ['date']