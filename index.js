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

app.get('/', function(req, res) { //메인 홈 페이지로 넘어감
    res.sendFile(__dirname +'/html/home.html')
})

app.get('/reservation', function(req, res) { //예약하기 페이지로 넘어감
    res.sendFile(__dirname +'/html/reservation.html')
})

app.get('/confirm', function(req, res) { // 예약확인하기 페이지로 넘어감
  res.sendFile(__dirname +'/html/confirm.html')
})

app.get('/hospital', function(req, res) { //병원 찾기 페이지로 넘어감
  db.collection('member').find().toArray(function(err, result){
    res.render('map.ejs', {loginfo : result})
  })
})

app.get('/login', function(req, res) { //로그인 페이지로 넘어감
    res.sendFile(__dirname +'/html/login.html')
})

app.get('/signup', function(req, res) { //회원가입 페이지로 넘어감
    res.sendFile(__dirname +'/html/signup.html')
})

app.get('/logout', function(req, res) { 
    res.sendFile(__dirname +'/html/home_log.html')
})

app.post('/add/reservation', function(req, res){  //병원 진료 예약하는 데이터 mongodb로 저장
    db.collection('reservation').insertOne({name: req.body.name, phone: req.body.phone, hour: req.body.hour, 
    minute: req.body.minute, hospital: req.body.hospital, symptom: req.body.symptom}, function(err, result){
      if(err) return console.log("error");
      console.log("reservation save complete...");
    })
      res.sendFile(__dirname +'/html/home.html')
  })

app.post('/add/signup', function(req, res){ // 회원가입 데이터 mongodb로 저장
  db.collection('signup').insertOne({name: req.body.name, phone: req.body.phone, ID: req.body.ID, 
    PW: req.body.PW, address: req.body.address, people: req.body.people}, function(err, result){
    if(err) return console.log("error");
    console.log("signup save complete...");
  })
  res.sendFile(__dirname +'/html/home.html')
})

app.post('/add/login', (req, res) => { // mongodb에서 회원가입 데이터를 가지고 와서 ID와 PW가 있는지 확인
	db.collection('signup').findOne({ ID: req.body.ID, PW: req.body.PW }, (err, user) => {
		if (err) return console.log("error");
		else if (user) return res.sendFile(__dirname +'/html/home.html')
	});
});

app.post('/add/confirm', function(req, res){ // mongodb에서 회원가입 데이터를 가지고 와서 phone가 있는지 확인
  var query = { phone : req.body.phone };
  db.collection("reservation").find(query).toArray(function(err, result) {
    if (err) throw err;
    res.render('confirm.ejs', {loginfo : result})
  });
});