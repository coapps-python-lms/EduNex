import { Link } from "react-router-dom";
function Header() {
  const teacherLoginStatus= localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus= localStorage.getItem('studentLoginStatus')
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
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/all-courses">
              Courses
            </Link>
            <li className = "nav-item dropdown">
          <a className = "nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Teacher
          </a>
          <ul className = "dropdown-menu" aria-labelledby="navbarDropdown">
            {teacherLoginStatus!=='true' && <>
              <li><Link className="dropdown-item" to="/teacher-login">
               Login
            </Link></li>
            <li><Link className="dropdown-item" to="/teacher-register">
               Register

            </Link></li></>}
            
            <li><hr className = "dropdown-divider" /></li>
            <li><Link className = "dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
            <li><Link className = "dropdown-item" to="/teacher-logout">Logout</Link></li>
          </ul>
        </li>
            <li className = "nav-item dropdown">
          <a className = "nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </a>
          <ul className = "dropdown-menu" aria-labelledby="navbarDropdown">
          {studentLoginStatus!=='true' && <>
              <li><Link className="dropdown-item" to="/student-login">
               Login
            </Link></li>
            <li><Link className="dropdown-item" to="/student-register">
               Register

            </Link></li></>}
            <li><hr className = "dropdown-divider" /></li>
            
            <li><Link className = "dropdown-item" to="/student-dashboard">Dashboard</Link></li>
            <li><Link className = "dropdown-item" to="/student-logout ">Logout</Link></li> 
          </ul> 
        </li>
            <Link className="nav-link" to="/about">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
