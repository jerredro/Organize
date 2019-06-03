const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "What's your name";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "What's your email";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "That email does not appear to be valid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Enter a password";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Enter a confirmation password";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "The min is six characters but maybe you wanna use twenty characters, i dunno... it's your prerogative";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords need to match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
