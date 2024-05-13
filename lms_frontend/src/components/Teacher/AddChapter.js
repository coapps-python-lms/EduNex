import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function AddChapter() {
  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
    video: null, // Handle initial null value for file upload
    remarks: "",
  });
  const [errors, setErrors] = useState({}); // State for error messages

  const handleChange = (event) => {
    const { name, value, files } = event.target; // Destructure event target

    // Handle file upload separately
    if (files) {
      setChapterData({
        ...chapterData,
        [name]: files[0], // Set file object
      });
      return; // Prevent further processing for file uploads
    }

    setChapterData({
      ...chapterData,
      [name]: value, // Update other fields
    });
  };
  const { course_id } = useParams();
  const submitForm = async () => {
    const _formData = new FormData();

    // Client-side validation (optional but recommended)
    let isValid = true;
    const validationErrors = {};
    if (!chapterData.title) {
      isValid = false;
      validationErrors.title = "Title is required";
    }
    if (!chapterData.description) {
      isValid = false;
      validationErrors.description = "Description is required";
    }
    // Add validation checks for other fields if needed

    if (!isValid) {
      setErrors(validationErrors); // Set error messages
      return; // Prevent API request if validation fails
    }

    _formData.append("course", course_id); // Assuming teacher ID is always 1
    _formData.append("title", chapterData.title);
    _formData.append("description", chapterData.description);
    _formData.append("video", chapterData.video, chapterData.video?.name); // Handle null image
    _formData.append("remarks", chapterData.remarks);

    try {
      const response = await axios.post(baseUrl + "/chapter/", _formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Chapter created successfully:", response.data);
      window.location.href = "/add-chapter/1";
      // Handle success: redirect, show success message
    } catch (error) {
      console.error("Error creating chapter:", error.response?.data);
      // Handle errors: display error messages based on response
    }
  };

  useEffect(() => {
    document.title = "Add Chapter";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Chapter</h5>
            <div className="card-body">
              {errors && (
                <div
                  className="alert alert-danger"
                  role="alert"
                  style={{
                    backgroundColor: "transparent",
                    color: "red",
                    outline: "none",
                    border: "none",
                  }}
                >
                  {Object.values(errors).map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
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
                  Video
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    className="form-control"
                    name="video"
                    onChange={handleChange}
                    id="video"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="techs" className="col-sm-2 col-form-label">
                  Remarks
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="remarks"
                    onChange={handleChange}
                    name="remarks"
                    placeholder="This video is focused on basics of introduction"
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
export default AddChapter;
