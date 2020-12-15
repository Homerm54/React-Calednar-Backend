const JWT = require('jsonwebtoken');





const jwtGenerator = (uid, name /*payload*/) => {

  return new Promise((resolve, reject) => {

    JWT.sign({ uid, name }, process.env.JWT_SECRET_KET, {
      expiresIn: '2h',
    }, (err, token)=>{
      
      if(err){
        console.log(err);
        reject('Error generating the JWT');
      }

      resolve(token);
    });
  })
}




module.exports = jwtGenerator;

