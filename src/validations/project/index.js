const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exeptions/InvariantError');

const { create, update } = require('./schema');

const projectValidation = {
  validateCreateProjectPayload: (payload) => {
    const validationResult = create.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },

  validateUpdateProjectPayload: (payload) => {
    const validationResult = update.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = projectValidation;
