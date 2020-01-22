
//Loading the modules using require() function
// const http = require('http');
const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Creating database connection
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "trainingportal"
});

conn.connect(function(err){
    if(err) throw err;
    console.log("Connected!");

});

app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//Creating app server
var server = app.listen(3000, "127.0.0.1", function(){

    var port = server.address().port
    var host = server.address().address
    
    console.log("Your app is listening on http://%s:%s",host , port);
});

//Rest API

/* To get all the Schedules 
method: GET
endpoint: getallschedules */

app.get('/getallschedules', function(req, res){
    conn.query('SELECT * from schedule', function(error, results, fields){
        if(error) throw error;
        res.setHeader('content-type', 'application/json');
        console.log(results);
        return res.send(results);
    });
});

/* To get a schedule for a schedule id 
method: GET
endpoint: getschedule/id */

app.get('/getschedule/:id', function(req, res){
    var sId = req.params.id;
    conn.query('SELECT * from schedule WHERE id = ?', [sId], function(error, results, fields){
        if(error) throw error;
        res.setHeader('content-type', 'application/json');
        return res.send(JSON.stringify(results));
    });
});

/* To post the schedule
method: POST
endpoint: createschedule */

app.post('/createschedule',function(req, res){

    var posted = req.body;
    conn.query('INSERT INTO schedule (name, department, datetime, duration, description, meetroom) VALUES (?, ?, ?, ?, ?, ?)',[posted.name,posted.department,posted.datetime,posted.duration,posted.description, posted.meetroom], function (error, results, fields) {
        if (error) throw error;
        res.setHeader('content-type','application/json');
       return res.send(JSON.stringify(results));
    });
});


/* To update the schedule
method: PUT
endpoint: updateSchedule */

app.put('/updateSchedule',function(req, res){
    var posted = req.body;
    conn.query('UPDATE schedule SET name = ?, department = ?, datetime = ?, duration = ?, description = ?, meetroom = ? WHERE id = ?', [posted.name,posted.department,posted.datetime,posted.duration,posted.description, posted.meetroom, posted.id], function(error, results, fields){
        if(error) throw error;
        res.setHeader('content-type', 'application/json');
        return res.send(JSON.stringify(results));
    });
});

/* To delete the schedule
method: DELETE
endpoint: deleteSchedule */

app.delete('/deleteSchedule/:id', function(req,res){
    console.log(req.params.id);
    conn.query('DELETE from schedule WHERE id = ?', [req.params.id], function(error, results, fields){
        if(error) throw error;
        return res.send(JSON.stringify(results));
    });
});