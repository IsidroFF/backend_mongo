const { Router } = require('express');
const router = Router(); 
const { getQ1, getQ2, getQ3, getQ4, getQ5, getQ6, getQ7, getQ8, getQ9 } = require('../controllers/grupo.controller.js')

// Get grupo.routes By ID
router.get('/Q1', getQ1)
router.get('/Q2', getQ2)
router.get('/Q3', getQ3)
router.get('/Q4', getQ4)
router.get('/Q5', getQ5)
router.get('/Q6', getQ6)
router.get('/Q7', getQ7)
router.get('/Q8', getQ8)
router.get('/Q9', getQ9)

module.exports = router