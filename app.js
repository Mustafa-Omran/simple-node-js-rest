const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'node_restapi'
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Mysql Connected with App...');
    }
});

app.get('/api/items', (req, res) => {
    let sqlQuery = "SELECT * FROM items";

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(apiResponse(results));
        }
    });
});

app.get('/api/items/:id', (req, res) => {
    let sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id;

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(apiResponse(results));
        }
    });
});

app.post('/api/items', (req, res) => {
    const data = { title: req.body.title, body: req.body.body };
    const sqlQuery = "INSERT INTO items SET ?";

    connection.query(sqlQuery, data, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(apiResponse(results));
        }
    });
});

app.put('/api/items/:id', (req, res) => {
    const sqlQuery = "UPDATE items SET title='" + req.body.title + "', body='" + req.body.body + "' WHERE id=" + req.params.id;

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send(apiResponse(results));
        }
    });
});

app.delete('/api/items/:id', (req, res) => {
    const sqlQuery = "DELETE FROM items WHERE id=" + req.params.id + "";

    connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});


