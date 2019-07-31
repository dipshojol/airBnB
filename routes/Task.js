const express= require("express");
const taskSchema = require("../models/Task");
const mongoose = require("mongoose");
const router = express.Router();

    //This creates a model in our application called user. A model is a representation of a collection
  const Task = mongoose.model('Tasks', taskSchema);



//This displays the Add Task form
router.get("/addtask",(req,res)=>
{ 
    res.render("Tasks/addtask");

});


//This process the data after the task form has been submitted
router.post("/addtask",(req,res)=>
{ 

    const errors= [];

    //validate


    if(req.body.title==="")
    {
      errors.push("You must enter a title");
    }

    if(req.body.description==="")
    {
      errors.push("You must enter a last name");
    }

    
    //THERE IS ERROR(S)
    if(errors.length > 0)
    {

          res.render("Tasks/addtask",{
            errors:errors,
            title: req.body.title,
            description : req.body.description
          });
    }

    //NO ERRORS
    else
    {

  

        const taskData=
        {
          title :req.body.title,
          description: req.body.description

        }

        new Task(taskData)
        .save()
        .then( ()=>
        {
          
           res.redirect("/task/tasks");
        })
        .catch( (err)=>
        {
          console.log(`Error ${err}`)
        });

    }


});


router.get("/tasks",(req,res)=>
{ 
   //Anytime you want to pull data from the DB, specifically a collection, you must called the find() method on the variable that re the Model
   Task.find()
   .then((tasks)=>
   {
        res.render("Tasks/taskList",{
          allTask:tasks

        })
   })
});


//This navigates the user to the Task Edit form with populated data
router.get("/edit/:id",(req,res)=>
{ 

   Task.findOne({ _id:req.params.id})
   .then((task)=>
   {
        res.render("Tasks/editForm",{
          task:task

        })
   })
});

router.put("/edit/:id",(req,res)=>
{ 
    Task.findOne({ _id: req.params.id })
        .then(task => {
            task.title = req.body.title;
            task.description = req.body.description;

            task.save()
                .then(task => {
                res.redirect("/task/tasks")
            })
    })

});



//This navigates the user to the Task Edit form with populated data
// router.get("/delete/:id",(req,res)=>
// { 

//    Task.findOne({ _id:req.params.id})
//    .then((task)=>
//    {
//         res.render("Tasks/deleteTask",{
//           task:task

//         })
//    })
// });


router.delete("/delete/:id",(req,res)=>
{ 
    Task.findOne({ _id: req.params.id })
        .then(task => {

            task.delete()
                .then(task => {
                res.redirect("/task/tasks")
            })
    })

});

module.exports=router;