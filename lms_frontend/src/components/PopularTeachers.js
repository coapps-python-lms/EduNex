import { Link } from "react-router-dom";
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
function PopularTeachers() {
  const [populaTeacherData, setPopularTeacherData] = useState([]);
  useEffect(()=>{
    try {
      axios.get(baseUrl+'/popular-teachers/?popular=1')
      .then((res)=>{
        setPopularTeacherData(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  },[]);
  return (
  <div className="container mt-3">
  {/**Popular Teachers */}
  <h3 className="pb-1 mb-4">
        Popular Teachers
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
      {/**End Popular Teachers */}
      {/* pagination start */}
      <nav aria-label="Page navigation example mt-5">
  <ul class="pagination justify-content-center">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
      {/* pagination end */}
  </div>
  );
}
export default PopularTeachers;
