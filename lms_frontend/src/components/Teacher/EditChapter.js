import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function EditChapter() {
  useEffect(() => {
    document.title = "Update Chapter";
  });
  const [chapterData, setChapterData] = useState({
    course: "",
    title: "",
    description: "",
    prev_video: "",
    video: null,
    remarks: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value, files } = event.target;

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
  const { chapter_id } = useParams();
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

    _formData.append("course", chapterData.course);
    _formData.append("title", chapterData.title);
    _formData.append("description", chapterData.description);
    if (chapterData.video !== "") {
      _formData.append("video", chapterData.video, chapterData.video?.name);
    }
    // Handle null image
    _formData.append("remarks", chapterData.remarks);

    try {
      const response = await axios
        .put(baseUrl + "/chapter/" + chapter_id, _formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Chapter updated successfully!!",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          console.log("Chapter updated successfully:", response.data);
        });

      // window.location.href = "/add-chapter/1";
    } catch (error) {
      console.error("Error updating chapter:", error.response?.data);
    }
  };
  useEffect(() => {
    try {
      axios.get(baseUrl + "/chapter/" + chapter_id).then((res) => {
        setChapterData({
          course: res.data.course,
          title: res.data.title,
          description: res.data.description,
          prev_video: res.data.video,
          remarks: res.data.remarks,
          video: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [chapter_id]);

  console.log(chapterData);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Update Chapter</h5>
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
                    defaultValue={chapterData.title}
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
                    defaultValue={chapterData.description}
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
                {chapterData.prev_video && (
                  <video controls width="100%" height="240" className="mt-2">
                    <source src={chapterData.prev_video} type="video/webm" />
                    <source src={chapterData.prev_video} type="video/ogg" />
                    <source src={chapterData.prev_video} type="video/mp4" />
                  </video>
                )}
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
                    value={chapterData.remarks}
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
export default EditChapter;
