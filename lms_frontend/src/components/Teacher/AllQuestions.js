import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";
function AllQuestions() {
  const [questionData, setQuestionData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { quiz_id } = useParams();
 
  useEffect(() => {
    try {
      axios.get(`${baseUrl}/quiz-questions/${quiz_id}`).then((res) => {
        setTotalResult(res.data.length);
        setQuestionData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleDeleteClick = (question_id) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete this chapter",
      icon: "info",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/question/" + question_id).then((res) => {
            Swal.fire("success", "Question deleted successfully!!");
            try {
              axios
                .get(`${baseUrl}/quiz-questions/${quiz_id}`)
                .then((res) => {
                  setTotalResult(res.data.length);
                  setQuestionData(res.data);
                });
            } catch (error) {
              console.log(error);
            }
          });
          //
        } catch (error) {
          Swal.fire("error", "Question not deleted");
        }
      } else {
        Swal.fire("error", "Question not deleted!!");
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
            <h5 className="card-header"> All Questions ({totalResult})<Link className="btn btn-success btn-sm float-end" to={'/add-quiz-question/'+quiz_id}>Add Question</Link></h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questionData.map((question, index) => (
                    <tr>
                      <td>
                        <Link to={"/edit-question/" +question.id}>
                          {question.questions}
                        </Link>
                      </td>
                    
                      <td>
                        <Link
                          to={"/edit-question/" + question.id}
                          className="btn btn-info"
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </Link>

                        <button
                          className="btn btn-danger ms-4"
                          onClick={() => handleDeleteClick(question.id)}
                        >
                          <i className="bi bi-trash"></i>Delete
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
export default AllQuestions;
