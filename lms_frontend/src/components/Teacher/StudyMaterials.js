import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";
function StudyMaterials() {
  const [studyData, setStudyData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { course_id } = useParams();
  console.log(course_id);
  // fetch course data
  useEffect(() => {
    try {
      axios.get(`${baseUrl}/study-materials/${course_id}`).then((res) => {
        setTotalResult(res.data.length);
        setStudyData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [course_id]);
  const handleDeleteClick = (study_id) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete this material",
      icon: "info",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/study-material/" + study_id).then((res) => {
            Swal.fire("success", "Chapter deleted successfully!!");
            try {
              axios
                .get(`${baseUrl}/study-materials/${study_id}`)
                .then((res) => {
                  setTotalResult(res.data.length);
                  setStudyData(res.data);
                });
            } catch (error) {
              console.log(error);
            }
           
          });
          //
        } catch (error) {
          Swal.fire("error", "Material not deleted");
        }
      } else {
        Swal.fire("error", "Material not deleted!!");
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header"> All Study Materials ({totalResult})<Link className="btn btn-success btn-sm float-end" to={'/add-study/'+course_id}>Add Study Material</Link></h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Upload</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studyData.map((row, index) => (
                    <tr>
                      <td>
                        <Link to={"/edit-study/" + row.id}>
                          {row.title}
                        </Link>
                      </td>
                      <td>
                      <td><button className="btn btn-outline-primary"><Link to={row.upload}>Download File</Link></button></td>

                      </td>
                      <td>{row.remarks}</td>
                      <td>
                        <Link
                          to={"/edit-study/" + row.id}
                          className="btn btn-info"
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </Link>

                        <button
                          className="btn btn-danger ms-4"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          <i className="bi bi-trash"></i>Delete
                        </button>
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
export default StudyMaterials;
