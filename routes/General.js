var express = require('express');

const router = express.Router();

router.get("/", (req, res)=>{
    res.render("General/home");
});

router.get("/aboutus", (req, res)=>{
    res.render("General/about");
});

router.get("/contactus", (req, res)=>{
    res.render("this is my contact us page!!!!");
});


module.exports=router;