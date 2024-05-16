import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function StudentAssignments(){
    const [assignmentData, setAssignmentData] = useState([]);
    const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/my-assignments/"+studentId)
        .then((res) => {
          setAssignmentData(res.data.assignments);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(assignmentData);
  useEffect(() => {
    document.title = "My Assignments";
  });
  const markAsDone=(assignment_id,title,detail,student,teacher)=>{
    
    console.log(studentId);
    // fetch course data
    const _formData = new FormData();
    _formData.append('student_status',true); 
    _formData.append('title',title)
    _formData.append('detail',detail)
    _formData.append('student',student)
    _formData.append('teacher',teacher)
    try {
      axios.put(baseUrl + "/update-assignments/"+assignment_id, _formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res)=>{
        if(res.status===200||res.status===201){
          window.location.reload()
        }
      
      })
    } catch (error) {
      console.error("Error", error.response?.data);
    
    }
  }
    return(
        <div className="container mt-4">
      <div className="row">
       <aside className="col-md-3">
        <Sidebar />
       </aside>
       <section className="col-md-9">
       <div className="card">
            <h5 className="card-header"> My Assignments</h5>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Detail</th>
                            <th>Assigned By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
  {Array.isArray(assignmentData) && assignmentData.map((row, index) => (
    <tr key={index}>
      <td>{row.title}</td>
      <td>{row.detail}</td>
      <td><Link to={`/teacher-details/${row.teacher.id}`}>{row.teacher.full_name}</Link></td>
      <td>
        {row.student_status === false &&
          <button onClick={() => markAsDone(row.id, row.title, row.detail, row.student.id, row.teacher.id)} className="btn btn-success btn-sm">Mark as Done</button>
        }
        {row.student_status === true &&
          <span className="badge bg-primary">Completed</span>
        }
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
        
    )
}
export default StudentAssignments;