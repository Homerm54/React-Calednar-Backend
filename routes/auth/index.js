// Route: host + /api/auth/ + router routes

const { Router } = require('express');
const {SignIn, validators: SignInValidators} = require('./SignIn');
const {SignUp, validators: SignUpValidators} = require('./SignUp');
const { JWTRecreate, validators: JWTValidators } = require('./JWT');
const NotEntryPoint = require('./default');


// Router is like a portion of the big app created with Express
// with the routers, we can configure middlewares that are binded
// only to this section.
const router = Router();



// **** MIDDLEWARE CONFIGURATION 

// Validate information and Sign the User In
router.post('/SignIn', SignInValidators, SignIn);

// End Point to Create a New User in the server (db)
router.post('/SignUp', SignUpValidators, SignUp);

// Revalidate JWT to keep user signed in
// TODO: TEST THIS
router.get('/JWTRevalidation', JWTValidators, JWTRecreate);

// Default
router.all('*', NotEntryPoint);



module.exports = router;

