const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exeptions/InvariantError');
const { create } = require('./schema');

const socialValidation = {
  validateCreatePayload: (payload) => {
    const validationResult = create.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },

  validateUpdatePayload: (payload) => {
    const validationResult = create.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = socialValidation;
