let express= require('express');
const { v4: uuidv4 } = require('uuid'); // Import the uuid package
let router = express.Router();
let CallbackRequest = require('../models/callback-requests').CallbackRequest;

let authMiddleware = require('../middleware/auth');

router.get('/' , authMiddleware, async (req,resp)=>{
  resp.send(await CallbackRequest.find());
});

router.post('/' , async (req,resp)=>{
  let reqBody = req.body;
  let newRequest = new CallbackRequest({
    id:uuidv4(),
    phoneNumber:reqBody.phoneNumber,
    date: new Date()

  });
  await newRequest.save();
  resp.send('accepted');

});

router.delete('/:id',authMiddleware, async (req,resp)=>{

    await CallbackRequest.deleteOne({id: req.params.id});
    resp.send('deleted');


});

module.exports = router;

