const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        trim:true,
}
})

// taskSchema.pre('save',async function(next){
//     const task = this
//     if(task.isModified('password')){
//         task
//     }

//     next()
// })
const Task = mongoose.model('Task',taskSchema)
module.exports = Task