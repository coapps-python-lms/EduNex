import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function MyStudents() {
  const [studentData, setStudentData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  // fetch course data

  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/fetch-all-enrolled-students/"+teacherId)
        .then((res) => {
          setStudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [teacherId]);
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
            <h5 className="card-header">All Student List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Interested Categories</th>
                    <th>Assignment</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => (
                    <tr>
                      <td>{row.student.full_name}</td>
                      <td>{row.student.email}</td>
                      <td>{row.student.username}</td>
                      <td>{row.student.interested_categories}</td>
                      <td>
                        <Link to={`/show-assignment/${teacherId}/${row.student.id}`} className="btn btn-sm btn-warning">Assignments</Link>
                        <Link to={`/add-assignment/${teacherId}/${row.student.id}`} className="btn btn-sm btn-success ms-2">Add Assignment</Link>
                        <button className="btn btn-sm btn-primary ms-2" title='send message'><i class="bi bi-chat-fill"></i></button>
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
export default MyStudents;
