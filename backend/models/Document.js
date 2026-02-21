const {Schema, model, mongoose}  = require("mongoose")

const Document = new Schema({
    _id:String,
    data:Object,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true
    }
})

module.exports = model("Document", Document);