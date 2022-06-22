var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'tarea.cvwazpvvgcdl.us-east-1.rds.amazonaws.com',
	user     : 'admin',
	password : 'Qwertyuiop789',
	database : 'nodelogin',
    ssl: 'Amazon RDS',
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				//sucessFlash("Welcome" + username);
				response.redirect('/home');
			} else {
				//failureFlash("Incorrecto")
				response.send('Incorrecto');
			}			
			response.end();
		});
	} else {
		response.send('Ingrese sus credenciales');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Bienvenido, ' + request.session.username + '!');
	} else {
		response.send('Necesitas loguearte');
	}
	response.end();
});

app.listen(3000);
