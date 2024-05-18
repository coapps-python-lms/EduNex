from webbrowser import get
from django.db.models import Count
from django.db.models import Avg
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Q
from django.contrib.flatpages.models import FlatPage
# from rest_framework import permissions
from .serializers import TeacherSerializer,CategorySerializer,FlatPageSerializer,CourseSerializer,FAQSerializer,StudyMaterialSerializer,ChapterSerializer,StudentSerializer,StudentEnrolledCourseSerializer,CourseRatingSerializer,TeacherDashboardSerializer,StudentFavoriteCourseSerializer,StudentAssignmentSerializer,StudentDashboardSerializer,NotificationSerializer,QuizSerializer,QuizQuestionSerializer,AssignQuizCourseSerializer,CourseQuizSerializer,AttemptQuizSerializer
from . import models
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

class StandardResultsPagination(PageNumberPagination):
    page_size=8
    page_size_query_param='page_size'
    max_page_size=8

class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    def get_queryset(self):
        if 'popular' in self.request.GET:
            queryset = models.Teacher.objects.annotate(
                total_course=Count('teacher_courses')
            ).order_by('-total_course')
            return queryset
   


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
    pagination_class= StandardResultsPagination
    
    def get_queryset(self):
            qs=super().get_queryset()
            if 'result' in self.request.GET:
                limit=int(self.request.GET['result'])
                qs=models.Course.objects.all().order_by('-id')[:limit]
            if 'category' in self.request.GET:
                category=self.request.GET['category']
                category=models.CourseCategory.objects.filter(id=category).first()
                qs=models.Course.objects.filter(category=category)
            if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
                skill_name=self.request.GET['skill_name']
                teacher=self.request.GET['teacher']
                teacher=models.Teacher.objects.filter(id=teacher).first()
                qs=models.Course.objects.filter(techs__icontains=skill_name,teacher=teacher)
            if 'searchString' in self.kwargs:
                search=self.kwargs['searchString']
                if search:
                    qs=models.Course.objects.filter(Q(title__icontains=search)|Q(techs__icontains=search))
                
                
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
    queryset=models.CourseRating.objects.all()
    serializer_class = CourseRatingSerializer
    def get_queryset(self):
        if 'popular' in self.request.GET:
            return models.Course.objects.annotate(avg_rating=Avg('courserating__rating')).order_by('-avg_rating')[:4]
        
        if 'all' in self.request.GET:
            return models.Course.objects.annotate(avg_rating=Avg('courserating__rating')).order_by('-avg_rating')
        
        return models.CourseRating.objects.filter(course__isnull=False).order_by('-rating')
   
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
        return models.StudentAssignment.objects.filter(student_id=student_id, teacher_id=teacher_id)

    def create(self, request, *args, **kwargs):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        data = request.data.copy()
        data['student'] = student_id
        data['teacher'] = teacher_id

        # Ensure that student_status is included and converted to boolean
        student_status = data.get('student_status', 'false').lower()
        if student_status in ['true', '1']:
            data['student_status'] = True
        else:
            data['student_status'] = False

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
class MyAssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        student = models.Student.objects.get(pk=student_id)

        # Update notifications to mark them as read
        models.Notification.objects.filter(
            student=student, 
            notify_for='student', 
            notify_subject='assignment', 
            notify_read_status=False
        ).update(notify_read_status=True)

        return models.StudentAssignment.objects.filter(student=student)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        
        # Get the updated unread notifications count
        student_id = self.kwargs['student_id']
        student = models.Student.objects.get(pk=student_id)
        unread_notifications_count = models.Notification.objects.filter(
            student=student, 
            notify_read_status=False
        ).count()

        # Include the unread notifications count in the response
        return Response({
            'assignments': serializer.data,
            'unread_notifications_count': unread_notifications_count
        })

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
# notification
class NotificationList(generics.ListCreateAPIView):
    queryset=models.Notification.objects.all()
    serializer_class=NotificationSerializer

    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student=models.Student.objects.get(pk=student_id)
        return models.Notification.objects.filter(student=student,notify_for='student',notify_subject='assignment',notify_read_status=False)
# quiz
class QuizList(generics.ListCreateAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
# teacher quiz list
class TeacherQuizList(generics.ListCreateAPIView):
    serializer_class = QuizSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Quiz.objects.filter(teacher=teacher)
# specific quiz detail
class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
# quiz detail
class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
# quiz question
# class QuizQuestionDetail(generics.RetrieveUpdateAPIView):
#     queryset = models.QuizQuestions.objects.all()
#     serializer_class = QuizQuestionSerializer
#     .lookup_field = 'id'
class QuizQuestionList(generics.ListCreateAPIView):
    serializer_class = QuizQuestionSerializer
   
    def get_queryset(self):
        quiz_id = self.kwargs['quiz_id']
        quiz=models.Quiz.objects.get(pk=quiz_id)
        print(quiz)
        if 'limit' in self.kwargs:
          return models.QuizQuestions.objects.filter(quiz=quiz).order_by('id')[:1]
        elif 'question_id' in self.kwargs:
            current_question=self.kwargs['question_id']
            return models.QuizQuestions.objects.filter(quiz=quiz,id__gt=current_question).order_by('id')[:1] 
        else:
            return models.QuizQuestions.objects.filter(quiz=quiz)
# question detail
class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.QuizQuestions.objects.all()
    serializer_class = QuizQuestionSerializer
# quiz assign status
class AssignQuizCourseList(generics.ListCreateAPIView):
    queryset = models.CourseQuiz.objects.all()
    serializer_class = AssignQuizCourseSerializer
def fetch_quiz_assign_status(request,quiz_id,course_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    assignStatus=models.CourseQuiz.objects.filter(course=course,quiz=quiz).count()
    if assignStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class CourseQuizList(generics.ListCreateAPIView):
    queryset=models.CourseQuiz.objects.all()
    serializer_class=CourseQuizSerializer
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)

class AttemptQuizList(generics.ListCreateAPIView):
    queryset=models.AttemptQuiz.objects.all()
    serializer_class=AttemptQuizSerializer
    def get_queryset(self):
        if 'quiz_id' in self.kwargs:
            quiz_id=self.kwargs['quiz_id']
            quiz=models.Quiz.objects.get(pk=quiz_id)
            return models.AttemptQuiz.objects.filter(quiz=quiz)

def fetch_student_quiz_attempt_status(request,quiz_id,student_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    student=models.Student.objects.filter(id=student_id).first()
    attemptStatus=models.AttemptQuiz.objects.filter(student=student,question__quiz=quiz).count()
    print(models.AttemptQuiz.objects.filter(student=student,question__quiz=quiz).query)
    if attemptStatus>0:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def fetch_quiz_attempt_status(request,quiz_id,student_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    student=models.Student.objects.filter(id=student_id).first()
    total_questions=models.QuizQuestions.objects.filter(quiz=quiz).count()
    total_attempted_questions=models.AttemptQuiz.objects.filter(student=student,quiz=quiz).values('student').count()
    attempted_questions=models.AttemptQuiz.objects.filter(quiz=quiz,student=student)
    total_correct_questions=0
    for attempt in attempted_questions:
        if attempt.right_ans==attempt.question.righ_ans:
            total_correct_questions+=1
    return JsonResponse({'total_questions':total_questions,'total_attempted_questions':total_attempted_questions,"total_correct_questions":total_correct_questions})

# study material
class StudyMaterialList(generics.ListCreateAPIView):
    serializer_class = StudyMaterialSerializer
    # permission_classes=[permissions.IsAuthenticated]
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        return models.StudyMaterial.objects.filter(course=course)
class StudyMaterialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.StudyMaterial.objects.all()
    serializer_class=StudyMaterialSerializer
# update view
def update_view(request,course_id):
    queryset=models.Course.objects.filter(pk=course_id).first()
    queryset.course_views+=1
    queryset.save()
    return JsonResponse({'views':queryset.course_views})

# faq
class FAQList(generics.ListAPIView):
    queryset = models.FAQ.objects.all()
    serializer_class = FAQSerializer

# flat page
class FlatPagesList(generics.ListAPIView):
    queryset = FlatPage.objects.all()
    serializer_class = FlatPageSerializer

class FlatPagesDetail(generics.RetrieveAPIView):
    queryset = FlatPage.objects.all()
    serializer_class = FlatPageSerializer