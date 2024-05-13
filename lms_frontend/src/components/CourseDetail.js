import { useParams,Link } from "react-router-dom";
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
  let { course_id } = useParams();
   // fetch course data
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
  }, [course_id]); 
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
        </div>
      </div>
      {/*Course videos */}
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
      </div>
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
