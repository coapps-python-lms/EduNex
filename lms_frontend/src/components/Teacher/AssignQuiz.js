import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import CheckQuizInCourse from "./CheckQuizInCourse";
import Swal from "sweetalert2";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function AssignQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const teacherId = localStorage.getItem("teacherId");
  const { course_id } = useParams();

  useEffect(() => {
    document.title = "Assign Quiz";
  }, []);

  // Fetch quiz data
  useEffect(() => {
    try{
    axios.get(baseUrl+'/teacher-quiz/'+teacherId)
    .then((res)=>{
      setQuizData(res.data)
    })
  }
  catch(error){
    console.log(error)
  }
  })

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/course/${course_id}`);
        setCourseData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseData();
  }, [course_id]);



  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Assign Quiz <span className="text-primary">({courseData.title})</span></h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.map((quiz) => (
                    <tr key={quiz.id}>
                      <td>
                        <Link to={`/all-questions/${quiz.id}`}>
                          {quiz.title}
                        </Link>
                      </td>
                      <td>
                        <CheckQuizInCourse quiz={quiz.id} course={course_id} />
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AssignQuiz;
