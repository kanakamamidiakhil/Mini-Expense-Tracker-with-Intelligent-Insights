from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, LoginSerializer
from django.middleware import csrf
from .models import Expense
from .serializers import ExpenseSerializer
from django.utils.dateparse import parse_datetime
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])
            if user:
                refresh = RefreshToken.for_user(user)
                response = Response({
                    'message': 'Login successful',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
                response.set_cookie(
                    key='access_token',
                    value=str(refresh.access_token),
                    httponly=True,
                    secure=True,
                    samesite='Lax'
                )
                response.set_cookie(
                    key='csrf_token',
                    value=csrf.get_token(request),
                    httponly=False,
                    secure=True,
                    samesite='Lax'
                )
                return response
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        response = Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('csrf_token')
        return response
    

class ExpenseCreateView(generics.CreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Assign user automatically


class ExpenseListView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Get page number and page size from headers (default: page 1, size 10)
            page_no = int(request.headers.get('page-no', 1))
            page_size = int(request.headers.get('page-size', 10))

            # Fetch and order expenses of the logged-in user by date (newest first)
            queryset = Expense.objects.filter(user=request.user).order_by('-date')
            total_expenses = queryset.count()

            # Apply pagination
            offset = (page_no - 1) * page_size
            paginated_queryset = queryset[offset:offset + page_size]

            # Serialize the paginated data
            serializer = ExpenseSerializer(paginated_queryset, many=True)

            return Response({
                "success": True,
                "data": serializer.data,
                "total_expenses": total_expenses,
                "page_no": page_no,
                "page_size": page_size
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ExpenseUpdateView(generics.UpdateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)  # Ensure user updates only their expenses


class ExpenseDeleteView(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)  # Ensure user deletes only their expenses\
            
class ExpenseFilterView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Extract query parameters for filtering
            start_date = request.query_params.get('start_date')
            end_date = request.query_params.get('end_date')
            category = request.query_params.get('category')

            # Start with all expenses for the logged-in user
            queryset = Expense.objects.filter(user=request.user).order_by('-date')

            # Filter by start_date if provided
            if start_date:
                start_date = parse_datetime(start_date)
                queryset = queryset.filter(date__gte=start_date)

            # Filter by end_date if provided
            if end_date:
                end_date = parse_datetime(end_date)
                queryset = queryset.filter(date__lte=end_date)

            # Filter by category if provided
            if category:
                queryset = queryset.filter(category__iexact=category)

            # Serialize the filtered data
            serializer = ExpenseSerializer(queryset, many=True)

            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class ExpenseStatsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user  # Get the logged-in user
        expenses = Expense.objects.filter(user=user)  # Filter expenses by user
        
        # Calculate total spending per category
        category_totals = expenses.values('category').annotate(total_spent=Sum('amount'))
        
        # Calculate the grand total of all expenses
        grand_total = expenses.aggregate(grand_total=Sum('amount'))['grand_total'] or 0
        
        # Calculate percentage distribution per category
        category_distribution = [
            {
                'category': entry['category'],
                'total_spent': entry['total_spent'],
                'percentage': round((entry['total_spent'] / grand_total) * 100, 2) if grand_total > 0 else 0
            }
            for entry in category_totals
        ]
        
        return Response({
            'total_spending_per_category': category_distribution,
            'grand_total_spending': grand_total
        })