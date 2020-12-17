const { body } = require('express-validator');
const checkForErrors = require('../../middlewares/CheckForErrors');
const jwtGenerator = require('../../utils/jwtGenerator');
const User = require('../../database/models/User');
const bcryptjs = require('bcryptjs');




/**
 * Create a new User to the server
 * @param {*} req 
 * @param {*} res 
 */
const SignUp = async (req, res) => {

  try {


    // Mongoose know what values we need, and will extract
    // the fields needed, ignoring the ones we send but don't need
    const user = new User(req.body);

    
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(req.body.password, salt);

    await user.save();

    const token = await jwtGenerator(user.id, user.name);

    res.status(201).json({
      ok: true, token,
      uid: user.id, name: user.name,
    });

  } catch (error) {
    console.log(error);
    // Internal Server Error
    res.status(500).json({
      ok: false,
      msg: "Please, contact administration",
    });
  }

}




const checkEmailInUse = async (req, res, next) => {

  const { email, } = req.body;

  try {

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Email already in use",
      })
    }

    next(); // Call the next middleware

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please, contact administration",
    });

  }
}



const validators = [
  body("name", "A name must be provided").not().isEmpty(),
  body("name", "Name Length invalid. min: 3").isLength({ min: 3 }),
  body("email", "Email is required").not().isEmpty(),
  body("email", "Invalid Email Address").isEmail(),
  body("password", "Password field is required").not().isEmpty(),
  body("password", "Passowrd length invalid (min 5)").isLength({ min: 5 }), checkForErrors,
  checkEmailInUse,
]



module.exports = {
  SignUp, validators
};