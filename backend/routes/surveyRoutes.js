const express = require("express")
const router = express.Router()
const { 
    getSurveys, 
    setSurvey, 
    updateSurvey, 
    deleteSurvey
} = require('../controllers/surveyController')

router.route('/').get(getSurveys).post(setSurvey)
router.route('/:id').put(updateSurvey).delete(deleteSurvey)


module.exports = router