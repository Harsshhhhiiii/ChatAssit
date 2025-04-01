import mongoose from "mongoose";
 

const groupSchema = new mongoose.Schema({
   id:{
     type : String,
   },
   name:{
     type: String
   }
},{
    timestamps : true
});
const Message = mongoose.model('Message', groupSchema);
export default Message;