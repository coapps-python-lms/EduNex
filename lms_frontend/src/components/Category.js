import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Category() {
  const [categoryData, setCategoryData] = useState([]);
  // fetch course data
  useEffect(() => {
    try {
      axios.get(baseUrl + "/category/").then((res) => {
        setCategoryData(res.data);
      }); 
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
  <div className="container mt-3">
  {/**Latest courses */}
  <h3 className="pb-1 mb-4"> All Categories
      </h3>
      <div className="row mb-4">
      {categoryData&&categoryData.map((course,index)=>
         <div className="col-md-3 mb-4">
         <div className="card">
           <div className="card-body">
             <h5 className="card-title">
               <Link to={`/course/${course.id}/${course.title}`}>{course.title} ({course.total_courses})</Link>
             </h5>
             <p className="card-text">{course.description}</p>
           </div>
         </div>
       </div>)}
      </div>
      {/**End Latest courses */}
      {/* pagination start */}
      {/* <nav aria-label="Page navigation example mt-5">
  <ul class="pagination justify-content-center">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav> */}
      {/* pagination end */}
  </div>
  );
}
export default Category;
