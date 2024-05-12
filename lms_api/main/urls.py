from django.urls import path
from . import views



urlpatterns=[
    #teacher
    path('teacher/',views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login',views.teacher_login),
    #category
    path('category/',views.CategoryList.as_view()),
     #course
    path('course/',views.CourseList.as_view()),
    # course detail
    path('course/<int:pk>/',views.CourseDetailView.as_view()),
    path('add-course',views.create_course),
    # fetch teacher course
    path('teacher-courses/<int:teacher_id>',views.TeacherCourseList.as_view()),
    # fetch teacher specific course detail
    path('teacher-course-detail/<int:pk>',views.TeacherCourseDetail.as_view()),
    # chapter
    path('chapter/',views.ChapterList.as_view()),
    path('chapter/<int:pk>',views.ChapterDetailView.as_view()),
    # specific chapter
    path('course-chapters/<int:course_id>',views.CourseChapterList.as_view()),
]