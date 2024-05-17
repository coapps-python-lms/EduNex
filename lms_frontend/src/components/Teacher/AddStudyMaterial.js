import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function AddStudyMaterial() {
  const [studyData, setStudyData] = useState({
    course:"",
    title: "",
    description: "",
    upload: null, // Handle initial null value for file upload
    remarks: "",
  });


  const handleChange = (event) => {
    const { name, value, files } = event.target; // Destructure event target

    // Handle file upload separately
    if (files) {
        setStudyData({
        ...studyData,
        [name]: files[0], // Set file object
      });
      return; // Prevent further processing for file uploads
    }

    setStudyData({
      ...studyData,
      [name]: value, // Update other fields
    });
  };
  const { course_id } = useParams();
  const submitForm = async () => {
    const _formData = new FormData();
    _formData.append("course", course_id); // Assuming teacher ID is always 1
    _formData.append("title", studyData.title);
    _formData.append("description", studyData.description);
    _formData.append("upload", studyData.upload, studyData.upload?.name); // Handle null image
    _formData.append("remarks", studyData.remarks);

    try {
      const response = await axios.post(baseUrl + "/study-materials/"+course_id, _formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Material Added Successfully!!",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
        console.log("Material added successfully:", response.data);
      });


      console.log("Material Addedd Successfully:", response.data);
      window.location.href = "/study-materials/"+course_id;
      // Handle success: redirect, show success message
    } catch (error) {
      console.error("Error:", error.response?.data);
      // Handle errors: display error messages based on response
    }
  };

  useEffect(() => {
    document.title = "Add Study";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Study Material</h5>
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
                  Description
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="description"
                    onChange={handleChange}
                    name="description"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="video" className="col-sm-2 col-form-lable">
                  Upload
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    className="form-control"
                    name="upload"
                    onChange={handleChange}
                    id="upload"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="remarks" className="col-sm-2 col-form-label">
                  Remarks
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="remarks"
                    onChange={handleChange}
                    name="remarks"
                    placeholder="This file is focused on basics of introduction"
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
export default AddStudyMaterial;
