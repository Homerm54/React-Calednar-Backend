// route: host + /events/<actions>



const { Router } = require('express');
const JWTValidator = require('../../middlewares/JWTValidator');

const readMiddleware = require('./read');

const {
  create: createMiddleware, 
  validators: createValidators
} = require('./create');

const {
  update: updateMiddleware, 
  validators: updateValidators
} = require('./update');

const deleteMiddleware = require('./delete');




const router = Router();



// This whole route must be accessed only for validated users
// Using router.use, this middleware will be ava0ilable called on every request
router.use(JWTValidator);



router.post('/create', createValidators, createMiddleware);
router.get('/read', readMiddleware);
router.put('/update/:id', updateValidators, updateMiddleware);
router.delete('/delete/:id', deleteMiddleware);




router.all('*', (req, res) => {
  res.status(404).json({
    ok: false,
    msg: 'Endpoint not found',
  });
});





module.exports = router;

// TODO: Add DB connection
