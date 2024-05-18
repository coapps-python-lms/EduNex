import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/contact/";

function ContactUs() {
  useEffect(() => {
    document.title = "Contact Us";
  });

  const [contactData, setContactData] = useState({
    full_name: "",
    email: "",
    query_txt: "",
    status:""
  });

  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async () => {
    const contactFormData = new FormData();
    contactFormData.append("full_name", contactData.full_name);
    contactFormData.append("email", contactData.email);
    contactFormData.append("query_txt", contactData.query_txt);

    try {
      const response = await axios.post(baseUrl, contactFormData);
      setContactData({
        full_name: "",
        email: "",
        query_txt: "",
        status:"success"
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setContactData({ ...contactData, status: "error" });
    }
  };

  const listStyle={
    'list-sytle':'none',

  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-8 offset-2">
          {contactData.status === "success" && (
            <p className="text-success">Thank you for contacting us</p>
          )}
          {contactData.status === "error" && (
            <p className="text-danger">Something went wrong</p>
          )}
          <div className="card">
            <h5 className="card-header">Contact Us</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputFullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    value={contactData.full_name}
                    onChange={handleChange}
                    type="text"
                    name="full_name"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    value={contactData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                  />
                </div>
            
                <div className="mb-3">
                  <label htmlFor="exampleInputText" className="form-label">
                    Query
                  </label>
                  <textarea
                    value={contactData.query_txt}
                    onChange={handleChange}
                    className="form-control"
                    name="query_txt"
                    rows="10"
                  ></textarea>
                </div>
                
                <button
                  onClick={submitForm}
                  type="button"
                  className="btn btn-primary"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
         
        </div>
       
      </div>
    </div>
  );
}

export default ContactUs;
