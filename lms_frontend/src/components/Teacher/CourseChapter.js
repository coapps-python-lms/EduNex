import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";
function AllChapters() {
  const [chapterData, setChapterData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { course_id } = useParams();
  console.log(course_id);
  // fetch course data
  useEffect(() => {
    try {
      axios.get(`${baseUrl}/course-chapters/${course_id}`).then((res) => {
        setTotalResult(res.data.length);
        setChapterData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [course_id]);
  const handleDeleteClick = (chapter_id) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete this chapter",
      icon: "info",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/chapter/" + chapter_id).then((res) => {
            Swal.fire("success", "Chapter deleted successfully!!");
            try {
              axios
                .get(`${baseUrl}/course-chapters/${course_id}`)
                .then((res) => {
                  setTotalResult(res.data.length);
                  setChapterData(res.data);
                });
            } catch (error) {
              console.log(error);
            }
          });
          //
        } catch (error) {
          Swal.fire("error", "Chapter not deleted");
        }
      } else {
        Swal.fire("error", "Chapter not deleted!!");
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
            <h5 className="card-header"> All Chapters ({totalResult})<Link className="btn btn-success btn-sm float-end" to={'/add-chapter/'+course_id}>Add Chapter</Link></h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Video</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {chapterData.map((chapter, index) => (
                    <tr>
                      <td>
                        <Link to={"/edit-chapter/" + chapter.id}>
                          {chapter.title}
                        </Link>
                      </td>
                      <td>
                        <video controls width="250">
                          <source src={chapter.video.url} type="video/webm" />
                          <source src={chapter.video.url} type="video/mp4" />
                          Sorry your browser doesn't support embedded videos.
                        </video>
                      </td>
                      <td>{chapter.remarks}</td>
                      <td>
                        <Link
                          to={"/edit-chapter/" + chapter.id}
                          className="btn btn-info"
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </Link>

                        <button
                          className="btn btn-danger ms-4"
                          onClick={() => handleDeleteClick(chapter.id)}
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
export default AllChapters;
