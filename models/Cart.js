const {Schema, model} = require('mongoose')

Cart = new Schema({
    user_id:{type: Schema.ObjectId, ref: 'User', required: true},
    product_id:{type: Schema.ObjectId, ref: 'Product', required: true},
    count: {type: Number, required: true, default: 1}
})

module.exports = model('Cart', Cart)