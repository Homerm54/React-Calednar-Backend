const NotEntryPoint = (req, res)=>{
  // Bad Request
  res.status(400).json({
    msg: 'Entry Point Not Found',
  })
}

module.exports = NotEntryPoint;