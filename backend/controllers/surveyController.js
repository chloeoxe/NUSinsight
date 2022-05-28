const asyncHandler = require('express-async-handler')

// @desc Get surveys
// @route GET /api/surveys 
// @access Private
const getSurveys = asyncHandler(async (req, res) => {
    res.status(200).json({message: "get surveys"})
})

// @desc  Set survey
// @route POST /api/surveys 
// @access Private
const setSurvey = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({message: "set survey"})
})

// @desc Update survey
// @route PUT /api/surveys/:id
// @access Private
const updateSurvey = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update survey ${req.params.id}`})
})

// @desc Delete survey
// @route DELETE /api/surveys/:id
// @access Private
const deleteSurvey = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete survey ${req.params.id}`})
})

module.exports = {
    getSurveys, 
    setSurvey, 
    updateSurvey, 
    deleteSurvey
}