
let auth = require('../controllers/auth');


function checkAuth(req,resp,next){
   
    let token = req.cookies['auth_token'];

  if(token && auth.checkToken(token)){   //here we check whether the cookie exists and its token are correct.
    
    next();


  }
  else{
    resp.status(400);
    resp.send("Not authorised to clients");
  }

}

module.exports= checkAuth;