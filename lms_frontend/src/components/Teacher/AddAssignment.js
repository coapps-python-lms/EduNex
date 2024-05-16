import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import Swal from "sweetalert2";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function AddAssignment() {
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    detail: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure event target

    setAssignmentData({
      ...assignmentData,
      [name]: value, // Update other fields
    });
  };
  const { student_id } = useParams();
  const { teacher_id } = useParams();
  const submitForm = async () => {
    const _formData = new FormData();
    _formData.append("student", student_id);
    _formData.append("teacher", teacher_id); // Assuming teacher ID is always 1
    _formData.append("title", assignmentData.title);
    _formData.append("detail", assignmentData.detail);

    try {
      await axios
        .post(
          baseUrl + "/student-assignment/" + teacher_id + "/" + student_id,
          _formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Assignment added successfully!!",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            })}
            console.log(res.data);
            const _notifyData=new FormData();
            _notifyData.append('teacher',teacher_id)
            _notifyData.append('notify_subject','assignment')
            _notifyData.append('notify_for','student')
            _notifyData.append('student',student_id)
            axios.post(baseUrl+'/save-notification/',_notifyData,{
              headers:{
                'Content-Type':'multipart/form-data'
              }
            })
            .then((res)=>{
              console.log('notification added')
            })
          
        });
      window.location.reload();
    } catch (error) {
      console.error("Error creating chapter:", error.response?.data);
    }
  };

  useEffect(() => {
    document.title = "Add Assingment";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Assignment</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="title" className="col-sm-2 col-form-label">
                  Title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    onChange={handleChange}
                    name="title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="description" className="col-sm-2 col-form-label">
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
export default AddAssignment;
