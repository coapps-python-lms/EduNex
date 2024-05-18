import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function FAQ() {
  const [faqData, setfaqData] = useState([]);
  // fetch course data
  useEffect(() => {
    try {
      axios.get(baseUrl + "/faq/").then((res) => {
        setfaqData(res.data);
      }); 
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
  <div className="container mt-3">
  {/**Latest courses */}
  <h3 className="pb-1 mb-4"> FAQs
      </h3>
      <div className="accordion" id="accordionExample">
        {faqData&&faqData.map((row,index)=>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        {row.question}
      </button>
    </h2>
    {index===0&&
        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
        <div className="accordion-body">
            {row.answer}
        </div>
        </div>
    }
    {index>0&&
        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div className="accordion-body">
            {row.answer}
        </div>
        </div>
    }
  </div>
  )}
</div>
      {/**End Latest courses */}
  </div>
  );
}
export default FAQ;
