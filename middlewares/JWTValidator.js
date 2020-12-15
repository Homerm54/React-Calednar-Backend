const jwt = require('jsonwebtoken');




const JWTValidator = (req, res, next)=>{

  // Token must be passed in headers, as x-token

  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      ok: false,
      msg: "Token not provided, user not authenticated",
    })
  }


  try {


    const payload = jwt.verify(token, process.env.JWT_SECRET_KET);
    
    req.body.uid = payload.uid;
    req.body.name = payload.name;


  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid Token"
    })
  }


  next();
}


module.exports = JWTValidator;


