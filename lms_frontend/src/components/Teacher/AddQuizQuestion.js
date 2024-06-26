import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function AddQuizQuestion() {
  const [questionData, setQuestionData] = useState({
    quiz: "",
    questions: "",
    ans1:"",
    ans2:"",
    ans3:"",
    ans4:"",
    righ_ans:"",
  });
  
  const handleChange = (event) => {
    const { name, value} = event.target; // Destructure event target

    setQuestionData({
      ...questionData,
      [name]: value, // Update other fields
    });
  };
  const { quiz_id } = useParams();
  
  const submitForm = async () => {
    const _formData = new FormData();
    _formData.append("quiz", quiz_id); // Assuming teacher ID is always 1
    _formData.append("questions", questionData.questions);
    _formData.append("ans1", questionData.ans1);
    _formData.append("ans2", questionData.ans2);
    _formData.append("ans3", questionData.ans3);
    _formData.append("ans4", questionData.ans4);
    _formData.append("righ_ans", questionData.righ_ans);

    try {
      const response = await axios.post(baseUrl + "/quiz-questions/"+quiz_id, _formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res)=>{
        if (res.status === 200 ||res.status===201) {
            Swal.fire({
              title: "Quiz created successfully!!",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        console.log("Quiz created successfully:", response.data);
        window.location.reload()
      })

    } catch (error) {
      console.error("Error creating chapter:", error.response?.data);
      // Handle errors: display error messages based on response
    }
  };

  useEffect(() => {
    document.title = "Add Quiz Question";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Quiz Question</h5>
            <div className="card-body">
            <div className="mb-3 row">
                <label for="questions" className="col-sm-2 col-form-label">
                  Question
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="questions"
                    onChange={handleChange}
                    name="questions"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="ans1" className="col-sm-2 col-form-label">
                  Answer 1
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="ans1"
                    onChange={handleChange}
                    name="ans1"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="ans2" className="col-sm-2 col-form-label">
                  Answer 2
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="ans2"
                    onChange={handleChange}
                    name="ans2"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="ans3" className="col-sm-2 col-form-label">
                  Answer 3
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="ans3"
                    onChange={handleChange}
                    name="ans3"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="ans4" className="col-sm-2 col-form-label">
                  Answer 4
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="ans4"
                    onChange={handleChange}
                    name="ans4"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="righ_ans" className="col-sm-2 col-form-label">
                  Right Answer
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="righ_ans"
                    onChange={handleChange}
                    name="righ_ans"
                  />
                </div>
              </div>
              <div>
                <hr />
                <button className="btn btn-primary" onClick={submitForm}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default AddQuizQuestion;
