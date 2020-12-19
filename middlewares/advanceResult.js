const advancedResults = (model, populate) => async (req, res, next) => {
    const reqQuery = { ...req.params }

    // Fields to exclude during filtering
    const removeFields = ['select', 'sort', 'page', 'limit', 'skip'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //Create operators like gte, gt, lt, in etc
    //Doing this to manipulate the query and add $ to gte, gt as its needed
    let query;
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    console.log(queryStr);

    query = model.find(JSON.parse(queryStr));

    //Select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //Sort - by default createdAt in desc
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt')
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    //Courses are populated here virtually.. there are no course in the model. In the bootcamp , we have revertse populated it using virtuals
    query = query.skip(startIndex).limit(limit);

    if (populate) {
        query.populate(populate);
    }

    const results = await query;

    //Pagination result
    pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }
    next();
}

module.exports = advancedResults;