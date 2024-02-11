const { NOT_FOUND_ERR } = require('../constants/errorType');
const { NOT_FOUND_ERROR_MSG } = require('../constants/errorMessage');

const ClientError = require('./ClientError');

class NotFoundError extends ClientError {
  name;

  constructor(message = NOT_FOUND_ERROR_MSG, options) {
    super(message, {
      type: options?.type ?? NOT_FOUND_ERR,
      statusCode: 404,
    });
    this.name = 'Not Found Error';
  }
}

module.exports = NotFoundError;
