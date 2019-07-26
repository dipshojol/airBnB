/*
Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
{
    title: 
    { 
    type:String,
    required:true 
    },
    description: 
    { 
    type:String,
    required:true 

    }

});

module.exports=taskSchema;