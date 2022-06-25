const { body, validationResult } = require("express-validator")

const User = require("../models/user")
const bcrypt = require("bcryptjs")

exports.createUser = [

  // Validate and sanitize fields
  body("ca-email").trim().exists().escape().withMessage("Email is required."),
  body("ca-username").trim().exists().escape().withMessage("Username is required."),
  body("ca-password").trim().exists.escape().withMessage("Password is required."),
  body("ca-confirm-password").custom((value, { req }) => value === req.body.ca-pasword),

  (req, res, next) => {

    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return;
    }

    bcrypt.hash(req.body.ca-password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err)
      }

      const user = new User(
        {
          email: req.body.ca-email,
          user_name: req.body.ca-username,
          password: hashedPassword
        })
  
        user.save(err => {
          if (err) {
            return next(err)
          }
          res.redirect("/")
        }
      )

    })

  }
]