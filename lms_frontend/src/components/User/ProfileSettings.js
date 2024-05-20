import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
const baseUrl = "http://127.0.0.1:8000/api/";

function ProfileSettings() {
  const studentId = localStorage.getItem("studentId");
  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    username: "",
    interested_categories: "",
    prev_profile_picture: "",
    profile_picture: "",
    status: "",
    login_via_otp:''
  });
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // Handle file upload separately
    if (files) {
      setStudentData({
        ...studentData,
        [name]: files[0], // Set file object
      });
      return; // Prevent further processing for file uploads
    }
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };
  useEffect(() => {
    // fetch current teacher data
    try {
      axios.get(baseUrl + "student/" + studentId).then((res) => {
        setStudentData({
          full_name: res.data.full_name,
          email: res.data.email,
          username: res.data.username,
          interested_categories: res.data.interested_categories,
          prev_profile_picture: res.data.profile_picture,
          profile_picture: "",
          login_via_otp:res.data.login_via_otp
        });
      });
    } catch (error) {
      console.log(error);
    }
    // end
  }, []);
  const submitForm = async () => {
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", studentData.full_name);
    teacherFormData.append("email", studentData.email);
    teacherFormData.append("username", studentData.username);
    teacherFormData.append("login_via_otp", studentData.login_via_otp);
    teacherFormData.append(
      "interested_categories",
      studentData.interested_categories
    );
    if (studentData.profile_picture !== "") {
      teacherFormData.append(
        "profile_picture",
        studentData.profile_picture,
        studentData.profile_picture?.name
      );
    }

    try {
      const response = await axios
        .put(baseUrl + "student/" + studentId + "/", teacherFormData, {
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
      setStudentData({ ...studentData, status: "error" });
    }
  };
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus === true) {
    window.location.href = "/student-dashboard";
  }
  useEffect(() => {
    document.title = "Student Profile Settings";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
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
                    value={studentData.full_name}
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
                  {studentData.prev_profile_picture && (
                    <p className="mt-2">
                      <img
                        src={studentData.prev_profile_picture}
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
                    value={studentData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="inputUsername"
                  className="col-sm-2 col-form-lable"
                >
                  Username
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={studentData.username}
                    onChange={handleChange}
                    type="text"
                    name="username"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="inputSkills"
                  className="col-sm-2 col-form-lable"
                >
                  Interests
                </label>
                <div className="col-sm-10">
                  <textarea
                    value={studentData.interested_categories}
                    onChange={handleChange}
                    type="text"
                    name="interested_categories"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="inputFullname"
                  className="col-sm-2 col-form-label"
                >
                  Login Via OTP
                </label>
                <div className="col-sm-10">
                  <input
                    value={studentData.login_via_otp}
                    onChange={handleChange}
                    type="text"
                    name="login_via_otp"
                    className="form-control"
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
export default ProfileSettings;
