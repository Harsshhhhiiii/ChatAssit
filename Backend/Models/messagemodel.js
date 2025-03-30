import mongoose from "mongoose";
 
const message = new  mongoose.Schema({
  username : {
      type :String,
      required : true

  },
  message : {
      type : String,
      required : true
  }
})
const messageSchema = new mongoose.Schema({
   username : {
        type :String,
        required : true
   },
   messages : [message]
},{
    timestamps : true
});
const Message = mongoose.model('Message', messageSchema);
export default Message;