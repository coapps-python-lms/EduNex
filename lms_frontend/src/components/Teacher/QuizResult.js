

import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api'
function QuizResult(props){
    const[resultData,setResultData]=useState([])
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/fetch-quiz-result/${props.quiz}/${props.student}`)
            .then((res)=>{
                setResultData(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    },[])

    return(
        
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="resultModalLabel">
                Quiz Result
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-bordered">
                <tr>
                  <th>Total Questions</th>
                  <td>{resultData.total_questions}</td>
                </tr>
                <tr>
                  <th>Attempted Questions</th>
                  <td>{resultData.total_attempted_questions}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        
    )
}
export default QuizResult;