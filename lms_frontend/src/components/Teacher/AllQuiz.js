import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import Swal from "sweetalert2";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function AllQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);
  // fetch course data

  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher-quiz/" + teacherId).then((res) => {
        setQuizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [teacherId]);
  useEffect(() => {
    document.title = "Teacher Quiz";
  });
  const handleDeleteClick = (quiz_id) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete this quiz",
      icon: "info",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/quiz/" + quiz_id).then((res) => {
            Swal.fire("success", "Quiz deleted successfully!!");
            try {
              axios
                .get(`${baseUrl}/teacher-quiz/${teacherId}`)
                .then((res) => {
                  setTotalResult(res.data.length);
                  setQuizData(res.data);
                });
            } catch (error) {
              console.log(error);
            }
          });
          //
        } catch (error) {
          Swal.fire("error", "Quiz not deleted");
        }
      } else {
        Swal.fire("error", "Quiz not deleted!!");
      }
    });
  };


  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Quiz</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Questions</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.map((quiz, index) => (
                    <tr>
                      <td>
                        <Link to={`/all-questions/${quiz.id}`}>
                          {quiz.title}
                        </Link>
                      </td>
                      <td>
                        <Link to="#">10</Link>
                      </td>
                      <td>
                        <Link to={"/edit-quiz/" + quiz.id} className="btn btn-info btn-sm ms-2">
                          Edit
                        </Link>
                        <Link
                          to={"/add-quiz-question/" + quiz.id}
                          className="btn btn-success btn-sm ms-2"
                        >
                          Add Questions
                        </Link>
                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteClick(quiz.id)}>
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
export default AllQuiz;
