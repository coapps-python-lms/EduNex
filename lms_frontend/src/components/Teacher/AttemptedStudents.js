import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import QuizResult from "./QuizResult";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function AttemptedStudents() {
  const [studentData, setStudentData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  const { quiz_id } = useParams();

  useEffect(() => {
    document.title = "Assign Quiz";
  }, []);

  // Fetch quiz data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/attempted-quiz/${quiz_id}`);
        setStudentData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentData();
  }, [quiz_id]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Attempted Student List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => (
                    <tr key={row.id}>
                      <td>{row.student.full_name}</td>
                      <td>{row.student.email}</td>
                      <td>{row.student.username}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target={`#resultModal${row.id}`}
                        >
                          Quiz Result
                        </button>
                       
                        <div
        className="modal fade"
        id={`resultModal${row.id}`}
        tabIndex="-1"
        aria-labelledby="resultModalLabel"
        aria-hidden="true"
        >
           <QuizResult quiz={row.quiz.id} student={row.student.id}/>
        </div>
        
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

export default AttemptedStudents;
