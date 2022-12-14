const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 
var db;

const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs');


MongoClient.connect("mongodb+srv://mijin:20207140@cluster0.wagohmp.mongodb.net/?retryWrites=true&w=majority", function(err, client){
  if (err) return console.log(err)
  db = client.db('hospital');
  console.log('DB connected')
  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})

app.get('/', function(req, res) { //메인 웹 페이지
    res.sendFile(__dirname +'/html/home.html')
})

app.get('/hospital', function(req, res) { // 병원확인
    res.sendFile(__dirname +'/html/hospital.html')
})

app.get('/reservation', function(req, res) { //예약하기
    res.sendFile(__dirname +'/html/reservation.html')
})

app.get('/res_confirm', function(req, res) { //예약확인
  db.collection('small_reservation').find().toArray(function(err, result){
    console.log(result);
    res.render('list.ejs', {loginfo : result})
  })
})

app.get('/login', function(req, res) { 
    res.sendFile(__dirname +'/html/hos_login.html')
})

app.get('/signup', function(req, res) { 
    res.sendFile(__dirname +'/html/hos_signup.html')
})

app.get('/logout', function(req, res) { 
    res.sendFile(__dirname +'/html/home_log.html')
})

app.post('/add/small_reservation', function(req, res){
    db.collection('small_reservation').insertOne({name: req.body.name, phone: req.body.phone, hour: req.body.hour, 
    minute: req.body.minute, hospital: req.body.hospital, symptom: req.body.symptom}, function(err, result){
      if(err) return console.log("error");
      console.log("small_reservation save complete...");
    })
    res.sendFile(__dirname +'/html/home.html')
  })

app.post('/add2', function(req, res){
  db.collection('login').insertOne({email: req.body.email, password:req.body.password}, function(err, result){
    if(err) return console.log("error");
    console.log("login save complete...");
  })
  res.sendFile(__dirname +'/html/home.html')
})

app.post('/add/signup', function(req, res){
  db.collection('signup').insertOne({name: req.body.name, phone: req.body.phone, ID: req.body.ID, 
    PW: req.body.PW, address: req.body.address, people: req.body.people}, function(err, result){
    if(err) return console.log("error");
    console.log("signup save complete...");
  })
  res.sendFile(__dirname +'/html/home.html')
})