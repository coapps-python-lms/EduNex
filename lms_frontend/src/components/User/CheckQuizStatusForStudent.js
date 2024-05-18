import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api'
function CheckQuizStatusForStudent(props){
    const[quizData,setQuizData]=useState([])
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/fetch-student-quiz-attempt-status/${props.quiz}/${props.student}`)
            .then((res)=>{
                setQuizData(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    },[])
    //assign quiz to course        
  return(
        <td>
        {quizData.bool===false &&
        <Link to={`/take-quiz/${props.quiz}`} className='btn btn-success btn-sm ms-2'>Take Quiz</Link>
        }
        {
            quizData.bool===true&&
            <span className='text-success'>Attempted</span>
        }
      </td>
    )
}
export default CheckQuizStatusForStudent;