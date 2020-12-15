const isDate = require('../../middlewares/isDate');
const CheckForErrors = require('../../middlewares/CheckForErrors');
const { body } = require('express-validator');
const Event = require('../../database/models/Event');


const update = async (req, res) => {


  const eventID = req.params.id; // Comes from the URL
  const { uid } = req.body;

  try {

    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found in DB",
      })
    }


    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not authorized to edit this event",
      })
    }


    const toUpdateEvent = {
      ...req.body,
      user: uid,
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventID, toUpdateEvent, { new: true }
    );

    res.json({
      ok: true,
      event: updatedEvent,
    })

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact Administration",
    })
  }
  res.json({
    ok: true,
    msg: 'Event Update Endpoint',

  });
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
  update,
  validators,
};