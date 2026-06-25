import { useState } from "react";
import { loginUser }
from "../services/authService";

const Login = () => {

const [form,setForm] =
useState({

  email:"",
  password:""

});

const handleChange=(e)=>{

  setForm({
   ...form,
   [e.target.name]:
   e.target.value
  });

};

const handleSubmit=
async(e)=>{

  e.preventDefault();

  try{

   const response=
     await loginUser(form);

   localStorage.setItem(
     "token",
     response.data.token
   );

   localStorage.setItem(
     "role",
     response.data.user.role
   );

   window.location="/dashboard";

  }
  catch(error){

    alert("Login Failed");

  }

};

return(

 <div>

  <h2>Login</h2>

  <form
   onSubmit={handleSubmit}
  >

   <input

     name="email"

     placeholder="Email"

     onChange={handleChange}

   />

   <input

     type="password"

     name="password"

     placeholder="Password"

     onChange={handleChange}

   />

   <button>
     Login1
   </button>

  </form>

 </div>

);

};

export default Login;
