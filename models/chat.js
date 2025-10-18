const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type : String,
        required : true
    },
    to : {
        type : String 

    },      
    message: {
        type : String,
        maxLength : 50
    },
    created_at :{
        type : Date,
        required : true
    },
  
});
  const Chat = mongoose.model("chats", chatSchema);
    module.exports = Chat;