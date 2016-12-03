var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');
var DatabaseFunction = require('./Source/Server/test.js');
var quickstart = require('./Source/Server/quickstart.js');
var updateDB = require('./Source/Server/updateDB.js');
var profileStorage = require('./Source/Server/profileStorage.js');


var str = (__dirname + '/Source/Server/quickstart.js')
var runQuickstart = require(str);

app.use(express.static(__dirname + '/Source/Client/Templates'));

app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
    console.log("Loading Home Page...");
    res.sendFile('/Source/Client/Templates/Home.html', {root: __dirname });
});

  app.get('/RefreshDatabase', function (req, res) {
    // quickstart.runQuickstart(function(err, data){
    //   if(err) {
    //     // handle the error here
    //     console.log("An error has occurred: " + err)
    //   }
    //   // send the data
    //   res.send(data);
    // })
    // res.send(quickstart.runQuickstart());
    var callCount = 1;
    var repeater = setInterval(function () {
      if (callCount < 30) {
        quickstart.runQuickstart();
        callCount += 1;
      } else {
        clearInterval(repeater);
      }
    }, 5000);

    updateDB.callWaitingList(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      console.log("Refreshing Database...");
      res.send(data);
    })
  });


  app.get('/LoadWaitingList', function (req, res) {
    updateDB.callWaitingList(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      console.log("Loading Waiting List...");
      res.send(data);
    })
  });

  app.post('/storeTempProfile', jsonParser, function (req, res) {
    profileStorage.storeProfile(req.body); 
    console.log("Storing Temp Profile...");
    return res.sendStatus(200);
  }); 

  app.get('/getTempProfile', function (req, res) {
    profileStorage.retrieveProfile(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      console.log("Sending Profile...");
      res.send(data);
    })
  });

  app.post('/acceptChild', jsonParser, function (req, res) {
    updateDB.acceptChild(req.body); 
    console.log("Accepting Child...");
    return res.sendStatus(200);
  }); 

  app.get('/callEnrolledList', function (req, res) {
    updateDB.callEnrolledList(function(err, data){
      if(err) {
        // handle the error here
      }
      // send the data
      console.log("Loading Enrolled List...");
      res.send(data);
    })
  });

  app.post('/test', jsonParser, function (req, res) {
    updateDB.editFromProfile(req.body); 
    console.log("Applying Profile Changes...");
    return res.sendStatus(200);
  }); 



app.listen(3000);
console.log("running at port 3000");