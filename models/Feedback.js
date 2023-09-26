const {Schema, model} = require('mongoose')

const Feedback = new Schema({
    product_id:{type: Schema.ObjectId, ref:'Product', required: true},
    user_id:{type: Schema.ObjectId, ref:'User', required:true},
    text:{type:String},
    rate:{type: Number, required: true}
})

module.exports = model('Feedback', Feedback)