import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function TakeQuiz(){
    const [questionData, setQuestionData] = useState([]);
    const { quiz_id } = useParams();
    const studentId = localStorage.getItem("studentId");
    // fetch course data

  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/quiz-questions/"+quiz_id+'/1')
        .then((res) => {
          setQuestionData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [quiz_id]);

  useEffect(() => {
    document.title = "Take Quiz";
  });
  const submitAnswer= (question_id,ans) => {
    const _formData = new FormData();
    _formData.append("student", studentId); 
    _formData.append("question", question_id);
    _formData.append("quiz", quiz_id);
    _formData.append("right_ans", questionData.right_ans);

    try {
     axios.post(baseUrl + "/attempt-quiz/", _formData)
      .then((res)=>{
        if (res.status === 200 ||res.status===201) {
          try {
            axios
              .get(baseUrl + "/quiz-questions/"+quiz_id+'/next-question/'+question_id)
              .then((res) => {
                setQuestionData(res.data);
              });
          } catch (error) {
            console.log(error);
          }
          }
      })

    } catch (error) {
      console.error("Error creating chapter:", error.res?.data);
      // Handle errors: display error messages based on response
    }
  };

    return(
        <div className="container mt-4">
      <div className="row">
       <aside className="col-md-3">
        <Sidebar />
       </aside>
       <section className="col-md-9">
       <h4 className="mb-3 border-bottom pb-1">Quiz Title</h4>
       {questionData.map((row,index)=>
       <div className="card">
       
        
            <h5 className="card-header">{row.questions}</h5>
            <div className="card-body">
                <table className="table table-bordered">
                    <tbody>
                      
                    <>
                          <tr>
                              <td><button onClick={()=>submitAnswer(row.id,row.ans1)} className="btn btn-outline-secondary">{row.ans1}</button></td>
                          </tr>
                          <tr>
                          <td><button  onClick={()=>submitAnswer(row.id,row.ans2)} className="btn btn-outline-secondary">{row.ans2}</button></td>

                          </tr>
                          <tr>
                          <td><button onClick={()=>submitAnswer(row.id,row.ans3)} className="btn btn-outline-secondary">{row.ans3}</button></td>

                          </tr>
                          <tr>
                          <td><button onClick={()=>submitAnswer(row.id,row.ans4)} className="btn btn-outline-secondary">{row.ans4}</button></td>

                          </tr>
                      </>
                    </tbody>
                </table>
            </div>

        </div>
       )}
       </section>
      </div>
    </div>
        
    )
}
export default TakeQuiz;