require('dotenv').config();
let express = require('express');
let app = express();

app.use(function middleware(req, res, next){
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
});

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
























 module.exports = app;
