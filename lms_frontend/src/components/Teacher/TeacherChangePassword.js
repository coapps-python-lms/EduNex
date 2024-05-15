import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherChangePassword() {
  const teacherId = localStorage.getItem("teacherId");
  const [teacherData, setTeacherData] = useState({
    pssword: "",
   
  });
  const handleChange = (event) => {
    const { name, value} = event.target;

    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };
  useEffect(() => {
    // fetch current teacher data
    try {
      axios.get(baseUrl + "/teacher/" + teacherId).then((res) => {
        setTeacherData({
          password: res.data.password,
        });
      });
    } catch (error) {
      console.log(error);
    }
    // end
  }, [teacherId]);
  const submitForm = async () => {
    const teacherFormData = new FormData();
    teacherFormData.append("password", teacherData.password);
    try {
      const response = await axios
        .post(baseUrl + "/teacher/change-password/" + teacherId + "/", teacherFormData)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Password updated successfully!!",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            window.location.href = "/teacher-logout ";
          }
          else{
            alert('Oops....Some error occured!!')
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
    document.title = "Teacher Change Password";
  });
 
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Change Password</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-lable">
                  New Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword"
                    name="password"
                    // value={teacherData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <hr />
                <button className="btn btn-primary" onClick={submitForm}>Update</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default TeacherChangePassword;
