import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";
function ShowAssignment() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { teacher_id } = useParams();
  const { student_id } = useParams();

  // fetch course data
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/student-assignment/${teacher_id}/${student_id}`)
        .then((res) => {
          setTotalResult(res.data.length);
          setAssignmentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">
              {" "}
              All Assignments ({totalResult})
              <Link
                className="btn btn-success btn-sm float-end"
                to={"/add-assignment/" + teacher_id + "/" + student_id}
              >
                Add Assignment
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Detail</th>
                    <th>Student Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentData.map((row, index) => (
                    <tr>
                      <td>{row.title}</td>
                      <td>{row.detail}</td>
                      <td>
                        {row.student_status === false && (
                          <span className="badge bg-warning">Pending</span>
                        )}
                        {row.student_status === true && (
                          <span className="badge bg-success">Completed</span>
                        )}
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
export default ShowAssignment;
