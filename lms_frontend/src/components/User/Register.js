import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/student/";
function Register() {
  const navigate=useNavigate()
  useEffect(() => {
    document.title = "Student Register";
  });

  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    interested_categories: "",
    status: "",
    otp_digit:''
  });
  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };
  const submitForm = async () => {
    const otp_digit=Math.floor(100000 +Math.random()*900000)
    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("email", studentData.email);
    studentFormData.append("username", studentData.username);
    studentFormData.append("password", studentData.password);
    studentFormData.append(
      "interested_categories",
      studentData.interested_categories
    );
    studentFormData.append("otp_digit", otp_digit);

    try {
     await axios.post(baseUrl, studentFormData)
     .then((response)=>{
      navigate('/verify-student/'+response.data.id)
      console.log(response.data);
     })
      // setStudentData({
      //   full_name: "",
      //   email: "",
      //   username: "",
      //   password: "",
      //   interested_categories: "",
      //   status: "success",
      // });

    } catch (error) {
      console.log(error);
      setStudentData({ ...studentData, status: "error" });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {studentData.status === "success" && (
            <p className="text-success">Thanks for your registration</p>
          )}
          {studentData.status === "error" && (
            <p className="text-danger">Something went wrong</p>
          )}
          <div className="card">
            <h5 className="card-header">User Register</h5>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="exampleInputFullname" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={studentData.full_name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={studentData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={studentData.username}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={studentData.password}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputInterests" className="form-label">
                  Intrests
                </label>
                <textarea
                  className="form-control"
                  value={studentData.interested_categories}
                  onChange={handleChange}
                  name="interested_categories"
                ></textarea>
                <div id="emailHelp" className="form-text">
                  Php, Python, Javascript etc..
                </div>
              </div>
                       
              <button
                type="submit"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
