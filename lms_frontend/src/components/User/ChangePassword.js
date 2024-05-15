import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
const baseUrl = "http://127.0.0.1:8000/api";

function ChangePassword() {
  const studentId = localStorage.getItem("studentId");
  const [studentData, setStudentData] = useState({
    pssword: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setStudentData({
      ...studentData,
      [name]: value,
    });
  };
  useEffect(() => {
    // fetch current teacher data
    try {
      axios.get(baseUrl + "/student/" + studentId).then((res) => {
        setStudentData({
          password: res.data.password,
        });
      });
    } catch (error) {
      console.log(error);
    }
    // end
  }, []);
  const submitForm = async () => {
    const studentFormData = new FormData();
    studentFormData.append("password", studentData.password);
    try {
      const response = await axios
        .post(
          baseUrl + "/student/change-password/" + studentId + "/",
          studentFormData
        )
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
            window.location.href = "/student-logout ";
          } else {
            alert("Oops....Some error occured!!");
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
    document.title = "Student Change Password";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
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
                    onChange={handleChange}
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
export default ChangePassword;
