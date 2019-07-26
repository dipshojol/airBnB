const express= require("express");
const exphbs=require("express-handlebars");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//import routes
const generalRoute = require("./routes/General");
const userRoute = require("./routes/User");
const taskRoute = require("./routes/Task");

//this creates the express object. THIS OBJECT
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



//This forces express to set handlebars as it's template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//This code is needed to load all static files (images,css,js)
app.use(express.static('public'))


//This loads all your route modules
app.use("/", generalRoute);
app.use("/user", userRoute);
app.use("/task", taskRoute);

//This line conntects mongoose to our mongoDB database
mongoose.connect('mongodb://localhost:27017/taskMangApp', {useNewUrlParser: true})
.then( ()=>
{
  console.log(`The application is connected to the mongo db databse`)
})
.catch( (err)=>
{
    console.log(`The mongo db failed to connect because ${err}`);
});

const port=1000;
app.listen(port, ()=>{
    console.log(`The web server is connected!!`);
});