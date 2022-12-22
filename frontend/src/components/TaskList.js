// import Task from "../../../back-end/models/taskModel"
// import Task from "../../../back-end/models/taskModel"
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loadingIMG from "../assets/loader.gif";
// import { getTask } from "../../../back-end/config/controllers/taskController";


//http://localhost:5000/api/tasks

const Tasklist = () => {
    const [ tasks ,setTasks] = useState([])
    const [ completedTasks ,setcompletedTasks] = 
    useState([])
   const [ isLoading ,setIsLoading] = useState(false)
   const [isEditing, setIsEditing] = useState(false)
   const [taskID, setTaskID] = useState("")



  const [formData, setFormData] = useState  ({
    name: "",
    completed: false,
  });
  const { name } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data)
      setIsLoading(false)
    } catch (error) {
        toast.error(error.message)
        setIsLoading(false)
    }
};

useEffect(() => {
    getTasks()
}, [])





  const creatTask = async (e) => {
    e.preventDefault();
    if (name === "") {
        return toast.error("Input Field Cannot be Empty")
    }
    try {
       await axios.post(`${URL}/api/tasks`, formData)
       toast.success("Task added successfully");
       getTasks();
       setFormData({...formData,name:""}) 
    } catch (error) {
        toast.error(error.message)
        console.log(error);
    }
  };

const deleteTask = async (id) => {
  try {
    await axios.delete(`${URL}/api/tasks/${id}`)
    getTasks();
  } catch (error) {
    toast.error(error.message)
  }
}
//
useEffect(() => {
    const cTask = tasks.filter((task) => {
        return task.completed === true
    })
    setcompletedTasks(cTask)
},[])

//


const getSingleTask = async (task) => {
    setFormData({name: task.name,completed:false}) 
    setTaskID(task._id)
    setIsEditing(true);
          
};

const updateTask = async (e) => {
    e.preventDefault()
    if(name === ""){
        return toast.error("Input Filed cannot be empty .")
    }
    try {
        await axios.put(`${URL}/api/tasks/${taskID}`,formData)
        setFormData({ ...formData, name: ""})
        setIsEditing(false)
        getTasks()
    } catch (error) {
        toast.error(error.message);
    }
};

const setToComplete = async (task) => {
      const newFormData = {
        name:task.name,
        completed:true, 
      }
      try {
        await axios.put(`${URL}/api/tasks/${task._id}`,newFormData)
        getTasks()
      } catch (error) {
        toast.error(error.message)
      }
};



  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={creatTask}
        isEditing={isEditing}
        updateTask = {updateTask}
      />
      {tasks.length > 0 && (
         <div className="--flex-between --pb">
         <p>
           <b>Total Tasks :</b>{tasks.length}
         </p>
         <p>
           <b>completed Tasks :</b>{completedTasks.length}
         </p>
       </div>
      ) }
      
      <hr />
      {
        isLoading &&(
            <div className="--flex-center">
                   <img src={loadingIMG} alt="LOADING" />
            </div>
        )
        }
        {
            !isLoading && tasks.length === 0 ? (
                <p>NO task added . Plaese add a Tasks</p>
            ) : (
                <>
                {tasks.map((tasks,index)=>{
                       return<Task key={tasks.id} task=
                       {tasks} index={index} deleteTask={deleteTask}
                       getSingleTask={getSingleTask}
                       setToComplete={setToComplete}
                       />
                    
                })}
                </>
            ) 
        }

      
    </div>
  );
};

export default Tasklist;
