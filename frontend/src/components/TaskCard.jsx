const TaskCard = ({
task,
onDelete
}) => {

return(

 <div
  style={{
   border:"1px solid #ddd",
   padding:"15px",
   margin:"10px"
  }}
 >

  <h3>{task.title}</h3>

  <p>
   {task.description}
  </p>

  <p>
   Status:
   {task.status}
  </p>

  <p>
   Priority:
   {task.priority}
  </p>

  <button
   onClick={()=>
     onDelete(task._id)
   }
  >
   Delete
  </button>

 </div>

);

};

export default TaskCard;
