import mongoose from "mongoose";
const subTodoSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
        required: true,
    }
},{ timestamps: true });
const subTodo = mongoose.model("SubTodo", subTodoSchema);