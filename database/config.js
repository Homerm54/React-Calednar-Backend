const mongoose = require('mongoose');


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}



async function DBConnection(){

  try {

    await mongoose.connect(process.env.DB_CONNECTION_DIRECTION, options);

    console.log('DB Connection Successfully');
    
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to Database');
  }
}

module.exports = DBConnection;