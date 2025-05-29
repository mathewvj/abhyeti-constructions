const mongoose = require('mongoose')

const projectScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    description: String,
    category:{
        type: String,
        enum:['road', 'building' ,'bridge' ],
        required: true
    },
    images:[String],

},{ timestamps: true })

module.exports = mongoose.model('Project', projectScheme)