import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import Login
from "./pages/Login";

import Register
from "./pages/Register";

import Dashboard
from "./pages/Dashboard";

import CreateTask
from "./pages/CreateTask";

import Navbar
from "./components/Navbar";

import ProtectedRoute
from "./components/ProtectedRoute";

function App() {

return (

 <BrowserRouter>

  <Navbar />

  <Routes>

   <Route
     path="/"
     element={<Login />}
   />

   <Route
     path="/register"
     element={<Register />}
   />

   <Route

     path="/dashboard"

     element={
       <ProtectedRoute>
         <Dashboard />
       </ProtectedRoute>
     }

   />

   <Route

     path="/create-task"

     element={
      <ProtectedRoute>
       <CreateTask />
      </ProtectedRoute>
     }

   />

  </Routes>

 </BrowserRouter>

);

}

export default App;
