import {
Link
}
from "react-router-dom";

const Navbar=()=>{

const logout=()=>{

 localStorage.clear();

 window.location="/";

};

return(

 <nav>

  <Link to="/dashboard">
   Dashboard
  </Link>

  {" | "}

  <Link to="/create-task">
   Create Task
  </Link>

  {" | "}

  <button
   onClick={logout}
  >
   Logout
  </button>

 </nav>

);

};

export default Navbar;
