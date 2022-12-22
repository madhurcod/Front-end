const express = require("express");
const { create } = require("../models/taskModel");
const Task = require("../models/taskModel");
const router = express.Router();
const { 
  creteTask,
   getTasks,
    getTask,
    deleteTask, 
    updateTask,
  } = require("../config/controllers/taskController");


router.route("/").get(getTasks).post(creteTask)
router.route("/:id").get(getTask).delete(deleteTask).put(updateTask);



// // Creat a Task
// router.post("/", creteTask);
// //Get/Read Tasks
// router.get("/",getTasks);
// //Get/Read Task
// router.get("/:id",getTask);
// //Delete Tasks
// router.delete("/:id",deleteTask);
// //update Tasks
// router.put("/:id",updateTask);



 
module.exports = router;