let express= require('express');

let postsRouter = require('./routes/posts');

let callbackRequestsRouter= require('./routes/callback-requests');


let emailsRouter = require('./routes/emails');

let usersRouter = require('./routes/users.route');
let cookieParser = require('cookie-parser');

let Post = require('./models/posts.js').Post;
let auth = require('./controllers/auth');


// let CallbackRequest = require('./models/callback-requests').CallbackRequest;

// let cr= new CallbackRequest({
//     id:'1234',
//     phoneNumber: '+1234567',
//     date:new Date(),
// })
// cr.save();



let app = express();   


app.set('view engine','ejs');

let mongoose = require('mongoose');





let multer = require('multer');







mongoose.connect('mongodb://0.0.0.0:27017/travels', { 
    
    
    useNewUrlParser: true,
   
  


});





app.use(express.json()); 

// app.use(multer({storage:'public/images'}).single('imageFile'));

// let imageStorage = multer.diskStorage({

//     destination: (req, file, cb) => cb(null, 'public/images'),
//     filename: (req, file, cb) => cb(null, file.originalname)
 
//  })

 




// app.use(multer({storage: imageStorage}).single('imageFile'));









app.use(express.static('public'));

app.use(cookieParser());

app.use('/posts', postsRouter);

app.use('/callback-requests',callbackRequestsRouter);

app.use('/emails',emailsRouter); 
app.use('/users',usersRouter);

app.get('/landmark',async (req,res)=>{

    let id= req.query.id;
    let post = await Post.findOne({id:id});
  res.render('landmark',{
    title: post.title,
    imageURL:post.imageURL,
    date:post.date,
    text:post.text,
  });

})



const port = 3003;
// let isLoggedIn = false;

app.get('/admin',(req,resp)=>{

  let token = req.cookies['auth_token'];

  if(token && auth.checkToken(token)){
    resp.render('admin');
  }
  else{
    resp.redirect('/login');
  }
 
})


// app.get('/admin', checkAuth, (req, res) => {
//   res.render('admin');
// });





app.get('/login',(req,resp)=>{


  let token = req.cookies['auth_token'];

  if(token && auth.checkToken(token)){
    resp.redirect('/admin');
  }
  else{
    resp.render('login');
  }

  

  
})


app.listen(port,()=>console.log(`listening ${port}..`)); 