import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";
const baseUrl = "http://127.0.0.1:8000/api/";

function TeacherProfileSettings() {
  const teacherId = localStorage.getItem("teacherId");
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    prev_profile_picture: "",
    profile_picture: "",
    status: "",
  });
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // Handle file upload separately
    if (files) {
      setTeacherData({
        ...teacherData,
        [name]: files[0], // Set file object
      });
      return; // Prevent further processing for file uploads
    }
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };
  useEffect(() => {
    // fetch current teacher data
    try {
      axios.get(baseUrl + "teacher/" + teacherId).then((res) => {
        setTeacherData({
          full_name: res.data.full_name,
          email: res.data.email,
          qualification: res.data.qualification,
          prev_profile_picture: res.data.profile_picture,
          profile_picture: "",
          mobile_no: res.data.mobile_no,
          skills: res.data.skills,
        });
      });
    } catch (error) {
      console.log(error);
    }
    // end
  }, [teacherId]);
  const submitForm = async () => {
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);
    if (teacherData.profile_picture !== "") {
      teacherFormData.append(
        "profile_picture",
        teacherData.profile_picture,
        teacherData.profile_picture?.name
      );
    }

    try {
      const response = await axios
        .put(baseUrl + "teacher/" + teacherId + "/", teacherFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Profile updated successfully!!",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          console.log("Data updated successfully:", response.data);
        });

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setTeacherData({ ...teacherData, status: "error" });
    }
  };
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === true) {
    window.location.href = "/teacher-dashboard";
  }
  useEffect(() => {
    document.title = "Teacher Profile Settings";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label
                  htmlFor="inputFullname"
                  className="col-sm-2 col-form-label"
                >
                  Full Name
                </label>
                <div className="col-sm-10">
                  <input
                    value={teacherData.full_name}
                    onChange={handleChange}
                    type="text"
                    name="full_name"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="video" className="col-sm-2 col-form-lable">
                  Profile Picture
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    className="form-control"
                    name="profile_picture"
                    onChange={handleChange}
                    id="video"
                  />
                  {teacherData.prev_profile_picture && (
                    <p className="mt-2">
                      <img
                        src={teacherData.prev_profile_picture}
                        width="300"
                        alt="prev_profile_picture"
                      />
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    value={teacherData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="inputQualification"
                  className="col-sm-2 col-form-lable"
                >
                  Qualification
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    value={teacherData.qualification}
                    onChange={handleChange}
                    type="text"
                    name="qualification"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="inputSkills"
                  className="col-sm-2 col-form-lable"
                >
                  Skills
                </label>
                <div className="col-sm-10">
                  <textarea
                    value={teacherData.skills}
                    onChange={handleChange}
                    type="text"
                    name="skills"
                    className="form-control"
                  ></textarea>
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
export default TeacherProfileSettings;
