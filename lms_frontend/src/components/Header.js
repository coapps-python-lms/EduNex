import { Link} from "react-router-dom";
import { useState } from "react";
function Header() {
  const teacherLoginStatus= localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus= localStorage.getItem('studentLoginStatus')

  const [searchString,setSearchString]=useState({
    'search':''
  })
  const handleChange = (event) => {
    const { name, value } = event.target; 

    setSearchString({
      ...searchString,
      [name]: value, 
    });
  };
  const searchCourse=()=>{
    if (searchString.search!==''){
      window.location.href='/search/'+searchString.search
    }
   
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          EduNex
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <form class="d-flex">
          <input class="form-control me-2" onChange={handleChange} name='search' type="search" placeholder="Search by course title" aria-label="Search"/>
          <button class="btn btn-primary" type="button"onClick={searchCourse} >Search</button>
        </form>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/all-courses">
              Courses
            </Link>
            <Link className="nav-link" to="/category">
              Categories
            </Link>
            <li className = "nav-item dropdown">
          <Link className = "nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Teacher
          </Link>
          <ul className = "dropdown-menu" aria-labelledby="navbarDropdown">
            {teacherLoginStatus!=='true' && <>
              <li><Link className="dropdown-item" to="/teacher-login">
               Login
            </Link></li>
            <li><Link className="dropdown-item" to="/teacher-register">
               Register

            </Link></li></>}
            
            <li><hr className = "dropdown-divider" /></li>
            {teacherLoginStatus==='true' && <>
            <li><Link className = "dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
            <li><Link className = "dropdown-item" to="/teacher-logout">Logout</Link></li></>}
          </ul>
        </li>
            <li className = "nav-item dropdown">
          <Link className = "nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </Link>
          <ul className = "dropdown-menu" aria-labelledby="navbarDropdown">
          {studentLoginStatus!=='true' && <>
              <li><Link className="dropdown-item" to="/student-login">
               Login
            </Link></li>
            <li><Link className="dropdown-item" to="/student-register">
               Register

            </Link></li></>}
            <li><hr className = "dropdown-divider" /></li>
            {studentLoginStatus==='true' && <>
            <li><Link className = "dropdown-item" to="/student-dashboard">Dashboard</Link></li>
            <li><Link className = "dropdown-item" to="/student-logout ">Logout</Link></li> </>}
          </ul> 
        </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
