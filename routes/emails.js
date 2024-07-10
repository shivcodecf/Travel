let express= require('express');
const { v4: uuidv4 } = require('uuid'); // Import the uuid package
let router = express.Router();
let Email = require('../models/emails').Email;

let authMiddleware = require('../middleware/auth');

// sending data from server to clients

router.get('/' , authMiddleware,async (req,resp)=>{
  resp.send(await Email.find());
}); 

// recieveing data from clients


router.post('/' , async (req,resp)=>{

  let reqBody = req.body;
  let newEmail = new Email({
    id:uuidv4(),
    name:reqBody.name,
    text:reqBody.text,
    email:reqBody.email,
    date: new Date()

  });

  await newEmail.save();
  resp.send('accepted');

});



router.delete('/:id', authMiddleware,async (req,resp)=>{
    await Email.deleteOne({id: req.params.id});
    resp.send('deleted');

});

module.exports = router;
