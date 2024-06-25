const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
        
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: String,
        default: Date.now      //dont call it here using ()
    },


    
  });

  module.exports=mongoose.model('notes', NotesSchema);