from django.db import models
from django.core import serializers

# Teacher model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    detail= models.TextField(null=True)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    skills= models.TextField()
    class Meta:
        verbose_name_plural= "1. Teachers"

#  courseCategory model
class CourseCategory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    class Meta:
        verbose_name_plural= "2. Course Categories"
    def __str__(self):
        return self.title

# course model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher= models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name='teacher_courses')
    title = models.CharField(max_length=100)
    description = models.TextField(null=True)
    featured_img = models.ImageField(upload_to='course imgs/',null=True)
    techs = models.TextField(null=True)
    class Meta:
        verbose_name_plural= "3. Courses"

    def related_videos(self):
        if self.techs is not None:
            related_videos = Course.objects.filter(techs__icontains=self.techs)
            return serializers.serialize('json', related_videos)
        else:
            return "[]"

    def tech_list(self):
        if self.techs is not None:
            tech_list = self.techs.split(',')
            return tech_list
        else:
            return []


# chapter model
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE,related_name='course_chapters')
    title = models.CharField(max_length=100)
    description = models.TextField(null=True)
    video = models.FileField(upload_to='chapter_video/',null=True)
    remarks = models.TextField(null=True)
    class Meta:
        verbose_name_plural= "4. Chapters"
# student model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    address= models.TextField()
    interested_categories= models.TextField()
    class Meta:
        verbose_name_plural= "5. Students"