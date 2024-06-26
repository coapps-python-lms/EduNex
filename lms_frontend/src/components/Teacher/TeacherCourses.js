import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function TeacherCourses() {
  const [courseData, setCourseData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);
  // fetch course data
 
  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher-courses/" + teacherId).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [teacherId]);
  useEffect(() => {
    document.title = "Teacher Course";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-2">
          <TeacherSidebar />
        </aside>
        <section className="col-md-10">
          <div className="card">
            <h5 className="card-header"> My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Image</th>
                    <th>Enrolled Students</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((course, index) => (
                    <tr>
                      <td><Link to={`/all-chapters/${course.id}`}>{course.title}</Link></td>
                      <td>{course.course_rating&& 
                        <span>{course.course_rating}/5</span>}
                        {!course.course_rating&& 
                        <span>0/5</span>}
                        </td>
                      <td>
                        <img
                          src={course.featured_img}
                          width="80"
                          className="rounded"
                          alt={course.title}
                        />
                      </td>
                      <td>
                        <Link to={`/enrolled-students/`+course.id}>{course.total_enrolled_students}</Link>
                      </td>
                      <td>
                      <Link
                          to={"/edit-course/" + course.id}
                          className="btn btn-info btn-sm ms-2"
                        >
                         Edit
                        </Link>
                        <Link
                          to={"/study-material/" + course.id}
                          className="btn btn-primary btn-sm ms-2"
                        >
                        Study Material
                        </Link>
                        <Link
                          to={"/add-chapter/" + course.id}
                          className="btn btn-success btn-sm ms-2"
                        >
                          Add Chapter
                        </Link>
                        <Link
                          to={"/assign-quiz/" + course.id}
                          className="btn btn-warning btn-sm ms-2"
                        >
                          Assign Quiz
                        </Link>
                        <button className="btn btn-danger btn-sm ms-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default TeacherCourses;
