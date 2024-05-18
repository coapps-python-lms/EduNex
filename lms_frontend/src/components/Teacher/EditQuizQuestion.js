import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function EditQuizQuestion() {
  const [questionData, setQuestionData] = useState({
    questions: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    righ_ans: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/quiz-questions/${id}`);
        setQuestionData({
          questions: res.data.questions,
          ans1: res.data.ans1,
          ans2: res.data.ans2,
          ans3: res.data.ans3,
          ans4: res.data.ans4,
          righ_ans: res.data.righ_ans,
        });
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };

    fetchQuestionData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    const _formData = new FormData();
    _formData.append("questions", questionData.questions);
    _formData.append("ans1", questionData.ans1);
    _formData.append("ans2", questionData.ans2);
    _formData.append("ans3", questionData.ans3)
    _formData.append("ans4", questionData.ans4);
    _formData.append("righ_ans", questionData.righ_ans);

    try {
      const res = await axios.put(`${baseUrl}/quiz-questions/${id}`, _formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Quiz edited successfully!!",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Reload the window or redirect to another page
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating quiz question:", error.response?.data);
      // Handle errors: display error messages based on response
    }
  };

  useEffect(() => {
    document.title = "Edit Quiz Question";
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Edit Quiz Question</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label htmlFor="questions" className="col-sm-2 col-form-label">
                  Question
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="questions"
                    onChange={handleChange}
                    name="questions"
                    value={questionData.questions}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="ans1" className="col-sm-2 col-form-label">
                  Answer 1
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="ans1"
                    onChange={handleChange}
                    name="ans1"
                    value={questionData.ans1}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="ans2" className="col-sm-2 col-form-label">
                  Answer 2
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="ans2"
                    onChange={handleChange}
                    name="ans2"
                    value={questionData.ans2}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="ans3" className="col-sm-2 col-form-label">
                  Answer 3
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="ans3"
                    onChange={handleChange}
                    name="ans3"
                    value={questionData.ans3}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="ans4" className="col-sm-2 col-form-label">
                  Answer 4
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="ans4"
                    onChange={handleChange}
                    name="ans4"
                    value={questionData.ans4}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="righ_ans" className="col-sm-2 col-form-label">
                  Right Answer
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="righ_ans"
                    onChange={handleChange}
                    name="righ_ans"
                    value={questionData.righ_ans}
                  />
                </div>
              </div>
              <div>
                <hr />
                <button className="btn btn-primary" onClick={submitForm}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditQuizQuestion;

