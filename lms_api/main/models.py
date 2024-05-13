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
    def skill_list(self):
        if self.skills is not None:
            skill_list = self.skills.split(',')
            return skill_list
        else:
            return "[]"

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
            related_videos = Course.objects.filter(techs__icontains=self.techs).exclude(id=self.id)
            return serializers.serialize('json', related_videos)
        else:
            return "[]"

    def tech_list(self):
        if self.techs is not None:
            tech_list = self.techs.split(',')
            return tech_list
        else:
            return "[]"


# chapter model
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE,related_name='course_chapters')
    title = models.CharField(max_length=100)
    description = models.TextField(null=True)
    video = models.FileField(upload_to='chapter_video/',null=True)
    remarks = models.TextField(null=True)
    class Meta:
        verbose_name_plural= "4. Chapters"
    def chapter_duration(self):
        seconds=0
        import cv2
        cap=cv2.VideoCapture(self.video.path)
        fps=cv2.get(cv2.CAP_PROP_FPS)
        frame_count=int(cap.get(CAP_PROP_FRAME_COUNT))
        if frame_count:
            duration=frame_count/fps
            print('fps='+str(fps))
            print('number of frames='+str(frame_count))
            print('duration (S)='+str(duration))
            minutes=int(duration/60)
            seconds=duration%60
            print('duration(M:S)='+str(minutes)+':'+str(seconds))
        return seconds
# student model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    username= models.CharField(max_length=200)
    password = models.CharField(max_length=100)
    interested_categories= models.TextField()
    class Meta:
        verbose_name_plural= "5. Students"