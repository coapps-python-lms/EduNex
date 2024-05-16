import TeacherSidebar from "./TeacherSidebar";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api'
function CheckQuizInCourse(props){
    const[quizData,setQuizData]=useState([])
    const teacherId=localStorage.getItem('teacherId')
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
            .then((res)=>{
                setQuizData(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    },[])
    //assign quiz to course
    const assignQuiz=(quiz_id)=>{
        const _formData=new FormData()
        _formData.append('teacher',teacherId)
        _formData.append('course',props.course)
        _formData.append('quiz',props.quiz)
        try {
            axios.post(baseUrl+'/quiz-assign-course/',_formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200||res.status===201){
                    window.location.reload()
                }
            })
        } catch (error) {
          console.log(error)
        }
    }
    return(
      <td>
        {quizData.bool===false &&
        <button onClick={()=>assignQuiz(props.quiz)} className='btn btn-success btn-sm ms-2'>Assign Quiz</button>
        }
        {
            quizData.bool===true&&
            <span className='text-success'>Assigned</span>
        }
      </td>
    )
}
export default CheckQuizInCourse;