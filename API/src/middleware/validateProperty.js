import { check, validationResult } from "express-validator";
import { state, type, status, purpose } from "../helpers/propertyInfo";

export default class ValidateProperty {
  static validate() {
    return [
      check("state")
        .exists()
        .withMessage("State is Required")
        .not()
        .isEmpty()
        .withMessage("State cannot be empty")
        .isIn([...state])
        .withMessage("Select a State From The List Below.")
        .trim(),
      check("city")
        .exists()
        .withMessage("City is Required")
        .not()
        .isEmpty()
        .withMessage("City cannot be empty")
        .isAlpha()
        .withMessage("City takes only alphabets")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Enter at Least 3 Characters")
        .escape(),
      check("address")
        .exists()
        .withMessage("Address is Required")
        .not()
        .isEmpty()
        .withMessage("Address cannot be empty")
        .isLength({ min: 5 })
        .withMessage("Enter at least 3 characters long")
        .trim()
        .escape(),
      check("type")
        .exists()
        .withMessage("Type is Required")
        .not()
        .isEmpty()
        .withMessage("Type cannot be empty")
        .isIn([...type])
        .withMessage("Select one of the types listed"),
      check("status")
        .exists()
        .withMessage("Status is Required")
        .not()
        .isEmpty()
        .withMessage("Status cannot be empty")
        .isIn([...status])
        .withMessage("Selcet one of The Status Listed")
        .trim(),
      check("price")
        .exists()
        .withMessage("Price is Required")
        .not()
        .isEmpty()
        .withMessage("Price cannot be empty")
        .isLength({ min: 3, max: 15 })
        .withMessage("should be between 3-15 characters long")
        .trim()
        .matches(/^\d+(\.|\d)\d+$/)
        .withMessage("Price takes only numbers")
        .escape(),
      check("purpose")
        .exists()
        .withMessage("Purpose is Required")
        .not()
        .isEmpty()
        .withMessage("Purpose cannot be empty")
        .isIn([...purpose])
        .withMessage("Select one of the purposes listed")
    ];
  }
  /* eslint no-param-reassign: 0 */

  static async myValidationResult(req, res, next) {
    const errors = validationResult(req);
    const isRequired = false;
    if (!errors.isEmpty()) {
      const validateErrors = errors.array();
      const errorResult = validateErrors.map(err => err.msg);
      if (isRequired)
        return res.status(400).json({
          status: "400 Bad Request",
          error: "Some required fields are missing",
          errors: errorResult
        });
      return res.status(400).json({
        status: "400 Bad Request",
        error: "Your request contains invalid parameters",
        errors: errorResult
      });
    }
    return next();
  }
  
}
