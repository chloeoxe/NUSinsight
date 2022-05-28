const mongoose = require('mongoose')

const surveySchema = mongoose.Schema({
    text: {
        type: String, 
        required: [true, 'Please add a text value']
    }
}, 
{
    timestamps: true,
}
)

module.exports = mongoose.model('Survey', surveySchema)