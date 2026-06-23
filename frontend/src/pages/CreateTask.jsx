import {
useState
}
from "react";

import {
createTask
}
from "../services/taskService";

const CreateTask=()=>{

const [task,setTask]=
useState({

  title:"",
  description:"",
  priority:"Medium",
  assignedUser:""

});

const submit=
async(e)=>{

 e.preventDefault();

 await createTask(task);

 alert("Task Created");

};

return(

 <form
  onSubmit={submit}
 >

  <input

   placeholder="Title"

   onChange={(e)=>

    setTask({
     ...task,
     title:e.target.value
    })

   }

  />

  <textarea

   placeholder="Description"

   onChange={(e)=>

    setTask({
     ...task,
     description:e.target.value
    })

   }

  />

  <input

   placeholder="Assigned User Id"

   onChange={(e)=>

    setTask({
     ...task,
     assignedUser:e.target.value
    })

   }

  />

  <button>

    Save

  </button>

 </form>

);

};

export default CreateTask;
