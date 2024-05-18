import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/teacher/";

function TeacherRegister() {
  const navigate=useNavigate()
  useEffect(() => {
    document.title = "Teacher Register";
  });

  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    status: "",
    otp_digit:''
  });

  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async () => {
    const otp_digit=Math.floor(100000 +Math.random()*900000)
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);
    teacherFormData.append("otp_digit", otp_digit);

    try {
      await axios.post(baseUrl, teacherFormData)
      .then((response)=>{
        navigate('/verify-teacher/'+response.data.id)
                //  window.location.href='/verify-teacher/'+response.data.id
       
      // setTeacherData({
      //   full_name: "",
      //   email: "",
      //   password: "",
      //   qualification: "",
      //   mobile_no: "",
      //   skills: "",
      //   status: "success",
      // });
      console.log(response.data);
    })
    } catch (error) {
      console.log(error);
      setTeacherData({ ...teacherData, status: "error" });
    }
  };
  
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {teacherData.status === "success" && (
            <p className="text-success">Thanks for your registration</p>
          )}
          {teacherData.status === "error" && (
            <p className="text-danger">Something went wrong</p>
          )}
          <div className="card">
            <h5 className="card-header">Teacher Register</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputFullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    value={teacherData.full_name}
                    onChange={handleChange}
                    type="text"
                    name="full_name"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    value={teacherData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword" className="form-label">
                    Password
                  </label>
                  <input
                    value={teacherData.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputQualification"
                    className="form-label"
                  >
                    Qualification
                  </label>
                  <input
                    value={teacherData.qualification}
                    onChange={handleChange}
                    type="text"
                    name="qualification"
                    className="form-control"
                  />
                  <div id="qualificationHelp" className="form-text">
                    Professor, Assistant Professor, etc..
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputMobileNo" className="form-label">
                    Mobile number
                  </label>
                  <input
                    value={teacherData.mobile_no}
                    onChange={handleChange}
                    type="number"
                    name="mobile_no"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputSkills" className="form-label">
                    Skills
                  </label>
                  <textarea
                    value={teacherData.skills}
                    onChange={handleChange}
                    className="form-control"
                    name="skills"
                  ></textarea>
                  <div id="skillsHelp" type="text" className="form-text">
                    Php, Python, Javascript etc..
                  </div>
                </div>
                <div>
                  <h6>
                    Already have an account?{" "}
                    <Link to="/teacher-login">Login</Link>
                  </h6>
                </div>

                <button
                  onClick={submitForm}
                  type="button"
                  className="btn btn-primary"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;
