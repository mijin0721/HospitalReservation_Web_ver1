const express = require('express');
const app = express();

app.listen(8080, function() {
    console.log('listening on 8080')
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

