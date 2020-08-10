
var express = require("express");
var Cors = require("cors");
var app = express();
var axios = require("axios");
require("dotenv").config();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

let config = {
     headers: {
       // "Content-Type": "application/json",
       Authorization: "Bearer FLWSECK_TEST-ebee57ec17fcfddd4a8e5d4cf1a0941a-X",
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
       "Access-Control-Allow-Headers":
         "Origin, X-Requested-With, Content-Type, Accept, Authorization",
     },
   };

app.post("/transfer", function transfer(req,res){
    const myLoad = req.body;

    axios.post("https://api.flutterwave.com/v3/transfers", myLoad,config)
    .then((response) => {
        console.log(response.data)
        res.send(response.data)
    }).catch((error) => {
        console.log(error);
    })
})

app.post("/bulk", function bulkTransfer(req,res){
  const bulkLoad = req.body
  axios.post("https://api.flutterwave.com/v3/bulk-transfers", bulkLoad,config)
  .then((response) => {
      console.log(response.data)
      res.send(response.data)
  }).catch((error) => {
      console.log(error);
  })
})

app.listen(4005, function(){
    console.log("Server runing on 4005");
})