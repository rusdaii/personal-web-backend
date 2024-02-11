const NotFoundError = require('../../exeptions/NotFoundError');
const { errorResponse } = require('../../lib/response');

exports.notFound = (req, res, next) => {
  next(new NotFoundError());
};

exports.error = (err, req, res, next) => {
  return errorResponse(res, err);
};
