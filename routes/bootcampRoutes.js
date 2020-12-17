const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        msg: 'Show all bootcamps'
    })
})

router.post('/', (req, res) => {
    return res.status(201).json({
        success: true,
        msg: 'Create bootcamp'
    })
})

router.get('/:id', (req, res) => {
    return res.status(200).json({
        success: true,
        msg: `Show bootcamp ${req.params.id}`
    })
})

router.put('/:id', (req, res) => {
    return res.status(200).json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`
    })
})


router.delete('/:id', (req, res) => {
    return res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`
    })
})

module.exports = router;
