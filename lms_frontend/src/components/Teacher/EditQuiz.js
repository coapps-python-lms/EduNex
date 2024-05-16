import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";

const baseUrl = "http://127.0.0.1:8000/api";

function EditQuiz() {
  const teacherId = localStorage.getItem("teacherId");
  const [quizData, setQuizData] = useState({
    title: "",
    detail: "",
  });
  const { quiz_id } = useParams();
 useEffect(()=>{
    try {
        axios.get(baseUrl + "/teacher-quiz-detail/" + quiz_id).then((res) => {
          setQuizData({
            title: res.data.title,
            detail: res.data.detail,
          });
        });
      } catch (error) {
        console.log(error);
    }
 },[])
  
const handleChange = (event) => {
    const { name, value} = event.target; 
    setQuizData({
      ...quizData,
      [name]: value, 
    });
  };
  const submitForm = async () => {
    const _formData = new FormData();
    _formData.append("teacher", teacherId); 
    _formData.append("title", quizData.title);
    _formData.append("detail", quizData.detail);
    try {
      const response = await axios
        .put(baseUrl + "/teacher-quiz-detail/" + quiz_id, _formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Quiz updated successfully!!",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          console.log("Quiz updated successfully:", response.data);
        });
    } catch (error) {
      console.error("Error creating course:", error.response?.data);
      // Handle errors: display error messages based on response
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
            <h5 className="card-header">Edit Quiz</h5>
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
                    value={quizData.title}
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
                    value={quizData.detail}
                  ></textarea>
                </div>
              </div>
              <div>
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
export default EditQuiz;
