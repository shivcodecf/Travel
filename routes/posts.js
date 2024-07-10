let express= require('express');

const { v4: uuidv4 } = require('uuid'); // Import the uuid package

let Post = require('../models/posts').Post;

let router = express.Router();

let authMiddleware = require('../middleware/auth');


router.get('/', async (req,res) => {

    let posts = await Post.find();

    res.send(posts);

}) 



router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
})


console.log(uuidv4);

router.post('/',authMiddleware, async (req,res) => {

       let reqBody = req.body;

    //    let imgPath;

    //    if (reqBody.imageURL) {

    //     imgPath = reqBody.imageURL;

    // } else {

    //     imgPath = path.join('/', req.file.path);
    // }


    let newPost = new Post({
       
        id: uuidv4(), // Generate a unique ID for the new post
        title:reqBody.title,
        date:new Date(),
        description:reqBody.description,
        text:reqBody.text,
        country:reqBody.country,
        imageURL:reqBody.imageUrl






    })

    await newPost.save();


    console.log(req.file);

    res.send("Created");


}) 

router.delete('/:id', authMiddleware,async (req,res)=>{
    let id = req.params.id;
   await Post.deleteOne({id: id});
   res.send("deleted");
})  



router.put('/:id', authMiddleware,  async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('Updated!');
})

module.exports = router;


