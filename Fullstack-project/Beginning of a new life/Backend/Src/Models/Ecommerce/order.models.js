import mongoose from "mongoose";
const OrderIdSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
    }
})
const OrderSchema = new mongoose.Schema({
    orderPrice:{
        type:Number,
        required:true,
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    orderItems:{
        type:[OrderIdSchema],
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Canceled","Shipped","Delivered"],
        default:"Pending",
    }
},{timestamps:true})
export const Order = mongoose.model("Order",OrderSchema)