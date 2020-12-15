/*
  As any morder server, we won't be aware of how many users are logged in,
  but actually just require them to send us a JWT to the endpoints that needs
  authentication. If the JWT is Signed, we will allow them to make the changes.

  A JWT will be provided only on SignIn/SignUp, this means, that if a user has a valid JWT, he/she has successfully signed in/up.
*/



const jwtGenerator = require('../../utils/jwtGenerator');
const jwtValidator = require('../../middlewares/JWTValidator');



/**
 * Revalidate a JWT to an already logged user in the database.
 * @param {*} req 
 * @param {*} res 
 */
const JWTRecreate = async (req, res) => {

  const { name, uid } = req.body;

  const token = await jwtGenerator(uid, name);

  res.json({
    ok: true,
    token,
    name,
    uid
  });
}


const validators = [
  jwtValidator,
]


module.exports = {
  JWTRecreate,
  validators
};
