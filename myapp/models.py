from django.contrib.auth.models import BaseUserManager, AbstractUser
from django.db import models
from django.conf import settings

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        user = self.model(email=self.normalize_email(email), name=name)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None):
        user = self.create_user(email, name, password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    username = None
    name=models.CharField(max_length=255)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=255)

    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS=['name']  
    objects = UserManager()
    
class Expense(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL,  # Instead of CASCADE, set user to NULL on deletion
        null=True,  # Allow NULL values
        blank=True  # Allow empty values
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category}: {self.amount}"