const { SERVER_ERR } = require('../constants/errorType');
const ClientError = require('../exeptions/ClientError');

const successResponse = ({ message, data }) => {
  if (data) {
    return {
      success: true,
      message,
      data,
    };
  }

  return {
    success: true,
    message,
  };
};

const clientErrorResponse = (error) => ({
  success: false,
  message: error.message,
  type: error.type,
});

const serverErrorResponse = (error) => ({
  success: false,
  message: error.message,
  type: SERVER_ERR,
  error: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
});

const errorResponse = (res, error) => {
  if (error instanceof ClientError) {
    return res.status(error.statusCode).json(clientErrorResponse(error));
  }

  return res.status(500).json(serverErrorResponse(error));
};

module.exports = {
  successResponse,
  clientErrorResponse,
  errorResponse,
  serverErrorResponse,
};
