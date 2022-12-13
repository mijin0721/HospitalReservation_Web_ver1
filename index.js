const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 

const MongoClient = require('mongodb').MongoClient

var db;
MongoClient.connect("mongodb+srv://mijin:20207140@cluster0.wagohmp.mongodb.net/?retryWrites=true&w=majority", function(err, client){
  if (err) return console.log(err)
  db = client.db('hospital');

  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})



app.get('/', function(req, res) { //메인 웹 페이지
    res.sendFile(__dirname +'/home.html')
})

app.get('/hospital', function(req, res) { // 병원확인
    res.sendFile(__dirname +'/hospital.html')
})

app.get('/reservation', function(req, res) { //예약하기
    res.sendFile(__dirname +'/reservation.html')
})

app.get('/res_confirm', function(req, res) { //예약확인
    res.sendFile(__dirname +'/res_confirm.html')
})

app.get('/login', function(req, res) { //예약확인
    res.sendFile(__dirname +'/hos_login.html')
})

app.get('/signup', function(req, res) { //예약확인
    res.sendFile(__dirname +'/hos_signup.html')
})

app.get('/logout', function(req, res) { //예약확인
    res.sendFile(__dirname +'/home_log.html')
})

app.post('/add', function(req, res){
    db.collection('reservation').insertOne({name: req.body.name, phone: req.body.phone, hour: req.body.hour, 
    minute: req.body.minute, hospital: req.body.hospital, symptom: req.body.symptom}, function(err, result){
      if(err) return console.log("error");
      console.log("save complete...");
    })
    res.sendFile(__dirname +'/home.html')
  })
