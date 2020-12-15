const { validationResult } = require('express-validator');


/**
 * Express Middleware to check if an request didn't pass the
 * express-validator check.
 * 
 * If so, the req will containt an error, this middleware will retrieve it, 
 * response with status 400: 
 * 
 * { --> The Response object
 *  ok: false,
 *  errors
 * }
 * 
 * if not, will pass contro, to the next middleware.
 */
const CheckForErrors = (req, res, next) => {
  const errors = validationResult(req);

  // Error handling with express-validator
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    })
  }

  next(); // No errors detected
}

module.exports = CheckForErrors;