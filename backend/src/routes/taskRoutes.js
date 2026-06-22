const express = require("express");

const router =
 express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {

 createTask,

 getTasks,

 getTaskById,

 updateTask,

 deleteTask

} =
require("../controllers/taskController");



// Create Task

router.post(
 "/",
 authMiddleware,
 createTask
);


// Get All Tasks

router.get(
 "/",
 authMiddleware,
 getTasks
);


// Get Single Task

router.get(
 "/:id",
 authMiddleware,
 getTaskById
);


// Update Task

router.put(
 "/:id",
 authMiddleware,
 updateTask
);


// Delete Task

router.delete(
 "/:id",
 authMiddleware,
 deleteTask
);

module.exports = router;
