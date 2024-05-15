import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function Dashboard() {
  const[dashboardData,setDashboardData]=useState([])
  const studentId=localStorage.getItem('studentId');
  useEffect(()=>{
    try {
      axios.get(baseUrl+'/student/dashboard/'+studentId)
      .then((res)=>{
           console.log(res)
           setDashboardData(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">Enrolled Courses</h5>
                <div className="card-body">
                  <h2><Link to="/my-courses">{dashboardData.total_enrolled_courses}</Link></h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-success">
                <h5 className="card-header bg-success text-white">Favorites Courses</h5>
                <div className="card-body">
                  <h2><Link to="/favorite-course">{dashboardData.total_favorite_courses}</Link></h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-info">
                <h5 className="card-header bg-info text-white">Assignments</h5>
                <div className="card-body">
                  <h6>Completed : <Link to="/my-assignments">{dashboardData.completed_assignments}</Link></h6>
                  <h6>Pending : <Link to="/my-assignments">{dashboardData.pending_assignments}</Link></h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Dashboard;
