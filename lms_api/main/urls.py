from django.urls import path
from . import views
urlpatterns=[
    #teacher
    path('teacher/',views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher/dashboard/<int:pk>/', views.TeacherDashboard.as_view()),
    path('teacher/change-password/<int:teacher_id>/', views.teacher_change_password),
    path('teacher-login',views.teacher_login),
    #category
    path('category/',views.CategoryList.as_view()),
     #course
    path('course/',views.CourseList.as_view()),
    path('search-courses/<str:seacrhString>',views.CourseList.as_view()),
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
    # student
    path('student/',views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()),
    path('student-login',views.student_login),
    path('student-enroll-course/',views.StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>',views.fetch_enroll_status),
    path('fetch-enrolled-students/<int:course_id>',views.EnrolledStudentList.as_view()),
    path('fetch-all-enrolled-students/<int:teacher_id>',views.EnrolledStudentList.as_view()),
    path('fetch-all-enrolled-courses/<int:student_id>',views.EnrolledStudentList.as_view()),
    path('fetch-recommended-courses/<int:studentId>',views.CourseList.as_view()),
    path('course-rating/<int:course_id>',views.CourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>',views.fetch_rating_status),
    path('student-add-favorite-course/',views.StudentFavoriteCourseList.as_view()),
    path('student-remove-favorite-course/<int:course_id>/<int:student_id>',views.remove_favorite_course),
    path('fetch-favorite-status/<int:student_id>/<int:course_id>',views.fetch_favorite_status),
    path('fetch-favorite-courses/<int:student_id>',views.StudentFavoriteCourseList.as_view()),
    path('student-assignment/<int:teacher_id>/<int:student_id>',views.AssignmentList.as_view()),
    path('my-assignments/<int:student_id>',views.MyAssignmentList.as_view()),
    path('update-assignments/<int:pk>',views.UpdateAssignment.as_view()),
    path('student/dashboard/<int:pk>/', views.StudentDashboard.as_view()),
    path('student/change-password/<int:student_id>/', views.student_change_password),
    path('student/fetch-all-notifications/<int:student_id>/',views.NotificationList.as_view()),
    path('save-notification/',views.NotificationList.as_view()),
    path('quiz/',views.QuizList.as_view()),
     # fetch all teacher quiz
    path('teacher-quiz/<int:teacher_id>',views.TeacherQuizList.as_view()),
    # fetch teacher specific quiz detail
    path('teacher-quiz-detail/<int:pk>',views.TeacherQuizDetail.as_view()),
    path('quiz/<int:pk>',views.QuizDetailView.as_view()),
    path('question/<int:pk>',views.QuestionDetailView.as_view()),
    path('quiz-questions/<int:quiz_id>',views.QuizQuestionList.as_view()),
    path('quiz-assign-course/',views.AssignQuizCourseList.as_view()),
    path('fetch-quiz-assign-status/<int:quiz_id>/<int:course_id>',views.fetch_quiz_assign_status),
    path('fetch-assigned-quiz/<int:course_id>',views.CourseQuizList.as_view()),
    path('quiz-questions/<int:quiz_id>/<int:limit>',views.QuizQuestionList.as_view()),
    path('attempt-quiz/',views.AttemptQuizList.as_view()),
    path('quiz-questions/<int:quiz_id>/next-question/<int:question_id>',views.QuizQuestionList.as_view()),
    path('fetch-student-quiz-attempt-status/<int:quiz_id>/<int:student_id>',views.fetch_student_quiz_attempt_status),
    # study material
    path('study-materials/<int:course_id>',views.StudyMaterialList.as_view()),
    path('study-material/<int:pk>',views.StudyMaterialDetail.as_view()),
    path('user/study-materials/<int:course_id>',views.StudyMaterialList.as_view()),
    path('attempted-quiz/<int:quiz_id>',views.AttemptQuizList.as_view()),
    path('fetch-quiz-result/<int:quiz_id>/<int:student_id>',views.fetch_quiz_attempt_status),
    path('popular-courses/',views.CourseRatingList.as_view()),
    path('update-view/<int:course_id>',views.update_view),
    path('popular-teachers/',views.TeacherList.as_view()),
    path('student-testimonial/',views.CourseRatingList.as_view()),
    # footer
    path('faq/',views.FAQList.as_view()),
    # flat page
    path('pages/',views.FlatPagesList.as_view()),
    path('pages/<int:pk>/<str:page_slug>/',views.FlatPagesDetail.as_view()),
    # contact
    path('contact/',views.ContactList.as_view()),
    # otp verify
    path('verify-teacher/<int:teacher_id>/', views.verify_teacher_via_otp),
]