const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.URL;


const connect =  () => {
    mongoose.set('strictQuery', false);
  return mongoose.connect(URL,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },(err) => {
        if (err) {
        console.log("error in connection");
        } else {
        console.log("mongodb is connected");
        }});
};

module.exports = connect;