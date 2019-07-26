const express= require("express");
const userSchema = require("../models/User");
const mongoose = require("mongoose");
const router = express.Router();
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

router.get("/tasks/task",(req,res)=>
{ 
    res.render("Users/login")

});

router.get("/login",(req,res)=>
{ 
    res.render("Users/login")

});

router.post("/login",(req,res)=>
{

});

router.get("/register",(req,res)=>
{ 
    res.render("Users/register");

});

router.post("/register", (req,res)=>
{
    const errors= [];

    //validate


    if(req.body.firstName==="")
    {
      errors.push("You must enter a first name");
    }

    if(req.body.lastName==="")
    {
      errors.push("You must enter a last name");
    }


    if(req.body.username==="")
    {
      errors.push("You must enter a username");
    }

    if(req.body.password==="")
    {
      errors.push("You must enter a password");
    }

    if(req.body.cpassword==="")
    {
      errors.push("You must enter confirm");
    }

    if(req.body.password!=="" && req.body.cpassword!=="")
    {
        if(req.body.password!= req.body.cpassword)
        {
          errors.push("The password and confirm was not equal");

        }
    }

    //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
    if(errors.length > 0)
    {

          res.render("Users/register",{
            errors:errors,
            firstName: req.body.firstName,
            lastName : req.body.lastName,
            userName : req.body.username
          });
    }

   
    else
    {

        //This creates a model in our application called user. A model is a representation of a collection
        const User = mongoose.model('Users', userSchema);

        const userData=
        {
          firstName :req.body.firstName,
          lastName: req.body.lastName,
          userName : req.body.username ,
          password : req.body.password
        }


        new User(userData)
        .save()
        .then( ()=>
        {
          new User(userData)
          .save()
          .then( ()=>
          {
              
            const accountSid = 'AC8f0054519a470e44b8dd5c47e6baf62f';
            const authToken = 'e78cd685b8be2d5a4fad2e85fe07013d';
            const client = require('twilio')(accountSid, authToken);
            
            client.messages
              .create({
                body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
                from: '+16137040924',
                to: '3652287013'
              })
              .then(message => console.log(message.sid));
            res.redirect("/user/login");
          })
          .catch( (err)=>
          {
            console.log(`Error ${err}`)
          });
          var options = {
            auth: {
                api_user: 'dip_shojol',
                api_key: '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'
            }
        }
            
        var mailer = nodemailer.createTransport(sgTransport(options));
          // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        var email = {
          to: 'dip.shojol13@gmail.com',
          from: 'dip_shojol@yahoo.com',
          subject: 'Hi there',
          text: 'Awesome sauce',
          html: '<b>Awesome sauce</b>'
        };

        mailer.sendMail(email, function(err, res) {
          if (err) { 
              console.log(err) 
          }
          console.log(res);
        });
        res.redirect("/user/login");
        })
        .catch( (err)=>
        {
          console.log(`Error ${err}`)
        });

    }











});

module.exports=router;