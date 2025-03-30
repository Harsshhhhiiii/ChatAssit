import mongoose from "mongoose";
 
const conversationSchema = new mongoose.Schema({
   
},{
    timestamps : true
});
const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;