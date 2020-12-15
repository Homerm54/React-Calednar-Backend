const isDate = require('../../middlewares/isDate');
const CheckForErrors = require('../../middlewares/CheckForErrors');
const { body } = require('express-validator');
const Event = require('../../database/models/Event');





const create = async (req, res) =>{

  const event = new Event(req.body);

  try {
    event.user = req.body.uid; // Created from token
    await event.save();

    res.json({
      ok: true,
      event,
    });

  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please, contact administration",
    })
  }
}



const validators = [
  body('title', "Event Title is required").not().isEmpty(),
  body('start', "Event start date is required").not().isEmpty(),
  body('end', "Event end date is required").not().isEmpty(),
  body("start", "Invalid Start Date").custom(isDate),
  body("end", "Invalid End Date").custom(isDate),
  CheckForErrors,
]





module.exports = {
  create,
  validators
};

