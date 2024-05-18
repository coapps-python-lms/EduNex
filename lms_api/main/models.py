from django.db import models
from django.core import serializers
from django.core.mail import send_mail

# Teacher model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100,blank=True,null=True)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    profile_picture = models.ImageField(upload_to='teacher_profile_imgs/',null=True)
    skills= models.TextField()
    
    class Meta:
        verbose_name_plural= "1. Teachers"
    def skill_list(self):
        if self.skills is not None:
            skill_list = self.skills.split(',')
            return skill_list
        else:
            return "[]"
    # Total teacher course
    def total_teacher_courses(self):
        total_teacher_courses=Course.objects.filter(teacher=self).count()
        return total_teacher_courses
    # total teacher chapters
    def total_teacher_chapters(self):
        total_teacher_chapters=Chapter.objects.filter(course__teacher=self).count()
        return total_teacher_chapters
    # total_teacher_students
    def total_teacher_students(self):
        total_teacher_students=StudentCourseEnrollement.objects.filter(course__teacher=self).count()
        return total_teacher_students
    


#  courseCategory model
class CourseCategory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    class Meta:
        verbose_name_plural= "2. Course Categories"
    # total courses
    def total_courses(self):
        return Course.objects.filter(category=self).count()
    def __str__(self):
        return self.title

# course model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE,related_name='category_courses')
    teacher= models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name='teacher_courses')
    title = models.CharField(max_length=100)
    description = models.TextField(null=True)
    featured_img = models.ImageField(upload_to='course imgs/',null=True)
    techs = models.TextField(null=True)
    course_views=models.BigIntegerField(default=0)
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
    def total_enrolled_students(self):
        total_enrolled_students=StudentCourseEnrollement.objects.filter(course=self).count()
        return total_enrolled_students

    def course_rating(self):
        course_rating=CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']
    def __str__(self):
        return self.title


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
    password = models.CharField(max_length=100,blank=True,null=True)
    interested_categories= models.TextField()
    profile_picture = models.ImageField(upload_to='student_profile_imgs/',null=True)
    def __str__(self):
        return self.full_name
    class Meta:
        verbose_name_plural= "5. Students"
    #total_enrolled_courses
    def total_enrolled_courses(self):
        total_enrolled_courses=StudentCourseEnrollement.objects.filter(student=self).count()
        return total_enrolled_courses
    #  total_favorite_courses 
    def total_favorite_courses(self):
        total_favorite_courses=StudentFavoriteCourse.objects.filter(student=self).count()
        return total_favorite_courses
    # completed_assignments
    def completed_assignments(self):
        completed_assignments=StudentAssignment.objects.filter(student=self,student_status=True).count()
        return completed_assignments
    # pending_assignments
    def pending_assignments(self):
        pending_assignments=StudentAssignment.objects.filter(student=self,student_status=False).count()
        return pending_assignments
# student enrolled course
class StudentCourseEnrollement(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='enrolled_courses')
    student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name='enrolled_student')
    enrolled_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.course}-{self.student}"
    class Meta:
        verbose_name_plural= "6. Enrolled Courses"

# course rating and review
class CourseRating(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    rating=models.PositiveBigIntegerField(default=0)
    reviews=models.TextField(null=True)
    review_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.course}-{self.student}-{self.rating}"
    class Meta:
        verbose_name_plural= "7. Course Ratings"

# fav course
class StudentFavoriteCourse(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    status=models.BooleanField(default=False)
    class Meta:
        verbose_name_plural="8. Student Favorite Courses"
    def __str__(self):
        return f"{self.course}-{self.student}"

# student assignment
class StudentAssignment(models.Model):
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    title = models.CharField(max_length=100)
    detail = models.TextField(null=True)
    student_status=models.BooleanField(default=False,null=True)
    add_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.title}"
    class Meta:
        verbose_name_plural= "9.Student Assignment"
# notification modal
class Notification(models.Model):
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    notify_for=models.CharField(max_length=100,null=True)
    notify_subject=models.CharField(max_length=100,null=True)
    notify_created_time=models.DateTimeField(auto_now_add=True)
    notify_read_status=models.BooleanField(default=False,null=True)
    class Meta:
        verbose_name_plural= "10.Notification"

# quiz
class Quiz(models.Model):
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)
    add_time=models.DateTimeField(auto_now_add=True)

    def assign_status(self):
        return CourseQuiz.objects.filter(quiz=self).count()

    class Meta:
        verbose_name_plural= "11.Quiz"

# quiz questions modal
class QuizQuestions(models.Model):
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    questions= models.CharField(max_length=200)
    ans1= models.CharField(max_length=200)
    ans2= models.CharField(max_length=200)
    ans3= models.CharField(max_length=200)
    ans4= models.CharField(max_length=200)
    righ_ans= models.CharField(max_length=200)
    add_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural= "12.Quiz Questions"
# add quiz to course
class CourseQuiz(models.Model):
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    course=models.ForeignKey(Course,on_delete=models.CASCADE,null=True)
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    add_time=models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural= "13.Course Quiz"
# quiz attempt by student
class AttemptQuiz(models.Model):
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    question=models.ForeignKey(QuizQuestions,on_delete=models.CASCADE,null=True)
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    right_ans=models.CharField(max_length=200,null=True)
    add_time=models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural= "14.Attempted Quiz Questions"

# studey material
class StudyMaterial(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True)
    upload= models.FileField(upload_to='study_materials/',null=True)
    remarks = models.TextField(null=True)
    class Meta:
        verbose_name_plural= "15. Course Study Material"
# FAQ
class FAQ(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField(null=True)
    class Meta:
        verbose_name_plural= "16. FAQ"
    def __str__(self) -> str:
        return self.question
# contact us
class Contacts(models.Model):
    full_name = models.CharField(max_length=300)
    email = models.EmailField()
    query_txt = models.TextField(null=True)
    add_time=models.DateTimeField(auto_now_add=True)
    def __str__(self) -> str:
        return self.query_txt

    def save(self,*args,**kwargs):
        send_mail(
            'Contacts Query',
            'here is the message',
            'subashininatarajan1804@gmail.com',
            [self.email],
            fail_silently=False,
            html_message = f'<p>{self.full_name}</p><p>{self.query_txt}</p>'
        )
        return super(Contacts,self).save(*args,**kwargs)
    class Meta:
        verbose_name_plural= "17. Contact Queries"
    def __str__(self) -> str:
        return self.query_txt

