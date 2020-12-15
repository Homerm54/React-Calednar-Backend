const Event = require('../../database/models/Event');



const read = async (req, res) => {

  try {

    const events = await Event.find().populate('user', 'name');
    res.json({
      ok: true,
      events,
    });
  }catch(error){

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    })
  }
  
}



module.exports = read;