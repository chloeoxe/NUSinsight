const asyncHandler = require('express-async-handler')
const Survey = require('../models/surveyModel')

// @desc Get surveys
// @route GET /api/surveys 
// @access Private
const getSurveys = asyncHandler(async (req, res) => {
    const surveys = await Survey.find()

    res.status(200).json(surveys)
})

// @desc  Set survey
// @route POST /api/surveys 
// @access Private
const setSurvey = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const survey = await Survey.create({
        text: req.body.text
    })

    res.status(200).json(survey)
})

// @desc Update survey
// @route PUT /api/surveys/:id
// @access Private
const updateSurvey = asyncHandler(async (req, res) => {
    const survey = await Survey.findById(req.params.id)
    
    if (!survey) {
        res.status(400)
        throw new Error('Survey not found')
    }
    const updatedSurvey = await Survey.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedSurvey)
})

// @desc Delete survey
// @route DELETE /api/surveys/:id
// @access Private
const deleteSurvey = asyncHandler(async (req, res) => {
    const survey = await Survey.findById(req.params.id)
    
    if (!survey) {
        res.status(400)
        throw new Error('Survey not found')
    }

    await survey.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getSurveys, 
    setSurvey, 
    updateSurvey, 
    deleteSurvey
}