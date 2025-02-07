from django.urls import path
from .views import RegisterView, LoginView, LogoutView, ExpenseCreateView, ExpenseListView, ExpenseUpdateView, ExpenseDeleteView, ExpenseFilterView, ExpenseStatsView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('expenses/create/', ExpenseCreateView.as_view(), name='expense-create'),  # Create
    path('expenses/', ExpenseListView.as_view(), name='expense-list'),  # View all
    path('expenses/update/<int:pk>/', ExpenseUpdateView.as_view(), name='expense-update'),  # Update
    path('expenses/delete/<int:pk>/', ExpenseDeleteView.as_view(), name='expense-delete'),  # Delete
    path('expenses/filter/', ExpenseFilterView.as_view(), name='expense-filter'),
    path('expenses/stats/', ExpenseStatsView.as_view(), name='expense-stats'),
]