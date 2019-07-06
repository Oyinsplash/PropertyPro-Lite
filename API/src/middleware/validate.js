import { check, validationResult } from "express-validator";

export default class Validator {
  static validateSignUp() {
    return [
      check(["first_name", "last_name"])
        .exists()
        .withMessage("This is a required field")
        .not()
        .isEmpty()
        .withMessage("This field can not be left empty")
        .isAlpha()
        .withMessage("This field takes only alphabets")
        .isLength({ min: 2 })
        .withMessage("Name should be at least 2 letters long")
        .trim()
        .escape(),
      check("email")
        .exists()
        .withMessage("This is a required field")
        .not()
        .isEmpty()
        .withMessage("This field can not be left empty")
        .isEmail()
        .withMessage("Please enter a valid email address"),
      check("phoneNumber")
        .exists()
        .withMessage("This is a required field")
        .not()
        .isEmpty()
        .withMessage("This field can not be left empty")
        .isNumeric()
        .withMessage("Please enter a valid phone number")
        .isLength({ min: 9, max: 11 })
        .withMessage("Phone number should be between 9-11 characters"),
      check("address")
        .exists()
        .withMessage("This is a required field")
        .not()
        .isEmpty()
        .withMessage("This field can not be left empty")
        .isLength({ min: 3 })
        .withMessage("Address should be at least 3 letters long")
        .trim()
        .escape(),
      check("password")
        .exists()
        .withMessage("This is a required field")
        .not()
        .isEmpty()
        .withMessage("This field can not be left empty")
        .isLength({ min: 5 })
        .withMessage("Password should be at least 6 letters long")
        .trim()
        .escape(),
      check("confirm_password")
        .exists()
        .withMessage("This is a required field")
        .not()
        .isEmpty()
    ];
  }

  static async myValidationResult(req, res, next) {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "400 Invalid Request",
        error: "Your request contains invalid parameters"
      });
    }
    return next();
  }
}
