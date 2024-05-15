import Header from "./Header";
import Home from "./Home";
import About from "./About";
//user routes
import CourseDetail from "./CourseDetail";
import TeacherDetails from "./TeacherDetails";
import Login from "./User/Login";
import Register from "./User/Register";
import Footer from "./Footer";
import { Routes as Switch, Route } from "react-router-dom";
import Dashboard from "./User/Dashboard";
import MyCourses from "./User/MyCourses";
import FavoriteCourses from "./User/FavoriteCourses";
import RecommendedCourses from "./User/RecommendedCourses";
import ProfileSettings from "./User/ProfileSettings";
import ChangePassword from "./User/ChangePassword";
//teacher routes
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherLogout from "./Teacher/TeacherLogout";
import TeacherRegister from "./Teacher/TeacherRegister";
import TeacherDashboard from "./Teacher/TeacherDashboard";
import TeacherCourses from "./Teacher/TeacherCourses";
import EnrolledStudents from "./Teacher/EnrolledStudents";
import AddCourses from "./Teacher/AddCourses";
import AddChapter from "./Teacher/AddChapter";
import AllChapters from "./Teacher/CourseChapter";
import EditChapter from "./Teacher/EditChapter";
import TeacherProfileSettings from "./Teacher/TeacherProfileSettings";
import TeacherChangePassword from "./Teacher/TeacherChangePassword";
import MyStudents from "./Teacher/MyStudents";
//list pages
import AllCourses from "./AllCourses";
import PopularCourses from "./PopularCourses";
import PopularTeachers from "./PopularTeachers";
import CategoryCourses from "./CategoryCourses";
import EditCourse from "./Teacher/EditCourse";
import TeacherSkillCourses from "./TeacherSkillCourses";
import StudentLogout from "./User/Logout";
import StudentAssignments from "./User/StudentAssignments";
import AddAssignment from "./Teacher/AddAssignment";
import ShowAssignment from "./Teacher/ShowAssignment";

function Main() {
  return (
    <div className="App">
      <Header />
      <Switch> 
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/detail/:course_id" element={<CourseDetail />}></Route>
        <Route path="/teacher-details/:teacher_id" element={<TeacherDetails/>}></Route>
        <Route path="/student-login" element={<Login />}></Route>
        <Route path="/student-register" element={<Register />}></Route>
        <Route path="/student-dashboard" element={<Dashboard />}></Route>
        <Route path="/student-logout" element={<StudentLogout/>}></Route>
        <Route path="/my-courses" element={<MyCourses />}></Route>
        <Route path="/favorite-courses" element={<FavoriteCourses />}></Route>
        <Route path="/recommended-courses" element={<RecommendedCourses />}></Route>
        <Route path="/profile-settings" element={<ProfileSettings/>}></Route>
        <Route path="/change-password" element={<ChangePassword/>}></Route>
        <Route path="/teacher-login" element={<TeacherLogin />}></Route>
        <Route path="/teacher-logout" element={<TeacherLogout/>}></Route>
        <Route path="/teacher-register" element={<TeacherRegister />}></Route>
        <Route path="/teacher-dashboard" element={<TeacherDashboard />}></Route>
        <Route path="/teacher-courses" element={<TeacherCourses />}></Route>
        <Route path="/enrolled-students/:course_id" element={<EnrolledStudents/>}></Route>
        <Route path="/add-courses" element={<AddCourses />}></Route>
        <Route path="/edit-course/:course_id" element={<EditCourse/>}></Route>
        <Route path="/add-chapter/:course_id" element={<AddChapter/>}></Route>
        <Route path="/teacher-profile-settings" element={<TeacherProfileSettings />}></Route>
        <Route path="/teacher-change-password" element={<TeacherChangePassword />}></Route>
        <Route path="/my-students" element={<MyStudents/>}></Route>
        <Route path="/all-courses" element={<AllCourses/>}></Route>
        <Route path="/all-chapters/:course_id" element={<AllChapters />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter/>}></Route>
        <Route path="/popular-courses" element={<PopularCourses/>}></Route>
        <Route path="/popular-teachers" element={<PopularTeachers/>}></Route>
        <Route path="/category/:category_slug" element={<CategoryCourses/>}></Route>
        <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses/>}></Route>
        <Route path="/add-assignment/:teacher_id/:student_id" element={<AddAssignment/>}></Route>
        <Route path="/show-assignment/:teacher_id/:student_id" element={<ShowAssignment/>}></Route>
        <Route path="/my-assignments" element={<StudentAssignments/>}></Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default Main;
