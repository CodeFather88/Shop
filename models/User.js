const {Schema, model} = require('mongoose')

const User = new Schema({
    email: {type: String, unique: true, required: true},
    password:{type: String, required: true},
    bonuses:{type: Number, default: 0},
    username:{type: String, required: true},
    roles:[{type: String, ref: "Role"}],
    address:{type: String}
})

module.exports = model('User', User)