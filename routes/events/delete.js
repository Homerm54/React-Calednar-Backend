const Event = require('../../database/models/Event');


const deleteMiddleware = async (req, res) => {

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

    await Event.findByIdAndDelete(eventID);

    res.json({
      ok: true,
      msg: 'Event Deleted',

    });
  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact Administration",
    })
  }
}



module.exports = deleteMiddleware;