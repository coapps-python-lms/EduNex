import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const baseUrl = "http://127.0.0.1:8000/api";
// const siteUrl = "http://127.0.0.1:8000/";
function TeacherDetails(){
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const { teacher_id} = useParams();
  useEffect(() => {
    try {
      axios.get(`${baseUrl}/teacher/${teacher_id}`).then((res) => {
        setTeacherData(res.data);
        setCourseData(res.data.teacher_courses);
        setSkillData(res.data.skill_list);
      });
    } catch (error) {
      console.log(error);
    }
  }, [teacher_id,skillData]);
    return(
        <div className="container mt-3">
        <div className="row">
          <div className="col-4">
            <img
              src="/logo512.png"
              className="img-thumbnail"
              alt="Teacher_Image"
            />
          </div>
          <div className="col-8">
            <h3>{teacherData.full_name}</h3>
            <p>
             {teacherData.detail}
            </p>
            <p className="fw-bold">
              Skills:  
              {skillData&&skillData.map((skill, index) => (
            <>
            <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill text-dark bg-warning ms-2">{skill.trim()}</Link>&nbsp;
            </>
          ))}
            </p>
            <p className="fw-bold">Recent Course:  <Link to="/teacher-details/1">Javascript Course</Link> </p>
            <p className="fw-bold">Rating: 4/5 </p>
          </div>
        </div>
        {/*Course videos */}
        <div className="card mt-4">
          <h5 className="card-header">Course List</h5>
          <div className="list-group list-group-flush">
            {courseData.map((course,index)=>
              <Link to={`/detail/${course.id}`} className="list-group-item list-group-item-action">{course.title}</Link> 
            )}
           </div>
        </div>
      </div>
    )
 
}
export default TeacherDetails