import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function Login() {
  const navigate=useNavigate()
  const [studentLoginData, setStudentLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setStudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,
    });
  };
  const [errorMsg, setErrorMsg] = useState("");
  const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append("email", studentLoginData.email);
    studentFormData.append("password", studentLoginData.password);
    try {
      axios.post(baseUrl + "/student-login", studentFormData).then((res) => {
        if (res.data.bool === true) {
          if (res.data.login_via_otp === true) {
            navigate('/verify-student/'+res.data.student_id)
          }
          else{
          localStorage.setItem("studentLoginStatus", true);
          localStorage.setItem("studentId", res.data.student_id);
          navigate( "/student-dashboard")
          } 
        } else { 
          setErrorMsg(res.data.msg);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus === "true") {
    window.location.href = "/student-dashboard";
  }

  useEffect(() => {
    document.title = "Student Login";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">User Login</h5>
            <div className="card-body">
            {errorMsg && <p className="text-danger">{errorMsg}</p>}
             
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                   Email
                  </label>
                  <input type="email" name="email" value={studentLoginData.email} onChange={handleChange}className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password" value={studentLoginData.password} onChange={handleChange}
                  />
                </div>
                {/* <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Remember me
                  </label>
                </div> */}
                <button type="submit" onClick={submitForm} className="btn btn-primary">
                  Login
                </button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
