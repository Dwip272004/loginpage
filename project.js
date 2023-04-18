const mongoose = require('mongoose');
const express=require('express');
const path=require('path');
const app=express()

//http pages
app.get('/',(req,res)=>{
    console.log('user hit the enter page')
    res.sendFile(path.resolve(__dirname,'index.html'))
})

  
app.listen(5000,()=>{
    console.log('server listening')
})



// connection establishment and creation of new database
mongoose.connect('mongodb+srv://dwip:dwip@cluster0.5dntczn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connection established'))
  .catch((err) => console.log(err));


//schema ---structure of the database

const dataschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:String,


})

//collection creation
const user = new mongoose.model("user",dataschema);


// Add middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Define a route to handle the form submission
app.post('/userdata', (req, res) => {
    const { name, email, age } = req.body;
    const newUser = new user({ name, email }); // use the `user` variable here
    newUser.save()
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error creating user');
      });
  });
  

