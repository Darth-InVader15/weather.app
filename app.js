const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true})); //for parsing the req from html

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const appid = 'd09012b3af373237aee36cb992370025';
    const town = req.body.city;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + town +'&appid=' + appid + '&units=metric';

    https.get(url, function(response){
        // console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The weather in " + town + " is currently " + des + "</h1>");
            res.write("<h2>It feels like " + temp + "'C. </h2> ")
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    });
    
})

app.listen(3001,function(){
    console.log("Its On"); 
})




    // res.send("This is just a test");