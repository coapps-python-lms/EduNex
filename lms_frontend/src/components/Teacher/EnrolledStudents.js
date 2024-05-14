import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function EnrolledStudents() {
  const [studentData, setStudentData] = useState([]);
  const { course_id } = useParams();

  // fetch course data

  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/fetch-enrolled-students/" + course_id)
        .then((res) => {
          setStudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [course_id]);
  console.log(studentData);
  useEffect(() => {
    document.title = "Enrolled students list";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Emrolled Student List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Interested Categories</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => (
                    <tr>
                      <td>{row.student.full_name}</td>
                      <td>{row.student.email}</td>
                      <td>{row.student.username}</td>
                      <td>{row.student.interested_categories}</td>
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
export default EnrolledStudents;
