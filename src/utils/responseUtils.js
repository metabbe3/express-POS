const successResponse = (res, data, message = "Operation successful", status = 200) => {
    res.status(status).json({
        status: 'success',
        message: message,
        data: data
    });
};

const errorResponse = (res, message = "Operation failed", status = 400) => {
    res.status(status).json({
        status: 'error',
        message: message
    });
};

const parseJSON = (input) => {
    try {
        return JSON.parse(input);
    } catch (err) {
        return null;
    }
};

module.exports = {
    successResponse,
    errorResponse,
    parseJSON
};
