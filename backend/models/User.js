const {Schema, model,mongoose} = require("mongoose");

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true,
       
    },
    lastName:{
        type:String,
    },
    password:{
        type:String
    },
    documents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
        },
    ],
    documents: {
        type: Array,
        default: [],
    },
})

const User = mongoose.model("User", UserSchema);

module.exports = User;