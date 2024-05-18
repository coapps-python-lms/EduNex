from rest_framework import serializers
from . import models
from django.contrib.flatpages.models import FlatPage

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields=['id','full_name','email','password','qualification','mobile_no','skills','profile_picture','teacher_courses','skill_list','total_teacher_courses']
    def __init__(self,*args,**kwargs):
        super(TeacherSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=1
# dashboard
class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['total_teacher_courses','total_teacher_students','total_teacher_chapters']
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields=['id','title','description','total_courses']
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        # fields = '__all__'
        fields=['id','category','teacher','title','description','course_views','featured_img','techs','course_chapters','related_videos','tech_list','total_enrolled_students','course_rating']
    def __init__(self,*args,**kwargs):
        super(CourseSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2
       
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = '__all__'
    def __init__(self,*args,**kwargs):
        super(ChapterSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=1
# student
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields=['id','full_name','email','username','password','profile_picture','interested_categories']
class StudentEnrolledCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollement
        fields=['id','course','student','enrolled_time']
    def __init__(self,*args,**kwargs):
        super(StudentEnrolledCourseSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2
    
# course ratings
class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields=['id','course','student','rating','reviews','review_time']
    def __init__(self,*args,**kwargs):
        super(CourseRatingSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2
#  fav course
class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentFavoriteCourse
        fields=['id','course','student','status']
    def __init__(self,*args,**kwargs):
        super(StudentFavoriteCourseSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2
        
# assignment

class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentAssignment
        fields = ['id', 'teacher', 'student', 'title', 'detail', 'student_status', 'add_time']
        extra_kwargs = {
            'student_status': {'required': True}
        }

    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

    def validate_student_status(self, value):
        if not isinstance(value, bool):
            raise serializers.ValidationError("Must be a valid boolean.")
        return value

    def create(self, validated_data):
        if 'student_status' not in validated_data:
            validated_data['student_status'] = False  # Set default value if not provided
        return super().create(validated_data)


# student serializer
class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student
        fields=['total_enrolled_courses','total_favorite_courses','completed_assignments','pending_assignments']
# notification
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields=['id','teacher','student','notify_subject','notify_for','notify_created_time','notify_read_status']
    def __init__(self,*args,**kwargs):
        super(NotificationSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields=['id','teacher','title','detail','add_time','assign_status']
    def __init__(self,*args,**kwargs):
        super(QuizSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2
#  quiz question
class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuizQuestions
        fields = ['id','quiz','questions','ans1','ans2','ans3','ans4','righ_ans']
    def __init__(self,*args,**kwargs):
        super(QuizQuestionSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=1
        
# course quize assign
class AssignQuizCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseQuiz
        fields=['id','teacher','course','quiz','add_time']
    def __init__(self,*args,**kwargs):
        super(AssignQuizCourseSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2
class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseQuiz
        fields=['id','teacher','course','quiz','add_time']
    def __init__(self,*args,**kwargs):
        super(CourseQuizSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2
# attempt quiz
class AttemptQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AttemptQuiz
        fields=['id','student','question','right_ans','quiz','add_time']
    def __init__(self,*args,**kwargs):
        super(AttemptQuizSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2
        
# study material
class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudyMaterial
        fields=['id','course','title','description','upload','remarks']
    def __init__(self,*args,**kwargs):
        super(StudyMaterialSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=2
# faq
class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FAQ
        fields=['id','question','answer']

# flat pages
class FlatPageSerializer(serializers.ModelSerializer):
    class Meta:
        model=FlatPage
        fields=['id','title','content','url']