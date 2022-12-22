const Task = require("../../models/taskModel");
// const { param } = require("../routes/taskroutes");

// Crate Tasks
const creteTask =  async (req , res) => {
   try { 
        const task = await Task.create(req.body)
        res.status(200).json(task)
      } catch (error) {
        res.status(500).json({msg: error.message})
      }

};

// get all  taks
const getTasks =  async (req , res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({msg : error.message});
      } 
 };
//Get a Single Task
const getTask = async (req, res) => {
  
  try {
    const {id} = req.params
    const task = await Task.findById(id);
    console.log(task);
    if(!task){
        return res.status(404).json(`no task with id: ${id}`);
    }
    res.status(200).json(task);
    // throw new Error('No task found by this id')
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg : error.message });
  }
};

// Delete task

const  deleteTask = async (req, res) => {
// console.log('delete')
try {
  const {id} = req.params
  const task = await Task.findByIdAndDelete(id)
  if(!task){
    return res.status(404).json(`no task with id: ${id}`);
}
res.status(200).send("Task Deleted")
} catch (error) {
  res.status(500).json({ msg : error.message });
}
         
           
};

// Update a task
const  updateTask = async (req, res) => {
       try {
        const { id } = req.params
        const task = await Task.findByIdAndUpdate(
          {_id: id},
          req.body,
          {
            new:true,
            runValidators:true,
          }
        );
        if(!task){
          return res.status(404).json(`no task with id: ${id}`);
        }
        res.status(200).json(task)
       } catch (error) {
        res.status(500).json({ msg : error.message });
       }
}

module.exports = {
    creteTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask,
}