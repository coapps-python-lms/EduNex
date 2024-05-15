from webbrowser import get
from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q
# from rest_framework import permissions
from .serializers import TeacherSerializer,CategorySerializer,CourseSerializer,ChapterSerializer,StudentSerializer,StudentEnrolledCourseSerializer,CourseRatingSerializer,TeacherDashboardSerializer,StudentFavoriteCourseSerializer,StudentAssignmentSerializer,StudentDashboardSerializer
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
# teacher dashboard
class TeacherDashboard(generics.RetrieveAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherDashboardSerializer

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
            if 'category' in self.request.GET:
                category=self.request.GET['category']
                qs=models.Course.objects.filter(techs__icontains=category)
            if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
                skill_name=self.request.GET['skill_name']
                teacher=self.request.GET['teacher']
                teacher=models.Teacher.objects.filter(id=teacher).first()
                qs=models.Course.objects.filter(techs__icontains=skill_name,teacher=teacher)
            elif 'studentId' in self.kwargs:
                student_id=self.kwargs['studentId']
                student=models.Student.objects.get(pk=student_id)
                print(student.interested_categories)
                queries=[Q(techs__iendswith=value) for value in student.interested_categories]
                query=queries.pop()
                for item in queries:
                    query |=  item
                qs=models.Course.objects.filter(query)
                return qs
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
class CourseChapterList(generics.ListCreateAPIView):
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
    def get_serializer_context(self):
        context=super().get_serializer_context()
        context['chapter_duration']=self.chapter_duration
        print('context---------------')
        print(context)
        return context
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

# student 
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes=[permissions.IsAuthenticated]
class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
# student login
@csrf_exempt 
def student_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            studentData = models.Student.objects.get(email=email, password=password)
            return JsonResponse({'bool': True,'student_id':studentData.id})
        except ObjectDoesNotExist:
            return JsonResponse({'bool': False, 'error': 'Student not found with the provided credentials'})
        except models.Student.MultipleObjectsReturned:
            return JsonResponse({'bool': False, 'error': 'Multiple teachers found with the provided credentials'})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed for student login'})

# student enrolled course
class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollement.objects.all()
    serializer_class = StudentEnrolledCourseSerializer
    # permission_classes=[permissions.IsAuthenticated]
def fetch_enroll_status(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    enrollStatus=models.StudentCourseEnrollement.objects.filter(course=course,student=student).count()
    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class EnrolledStudentList(generics.ListAPIView):
    queryset = models.StudentCourseEnrollement.objects.all()
    serializer_class = StudentEnrolledCourseSerializer

    def get_queryset(self):   
        if 'course_id' in self.kwargs: 
            course_id = self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollement.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs: 
            teacher_id=self.kwargs['teacher_id']
            teacher=models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollement.objects.filter(course__teacher=teacher).distinct()
        elif 'student_id' in self.kwargs: 
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollement.objects.filter(student=student).distinct()
# course rating
class CourseRatingList(generics.ListCreateAPIView):
    serializer_class = CourseRatingSerializer
    def get_queryset(self):    
        course_id = self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        return models.CourseRating.objects.filter(course=course)

# fetch rating status
def fetch_rating_status(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    ratingStatus=models.CourseRating.objects.filter(course=course,student=student).count()
    if ratingStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

@csrf_exempt 
def teacher_change_password(request,teacher_id):
    password = request.POST['password']    
    try:
        teacherData = models.Teacher.objects.get(id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData=None
    if teacherData:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
# fav course
class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset=models.StudentFavoriteCourse.objects.all()
    serializer_class=StudentFavoriteCourseSerializer

    def get_queryset(self):   
        if 'student_id' in self.kwargs: 
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentFavoriteCourse.objects.filter(student=student).distinct()

def fetch_favorite_status(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favoriteStatus=models.StudentFavoriteCourse.objects.filter(course=course,student=student).first()
    if favoriteStatus and favoriteStatus.status==True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
def remove_favorite_course(request,course_id,student_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favoriteStatus=models.StudentFavoriteCourse.objects.filter(course=course,student=student).delete()
    if favoriteStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

# assignment
class AssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        student=models.Student.objects.get(pk=student_id)
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.StudentAssignment.objects.filter(student=student,teacher=teacher)
class MyAssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        student=models.Student.objects.get(pk=student_id)
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.StudentAssignment.objects.filter(student=student,teacher=teacher)
class UpdateAssignment(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer

# student dashboard
class StudentDashboard(generics.RetrieveAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentDashboardSerializer
#  student update password
@csrf_exempt 
def student_change_password(request,student_id):
    password = request.POST['password']    
    try:
        studentData = models.Teacher.objects.get(id=student_id)
    except models.Student.DoesNotExist:
        studentData=None
    if studentData:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
