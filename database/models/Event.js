const { Schema, model } = require('mongoose');


const EventSchema = Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the "user" document in the database
    required: true,
  },
  
});



// Customize how an event object is serialized
EventSchema.method('toJSON', function(){

  const { __v, _id, ...object } = this.toObject();

  // Extract __v, and change the name of "_id" to "id"
  object.id = _id;
  return object;
});



/*
 * Create and export a model, which is created with:
 * name: The name of the model, which represents in teh DB
 * schema: The Schema that this model will have.
 */
module.exports = model('Event', EventSchema);


