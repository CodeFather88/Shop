const {Schema, model} = require('mongoose')

const ElementByOrder = new Schema({
    order_id: {type: Schema.ObjectId, ref: 'Order', required: true, unique: true},
    product_id: {type: Schema.ObjectId, ref: 'Product', required: true, unique: true},
    count: {type: Number, required: true, default: 1}
})

module.exports = model('ElementByOrder', ElementByOrder)