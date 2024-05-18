import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Page() {
  const [pagesData, setPagesData] = useState([]);
  const {page_id}=useParams()
  const {page_slug}=useParams()
  // fetch course data
  useEffect(() => {
    try {
      axios.get(baseUrl + "/pages/"+page_id+'/'+page_slug).then((res) => {
        setPagesData(res.data);
      }); 
    } catch (error) {
      console.log(error);
    }
  }, [page_id]);
  return( 
    <div className="container mt-4">
    
  <h2>{pagesData.title}</h2>
<p>{pagesData.content}</p>
</div>
)
}
export default Page;
