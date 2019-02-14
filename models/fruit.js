const mongoose = require('mongoose')

const fruitsSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    readyToEat: {
        type: Boolean
    }
});



module.exports = mongoose.model('Fruits', fruitsSchema);