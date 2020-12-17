// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Show all bootcamps'
    });
}

// @desc Get bootcamp by Id
// @route GET /api/v1/bootcamps/:id
// @access PUBLIC
exports.getBootcampById = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Show bootcamp with id: ${req.params.id}`
    });
}

// @desc Create bootcamp 
// @route POST /api/v1/bootcamps
// @access PRIVATE
exports.createBootcamp = (req, res, next) => {
    res.status(201).json({
        success: true,
        msg: `Create bootcamp`
    });
}

// @desc Update bootcamp by Id
// @route PUT /api/v1/bootcamps/:id
// @access PUBLIC
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Update bootcamp with id: ${req.params.id}`
    });
}

// @desc Update bootcamp by Id
// @route DELETE /api/v1/bootcamps/:id
// @access PUBLIC
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Delete bootcamp with id: ${req.params.id}`
    });
}