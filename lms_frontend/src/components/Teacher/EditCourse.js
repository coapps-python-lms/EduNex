import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";

const baseUrl = "http://127.0.0.1:8000/api";

function EditCourse() {
  const [cats, setCats] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    prev_fimg: "",
    f_img: "", // Handle initial null value for file upload
    techs: "",
  });
  const [errors, setErrors] = useState({}); // State for error messages
  const { course_id } = useParams();
  useEffect(() => {
    try {
      axios.get(baseUrl + "/category").then((res) => {
        setCats(res.data);
      });
    } catch (error) {
      console.log(error); // Log errors for debugging
    }

    // fetch current course data
    try {
      axios.get(baseUrl + "/teacher-course-detail/" + course_id).then((res) => {
        setCourseData({
          category: res.data.category,
          title: res.data.title,
          description: res.data.description,
          prev_fimg: res.data.featured_img,
          f_img: "",
          techs: res.data.techs,
        });
      });
    } catch (error) {
      console.log(error);
    }
    // end
  }, [course_id]);

  const handleChange = (event) => {
    const { name, value, files } = event.target; // Destructure event target

    // Handle file upload separately
    if (files) {
      setCourseData({
        ...courseData,
        [name]: files[0], // Set file object
      });
      return; // Prevent further processing for file uploads
    }

    setCourseData({
      ...courseData,
      [name]: value, // Update other fields
    });
  };

  const submitForm = async () => {
    const _formData = new FormData();

    // Client-side validation (optional but recommended)
    let isValid = true;
    const validationErrors = {};
    if (!courseData.category) {
      isValid = false;
      validationErrors.category = "Category is required";
    }
    if (!courseData.title) {
      isValid = false;
      validationErrors.title = "Title is required";
    }
    // Add validation checks for other fields if needed

    if (!isValid) {
      setErrors(validationErrors); // Set error messages
      return; // Prevent API request if validation fails
    }

    _formData.append("category", courseData.category);
    _formData.append("teacher", teacherId); // Assuming teacher ID is always 1
    _formData.append("title", courseData.title);
    _formData.append("description", courseData.description);
    if (courseData.f_img !== "") {
      _formData.append(
        "featured_img",
        courseData.f_img,
        courseData.f_img?.name
      );
    }
    // Handle null image
    _formData.append("techs", courseData.techs);

    try {
      const response = await axios
        .put(baseUrl + "/teacher-course-detail/" + course_id, _formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Course updated successfully!!",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          console.log("Course updated successfully:", response.data);
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
            <h5 className="card-header">Edit Course</h5>
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
                <label for="category" className="col-sm-2 col-form-label">
                  Category
                </label>
                <div className="col-sm-10">
                  <select
                    name="category"
                    onChange={handleChange}
                    className="form-control"
                    value={courseData.category}
                  >
                    {cats.map((category, index) => {
                      return (
                        <option key={index} value={category.id}>
                          {category.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
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
                    value={courseData.title}
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
                    value={courseData.description}
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="video" className="col-sm-2 col-form-lable">
                  Featured Image
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    className="form-control"
                    name="f_img"
                    onChange={handleChange}
                    id="video"
                  />
                  {courseData.prev_fimg && (
                    <p className="mt-2">
                      <img
                        src={courseData.prev_fimg}
                        width="300"
                        alt="prev_fimg"
                      />
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label for="techs" className="col-sm-2 col-form-label">
                  Technologies
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="techs"
                    placeholder="php, java, etc.."
                    name="techs"
                    onChange={handleChange}
                    value={courseData.techs}
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
export default EditCourse;
