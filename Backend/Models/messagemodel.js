import mongoose from "mongoose";
 

const messageSchema = new mongoose.Schema({
   username : {
        type :String,
        required : true
   },
   messages : {
      type: String,
      required:true ,
   }
},{
    timestamps : true
});
const Message = mongoose.model('Message', messageSchema);
export default Message;