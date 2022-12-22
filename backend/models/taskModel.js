const mongoose = require("mongoose");


//we are making Data base
const taskSchema = mongoose.Schema
    //Now we are Making Models
    (
        {
            name:{
                type: String,
                required:[true,"Please add a task"]
            },
            completed : {
                type: Boolean,
                required:true,
                default:false,
            },
        },
        {
            timestamps: true
        }
    );


const Task = mongoose.model("Task",taskSchema)

module.exports = Task;