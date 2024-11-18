require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(function middleware(req, res, next){
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

console.log("Hello World")

app.get('/', function(req, res){
    // res.send('Hello Express');
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res) => {
    let response;
    if (process.env.MESSAGE_STYLE === 'uppercase'){
        response = "HELLO JSON";
    } else {
        response = "Hello json";
    }
    res.json({"message": response})
})

app.use('/public',express.static(__dirname + '/public'));

app.get('/now', (req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        time: req.time
    })
});

app.get('/:word/echo', (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    })
})

app.get('/name', (req, res) => {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({
        name:  firstName+" "+lastName
    })
})

app.post('/name', (req, res) => {
    let firstName = req.body.first;
    let lastName = req.body.last;
    res.json({
        name: firstName+' '+lastName
    })
});





















 module.exports = app;
