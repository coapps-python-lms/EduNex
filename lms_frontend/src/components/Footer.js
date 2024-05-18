import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Footer() {
  const [pagesData, setPagesData] = useState([]);
  // fetch course data
  useEffect(() => {
    try {
      axios.get(baseUrl + "/pages/").then((res) => {
        setPagesData(res.data);
      }); 
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <footer className ="py-3 my-5">
    <ul className ="nav justify-content-center border-bottom pb-3 mb-3">
      <li className ="nav-item"><Link to="/" className ="nav-link px-2 text-body-secondary">Home</Link></li>
      <li className ="nav-item"><Link to="/faq" className ="nav-link px-2 text-body-secondary">FAQs</Link></li>
      {pagesData&&pagesData.map((row,index)=>
      <>
      <li className ="nav-item"><Link to={`/page/${row.id}${row.url}`} className ="nav-link px-2 text-body-secondary">{row.title}</Link></li>

  </>
  )}

  </ul>
    <p className ="text-center text-body-secondary">© 2024 EduNex</p>
  </footer>
  );
}

export default Footer;
