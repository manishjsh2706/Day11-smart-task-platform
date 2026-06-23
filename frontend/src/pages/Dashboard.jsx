import {
useEffect,
useState
}
from "react";

import {
getTasks,
deleteTask
}
from "../services/taskService";

import TaskCard
from "../components/TaskCard";

const Dashboard=()=>{

const [tasks,setTasks]=
useState([]);

const loadTasks=
async()=>{

  const response=
   await getTasks();

  setTasks(
    response.data.data
  );

};

useEffect(()=>{

  loadTasks();

},[]);

const removeTask=
async(id)=>{

  await deleteTask(id);

  loadTasks();

};

return(

 <div>

  <h2>
   Dashboard
  </h2>

  {
   tasks.map(task=>(
     <TaskCard

      key={task._id}

      task={task}

      onDelete={removeTask}

     />
   ))
  }

 </div>

);

};

export default Dashboard;
