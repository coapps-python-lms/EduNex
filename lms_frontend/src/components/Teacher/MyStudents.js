import { Link } from "react-router-dom";
import { useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
function MyStudents() {
  useEffect(() => {
    document.title = "My students";
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Students List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Enrolled Course</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td>
                    <Link to="/">Maha</Link>
                  </td>
                  <td>
                    <Link to="/">Php</Link>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm active">
                      Delete
                    </button>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default MyStudents;
