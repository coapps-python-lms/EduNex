from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields=['id','full_name','detail','email','password','qualification','mobile_no','skills','teacher_courses','skill_list']
        depth=1
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields=['id','title','description']
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        # fields = '__all__'
        fields=['id','category','teacher','title','description','featured_img','techs','course_chapters','related_videos','tech_list']
        depth=1
       
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = '__all__'
# student
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields=['id','full_name','email','username','password','interested_categories']
class StudentEnrolledCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollement
        fields=['id','course','student','enrolled_time']
        