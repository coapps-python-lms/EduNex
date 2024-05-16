import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";

const baseUrl = "http://127.0.0.1:8000/api";

function AddQuiz() {
  useEffect(()=>{
    window.document.title="Add Quiz"
  })
  const teacherId = localStorage.getItem("teacherId");
  const [QuizData, setQuizData] = useState({

    title: "",
    detail: "",
  });


  const handleChange = (event) => {
    const { name, value} = event.target; // Destructure event target
    setQuizData({
      ...QuizData,
      [name]: value, // Update other fields
    });
    //own
  };

  const submitForm = async () => {
    const _formData = new FormData();
  
    _formData.append("teacher", teacherId); // Assuming teacher ID is always 1
    _formData.append("title", QuizData.title);
    _formData.append("detail", QuizData.detail);
    try {
      const response = await axios.post(baseUrl + "/quiz/", _formData)
      .then((res)=>{
        if (res.status === 200 || res.status===201) {
            Swal.fire({
                title: "Quiz Created successfully!!",
                icon: "success",
                toast: true,
                timer: 3000,
                position: "top-right",
                timerProgressBar: true,
                showConfirmButton: false,
              });
        }
        console.log("Quiz created successfully:", response.data);
      window.location.href = "/add-quiz";
      })
    } catch (error) {
      console.error("Error creating quiz:", error.response?.data)
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Quiz</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="title" className="col-sm-2 col-form-label">
                  Title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={handleChange}
                    name="title"
                    className="form-control"
                    id="title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="detail" className="col-sm-2 col-form-label">
                  Detail
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="detail"
                    onChange={handleChange}
                    name="detail"
                  ></textarea>
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
export default AddQuiz;
