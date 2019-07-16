import { check, validationResult } from "express-validator";
// import { states, status, type } from "../helpers/propertyInfo";

export default class Validator {
  static validateSignUp() {
    return [
      check("first_name")
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
      check("last_name")
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
        .isEmail()
        .withMessage("Please enter a valid email address")
        .exists()
        .withMessage("This is a required field"),
      check("phone_number")
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
        .trim(),
      check("password")
        .exists()
        .withMessage("This is a required field")
        .not()
        .isEmpty()
        .withMessage("This field can not be left empty")
        .isLength({ min: 5 })
        .withMessage("Password should be at least 6 letters long")
        .trim()
        .escape()
    ];
  }

  static validateSignIn() {
    return [
      check("email")
        .exists()
        .withMessage("Email is required field")
        .not()
        .isEmpty()
        .withMessage("Email can not be left empty")
        .normalizeEmail()
        .isEmail()
        .withMessage("Please enter a valid email address and password"),
      check("password")
        .exists()
        .withMessage("Password is a required field")
        .not()
        .isEmpty()
        .withMessage("Password can not be left empty")
        .isLength({ min: 5 })
        .withMessage("Password should be at least 6 letters long")
        .trim()
        .escape()
    ];
  }
  // static validatePostProperty() {
  //   return [
  //     check('price')
  //      .exists()
  //      .withMessage('Field is Required')
  //      .not()
  //      .isEmpty()
  //      .withMessage('Field cannot be empty')
  //      .isLength({ min: 4, max: 15 })
  //      .withMessage('characters should be between 4-15 long')
  //      .trim()
  //      .matches(/^\d+(\.|\d)\d+$/)
  //      .withMessage('should be either a number or float')
  //      .escape()
  //     check('state')
  //      .exists()
  //      .withMessage('Field is Required')
  //      .not()
  //      .isEmpty()
  //      .withMessage('Field cannot be empty')
  //      .isIn([...states])
  //      .withMessage('')
  //      .trim(),
  //     check('city')
  //      .exists()
  //      .withMessage('Field is Required')
  //      .not()
  //      .isEmpty()
  //      .withMessage('Field cannot be empty')
  //      .isAlpha()
  //      .withMessage('Should be Alphabets only')
  //      .trim()
  //      .isLength({ min: 3 })
  //      .withMessage('Input should be atleast 3 characters long')
  //      .escape(),
  //     check('address')
  //      .exists()
  //      .withMessage('Field is Required')
  //      .not()
  //      .isEmpty()
  //      .withMessage('Field cannot be empty')
  //      .isLength({ min: 5 })
  //      .withMessage('Input should be atleast 3 characters long')
  //      .trim()
  //      .escape(),
  //     check('type')
  //      .exists()
  //      .withMessage('Field is Required')
  //      .not()
  //      .isEmpty()
  //      .withMessage('Field cannot be empty')
  //      .isIn([...type])
  //      .withMessage('')
  //      .trim()
  //   ];
  // }

  static async myValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArray = errors.array().map(({ msg }) => msg);
      return res.status(400).json({
        status: "400 Invalid Request",
        error: "Your request contains invalid parameters",
        errors: errArray
      });
    }
    return next();
  }
}
