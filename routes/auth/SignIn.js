const { body } = require('express-validator');
const checkForErrors = require('../../middlewares/CheckForErrors');
const User = require('../../database/models/User');
const bcryptjs = require('bcryptjs');
const jwtGenerator = require('../../utils/jwtGenerator');



/**
 * Authenticate an existing user to the server
 * @param {*} req 
 * @param {*} res 
 */
const SignIn = async (req, res) => {

  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({
        ok: false,
        msg: "Email not found in Database", 
        // For production, this msg shold be more general
      })
    }

    const passwordIsValid = bcryptjs.compareSync(password, user.password);
    if(!passwordIsValid){
      return res.status(400).json({
        ok: false,
        msg: "Password invalid",
      });
    }


    const token = await jwtGenerator(user.id, user.name);

    res.status(201).json({
      ok: true, token,
      uid: user.id, name: user.name,
    });


  } catch (error) {

    console.log(error);
    res.status(500).json({ // Internal Server Error
      ok: false,
      msg: "Please, contact administration",
    });
  }
}



// Middleware array
const validators = [
  body("email", "Email is required").not().isEmpty(),
  body("email", "Invalid Email Address").isEmail(),
  body("password", "Password field is required").not().isEmpty(),
  body("password", "Passowrd length invalid (min 5)").isLength({ min: 5 }),
  checkForErrors,
]





module.exports = {
  SignIn,
  validators
};