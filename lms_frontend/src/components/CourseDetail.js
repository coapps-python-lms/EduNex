import { useParams,Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
const baseUrl = "http://127.0.0.1:8000/api";
const siteUrl = "http://127.0.0.1:8000/";
function CourseDetail() {
  const [chapterData, setChapterData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  const [userLoginStatus, setUserLoginStatus] = useState([]);
  const [enrollStatus, setEnrollStatus] = useState([]);
  let { course_id } = useParams();
   // fetch course data
   const studentId = localStorage.getItem("studentId");
   useEffect(() => {
    try {
      axios.get(`${baseUrl}/course/${course_id}`).then((res) => {
        setCourseData(res.data);
        setTeacherData(res.data.teacher);
        setChapterData(res.data.course_chapters);
        setRelatedCourseData(JSON.parse(res.data.related_videos));
        setTechListData(res.data.tech_list);
      });
    } catch (error) {
      console.log(error);
    }
    //enroll status
    try {
      axios.get(baseUrl+"/fetch-enroll-status/"+studentId+"/"+course_id).then((res) => {
        if(res.data.bool===true){
          setEnrollStatus('success')
        }
      });
    } catch (error) {
      console.log(error);
    }
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
      if (studentLoginStatus === "true") {
        setUserLoginStatus('success')
      }
  }, [course_id]); 
  const enrollCourse=()=>{
    
    console.log(studentId);
    // fetch course data
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", studentId); 
    try {
      axios.post(baseUrl + "/student-enroll-course/", _formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res)=>{
        if (res.status === 200 || res.status===201) {
          Swal.fire({
            title: "You have enrolled successfully!!",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
        setEnrollStatus('success')
        console.log(res.data);
      })
     
      // window.location.href = "/add-courses";
      // // Handle success: redirect, show success message
    } catch (error) {
      console.error("Error while enrolling the course:", error.response?.data);
      // Handle errors: display error messages based on response
    }
  }
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img
            src={courseData.featured_img}
            className="img-thumbnail"
            alt={courseData.title}
          />
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>
            {courseData.description}
          </p>
          <p className="fw-bold">
            Course By:<Link to={`/teacher-details/${teacherData.id}`}>{teacherData.full_name}</Link>
          </p>
          <p className="fw-bold">Technologies:&nbsp; 
          {techListData.map((tech, index) => (
            <>
            <Link to={`/category/${tech.trim()}`} className="badge badge-pill text-dark bg-warning ms-2">{tech.trim()}</Link>&nbsp;
            </>
  
          ))}
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 minutes </p>
          <p className="fw-bold">Total Enrolled: 456 students</p>
          <p className="fw-bold">Rating: 4/5 </p>
          {enrollStatus==='success'&& userLoginStatus==='success'&&
            <p><span>You have already enrolled in this course</span></p>
          }
          {userLoginStatus==='success'&& enrollStatus!=='success'&&
            <p><button type="button" className="btn btn-success" onClick={enrollCourse}>Enroll in this course</button></p>
          }
          {userLoginStatus!=='success'&& 
            <p><Link to="/student-login">Please login to enroll this course</Link>
            </p>
          }
        </div>
      </div>
      {/*Course videos */}
      {enrollStatus==='success'&& userLoginStatus==='success'&&
      <div className="card mt-4">
        <h5 className="card-header">In this course</h5>
        <ul className="list-group list-group-flush">
        {chapterData.map((chapter, index) => (
          <li className="list-group-item">
            {chapter.title}
            <span className="float-end">
              <span className="me-5">1 hour 30 mins</span>
            <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal1">
              <i className = "bi bi-youtube"></i>
            </button>
            </span>
            {/* <!-- Modal start --> */}
                <div className = "modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className = "modal-dialog modal-lg">
                    <div className = "modal-content">
                      <div className = "modal-header">
                        <h5 className = "modal-title" id="exampleModalLabel">Video 1</h5>
                        <button type="button" className = "btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className = "modal-body">
                        <div class="ratio ratio-16x9">
                          <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* <!-- Modal end --> */}
          </li>
          
        ))}
        </ul>
      </div>}
      <h3 className="pb-1 mb-4 mt-5">
        Related courses
      </h3>
      <div className="row mb-4">
      {relatedCourseData.map((rcourse, index) => (
        <div className="col-md-3">
          <div className="card">
            <Link target="___blank" to={`/detail/${rcourse.pk}`}>
              <img src={`${siteUrl}media/${rcourse.fields.featured_img}`} className="card-img-top" alt={rcourse.fields.title} />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link>
              </h5>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
export default CourseDetail;
