import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function EditStudyMaterial() {
  useEffect(() => {
    document.title = "Update Study Material";
  }, []);

  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
    prev_upload: "",
    upload: null,
    remarks: "",
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      setChapterData({
        ...chapterData,
        [name]: files[0], // Set file object
      });
      return; // Prevent further processing for file uploads
    }

    setChapterData({
      ...chapterData,
      [name]: value, // Update other fields
    });
  };

  const { study_id } = useParams();

  const submitForm = async () => {
    const _formData = new FormData();
    _formData.append("title", chapterData.title);
    _formData.append("description", chapterData.description);
    if (chapterData.upload) {
      _formData.append("upload", chapterData.upload, chapterData.upload.name);
    }
    _formData.append("remarks", chapterData.remarks);

    try {
      const response = await axios.put(baseUrl + "/study-material/" + study_id, _formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Study material updated successfully!!",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
      console.log(response.data);

    } catch (error) {
      console.error("Error", error.response?.data);
    }
  };

  useEffect(() => {
    try {
      axios.get(baseUrl + "/study-material/" + study_id).then((res) => {
        setChapterData({
          title: res.data.title,
          description: res.data.description,
          prev_upload: res.data.upload,
          remarks: res.data.remarks,
          upload: null,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [study_id]);

  console.log(chapterData);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Update Study Material</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label htmlFor="title" className="col-sm-2 col-form-label">
                  Title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    onChange={handleChange}
                    name="title"
                    value={chapterData.title}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="description" className="col-sm-2 col-form-label">
                  Description
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="description"
                    onChange={handleChange}
                    name="description"
                    value={chapterData.description}
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="upload" className="col-sm-2 col-form-label">
                  Upload
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    className="form-control"
                    name="upload"
                    onChange={handleChange}
                    id="upload"
                  />
                </div>
                {chapterData.prev_upload && (
                  <div className="col-sm-10 offset-sm-2 mt-2">
                    <p>Previous upload: <a href={chapterData.prev_upload} target="_blank" rel="noopener noreferrer">Download</a></p>
                  </div>
                )}
              </div>
              <div className="mb-3 row">
                <label htmlFor="remarks" className="col-sm-2 col-form-label">
                  Remarks
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="remarks"
                    onChange={handleChange}
                    name="remarks"
                    value={chapterData.remarks}
                    placeholder="This file is focused on basics of introduction"
                  ></textarea>
                </div>
              </div>

              <div>
                <hr />
                <button className="btn btn-primary" onClick={submitForm}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditStudyMaterial;
