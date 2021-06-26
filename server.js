const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

// DB 정보를 가져와 mysql연결
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});
connection.connect();

app.get('/api/customers', (req, res) => {
    connection.query('SELECT id, name, image, birthday, gender, job FROM CUSTOMER order by id asc', (err, rows, fields) => {
        res.send(rows);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
