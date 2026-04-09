import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
   .isEmail()
   .withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return badRequest(res, errors.array());
    }
    next();
  },
];

export const validateLogin = [
  body("email")
   .isEmail()
   .withMessage("Please provide a valid email"),

  body("password")
   .notEmpty()
   .withMessage("Password is required"),
   
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return badRequest(res, errors.array());
    }
    next();
  },
];