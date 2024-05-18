import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/course/";
function AllCourses() {
  const [courseData, setCourseData] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();
  // fetch course data
  useEffect(() => {
    try {
      axios.get(baseUrl).then((res) => {
       
          setNextUrl(res.data.next)
          setPreviousUrl(res.data.previous)
          setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(courseData)
  useEffect(() => {
    document.title = "Latest course";
  });
// pagination
const paginationHandler=(url)=>{
  try {
    axios.get(url).then((res) => {
      setNextUrl(res.data.next)
          setPreviousUrl(res.data.previous)
          setCourseData(res.data.results);
    });
  } catch (error) {
    console.log(error);
  }
}

  return (
  <div className="container mt-3">
  {/**Latest courses */}
  <h3 className="pb-1 mb-4">
        Latest courses
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
          `</div>
       </div>)}
       
        
       
      </div>
      {/**End Latest courses */}
      {/* pagination start */}
      <nav aria-label="Page navigation example mt-5">
  <ul class="pagination justify-content-center">
    {previousUrl && 
         <li class="page-item"><button className="page-link" onClick={()=>paginationHandler(previousUrl)}><i className="bi bi-arrow-left"></i>Previous</button></li>
    }
    {nextUrl&& 
        <li class="page-item"><button className="page-link" onClick={()=>paginationHandler(nextUrl)}>Next<i className="bi bi-arrow-right"></i></button></li>
    }
  </ul>
</nav>
      {/* pagination end */}
  </div>
  );
}
export default AllCourses;
