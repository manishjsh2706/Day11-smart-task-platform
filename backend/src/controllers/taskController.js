const Task = require("../models/Task");
const User = require("../models/User");


// ======================================
// Create Task
// ======================================

const createTask = async (
 req,
 res
) => {

 try {

   const {
     title,
     description,
     priority,
     assignedUser
   } = req.body;

   const userExists =
     await User.findById(
       assignedUser
     );

   if (!userExists) {

     return res.status(404).json({
       success: false,
       message: "Assigned user not found"
     });

   }

   const task =
     await Task.create({

       title,

       description,

       priority,

       assignedUser,

       createdBy: req.user.id

     });

   res.status(201).json({

     success: true,

     message: "Task Created",

     data: task

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};



// ======================================
// Get Tasks
// ======================================

const getTasks = async (
 req,
 res
) => {

 try {

   let tasks;

   if (
     req.user.role === "admin"
   ) {

     tasks =
       await Task.find()

         .populate(
           "assignedUser",
           "name email role"
         )

         .populate(
           "createdBy",
           "name email role"
         );

   } else {

     tasks =
       await Task.find({
         assignedUser:
           req.user.id
       })

         .populate(
           "assignedUser",
           "name email role"
         )

         .populate(
           "createdBy",
           "name email role"
         );

   }

   res.status(200).json({

     success: true,

     count: tasks.length,

     data: tasks

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};



// ======================================
// Get Single Task
// ======================================

const getTaskById = async (
 req,
 res
) => {

 try {

   const task =
     await Task.findById(
       req.params.id
     )

       .populate(
         "assignedUser",
         "name email role"
       )

       .populate(
         "createdBy",
         "name email role"
       );

   if (!task) {

     return res.status(404).json({

       success: false,

       message: "Task not found"

     });

   }

   if (
     req.user.role !== "admin" &&
     task.assignedUser._id.toString() !==
     req.user.id
   ) {

     return res.status(403).json({

       success: false,

       message: "Access Denied"

     });

   }

   res.status(200).json({

     success: true,

     data: task

   });

 } catch (error) {

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};



// ======================================
// Update Task
// ======================================

const updateTask = async (
 req,
 res
) => {

 try {

   const task =
     await Task.findById(
       req.params.id
     );

   if (!task) {

     return res.status(404).json({

       success: false,

       message: "Task not found"

     });

   }

   if (
     req.user.role !== "admin" &&
     task.assignedUser.toString() !==
     req.user.id
   ) {

     return res.status(403).json({

       success: false,

       message: "Access Denied"

     });

   }

   const updatedTask =
     await Task.findByIdAndUpdate(

       req.params.id,

       req.body,

       {
         new: true,
         runValidators: true
       }

     );

   res.status(200).json({

     success: true,

     message: "Task Updated",

     data: updatedTask

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};



// ======================================
// Delete Task
// ======================================

const deleteTask = async (
 req,
 res
) => {

 try {

   const task =
     await Task.findById(
       req.params.id
     );

   if (!task) {

     return res.status(404).json({

       success: false,

       message: "Task not found"

     });

   }

   if (
     req.user.role !== "admin"
   ) {

     return res.status(403).json({

       success: false,

       message:
         "Only Admin can delete tasks"

     });

   }

   await task.deleteOne();

   res.status(200).json({

     success: true,

     message:
       "Task Deleted Successfully"

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};

module.exports = {

 createTask,

 getTasks,

 getTaskById,

 updateTask,

 deleteTask

};
