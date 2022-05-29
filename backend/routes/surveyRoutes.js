const express = require("express")
const router = express.Router()
const { 
    getSurveys, 
    setSurvey, 
    updateSurvey, 
    deleteSurvey
} = require('../controllers/surveyController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getSurveys).post(protect, setSurvey)
router.route('/:id').put(protect, updateSurvey).delete(protect, deleteSurvey)


module.exports = router