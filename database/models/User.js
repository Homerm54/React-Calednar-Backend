const { Schema, model } = require('mongoose');


// Create an schema, i.e., specify the fields that a certain model
// will need, its type, and special attributes, like required, unique.
const UserSchema = Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
});


/*
 * Create and export a model, which is created with:
 * name: The name of the model, which represents in teh DB
 * schema: The Schema that this model will have.
 */
module.exports = model('User', UserSchema);


