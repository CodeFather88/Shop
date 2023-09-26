const {Schema, model} = require('mongoose')

const Product = new Schema({
    category_id:{type: Schema.Types.ObjectId, ref: 'Category', required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description:{type: String, required: true},
    rate:{type: Number, default: 0, required: true},
    size:{type: Number, required: true},
    img:{type: Array}
})

module.exports = model('Product', Product)