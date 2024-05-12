from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
# from rest_framework import permissions
from .serializers import TeacherSerializer,CategorySerializer,CourseSerializer,ChapterSerializer
from . import models

class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]
@csrf_exempt 
def teacher_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            teacherData = models.Teacher.objects.get(email=email, password=password)
            return JsonResponse({'bool': True,'teacher_id':teacherData.id})
        except ObjectDoesNotExist:
            return JsonResponse({'bool': False, 'error': 'Teacher not found with the provided credentials'})
        except models.Teacher.MultipleObjectsReturned:
            return JsonResponse({'bool': False, 'error': 'Multiple teachers found with the provided credentials'})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed for teacher login'})

class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    # permission_classes=[permissions.IsAuthenticated]

# course
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes=[permissions.IsAuthenticated] 
    
    def get_queryset(self):
            qs=super().get_queryset()
            if 'result' in self.request.GET:
                limit=int(self.request.GET['result'])
                qs=models.Course.objects.all().order_by('-id')[:limit]
            return qs
            if 'category' in self.request.GET:
                category=self.request.GET['category']
                qs=models.Course.objects.filter(techs__icontains=category)
            return qs

def create_course(request):
    if request.method == 'POST':
        serializer = CourseSerializer(data=request.POST, files=request.FILES)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'bool': True})
        else:
            return JsonResponse({'error': serializer.errors})

class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    # permission_classes=[permissions.IsAuthenticated]
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

# 
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
# chapter
class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    # permission_classes=[permissions.IsAuthenticated]

# course chapter
class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    # permission_classes=[permissions.IsAuthenticated]
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)
# particular chapter
class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
# particular course
class CourseDetailView(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer

# own
class CategoryCoursesList(generics.ListAPIView):
    def get(self, request):
        category = request.GET.get('category')
        courses = Course.objects.filter(category__title=category)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)