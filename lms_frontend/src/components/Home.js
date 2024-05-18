import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
// import AllCourses from "./AllCourses";
function Home() {
  useEffect(()=>{
    document.title = 'EduNex Home Page';
  })
  const [courseData, setCourseData] = useState([]);
  const [populaTeacherData, setPopularTeacherData] = useState([]);
  const [testimonialData, setTestmonialData] = useState([]);
  // fetch course data
  useEffect(() => {
    try {
      axios.get(baseUrl + "/course/?result=4").then((res) => {
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  // popular teachers
  try {
        axios.get(baseUrl+'/popular-teachers/?popular=1')
        .then((res)=>{
          setPopularTeacherData(res.data)
        })
      } catch (error) {
        console.log(error)
      }

      // testimonial
      try {
        axios.get(baseUrl+'/student-testimonial/')
        .then((res)=>{
          setTestmonialData(res.data)
        })
      } catch (error) {
        console.log(error)
        
      }
  }, []);
  // console.log(popularCourseData)
  return (
    <div className="container mt-4">
      {/**Latest courses */}
      <h3 className="pb-1 mb-4">
        Latest courses
        <Link to="/all-courses" className="btn btn-primary float-end">
          See all
        </Link>
      </h3>
      <div className="row mb-4">
      {courseData&&courseData.map((course,index)=>
         <div className="col-md-3 mb-4">
         <div className="card">
           <Link to={`/detail/${course.id}`}>
             <img src={course.featured_img} className="card-img-top" alt={course.title} />
           </Link>
           <div className="card-body">
             <h5 className="card-title">
               <Link to={`/detail/${course.id}`}>{course.title}</Link>
             </h5>
           </div>
         </div>
       </div>)}
      </div>
      {/**End Latest courses */}
      {/**Popular courses */}
      <h3 className="pb-1 mb-4">
        Popular courses
        <Link to="/popular-courses" className="btn btn-primary float-end">
          See all
        </Link>
      </h3>
      <div className="row mb-4">
      {courseData&&courseData.map((course,index)=>
         <div className="col-md-3 mb-4">
         <div className="card">
           <Link to={`/detail/${course.id}`}>
             <img src={course.featured_img} className="card-img-top" alt={course.title} />
           </Link>
           <div className="card-body">
             <h5 className="card-title">
               <Link to={`/detail/${course.id}`}>{course.title}</Link>
             </h5>
           </div>
           <div className="card-footer">
              <div className="title">
              <span>Ratings: {course.course_rating}/5</span>
                <span className="float-end">Views: {course.course_views}</span>
               </div>
            </div>
         </div>
       </div>)}
      </div>
      {/**End Popular courses */}
      {/**Popular teachers */}
      <h3 className="pb-1 mb-4 mt-5">
        Popular Teachers{" "}
        <Link to="/popular-teachers" className="btn btn-primary float-end">
          See all
        </Link>
      </h3>
      <div className="row mb-4">
        {populaTeacherData&&populaTeacherData.map((row,index)=>
        <div className="col-md-3">
          <div className="card">
            <Link to={`/teacher-details/${row.id}`}>
              <img src={row.profile_picture} className="card-img-top" alt={row.full_name}/>
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to={`/teacher-details/${row.id}`}>{row.full_name}</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Total Courses: {row.total_teacher_courses}</span>
               </div>
            </div>
          </div>
        </div>
        )}
      </div>
      {/**End Popular teachers */}
      {/*student testimonial */}
      <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>
      <div
        id="carouselExampleIndicators"
        className="carousel slide bg-dark text-white py-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
        {testimonialData&&testimonialData.map((row,index)=>
        <>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index ===0?"active":""}
            // aria-current="true"
            // aria-label="Slide 1"
          >
          </button></>)}
        </div>
        <div className="carousel-inner">
        {testimonialData&&testimonialData.map((row,i)=>
          <div className={i===0? "carousel-item text-center active":"carousel-item text-center"}>
            <figure class="text-center">
              <blockquote class="blockquote">
                <p>{row.reviews}</p>
              </blockquote>
              <figcaption class="blockquote-footer">
                {row.course.title}<cite title="Source Title"><span>|</span>{row.student.full_name}</cite>
              </figcaption>
            </figure>
          </div>
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/**End student testimonial */}
    </div>
  );
}

export default Home;
