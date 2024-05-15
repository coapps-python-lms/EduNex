from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields=['id','full_name','email','password','qualification','mobile_no','skills','profile_picture','teacher_courses','skill_list']
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
        fields=['id','title','description']
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        # fields = '__all__'
        fields=['id','category','teacher','title','description','featured_img','techs','course_chapters','related_videos','tech_list','total_enrolled_students','course_rating']
    def __init__(self,*args,**kwargs):
        super(CourseSerializer,self).__init__(*args,**kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method=='GET':
            self.Meta.depth=1
       
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
        fields=['id','full_name','email','username','password','interested_categories']
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
            self.Meta.depth=1
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