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

const multer = require('multer');
const upload = multer({ dest: './upload' });

app.get('/api/customers', (req, res) => {
    connection.query('SELECT id, name, image, birthday, gender, job FROM CUSTOMER WHERE isDeleted = 0', (err, rows, fields) => {
        res.send(rows);
    });
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    /**
     * id: primary key, auto increment이므로 null
     * 그 외 이미지, 이름, 생일, 직업, 성별을 parameter로 받으므로 ?처리,
     * createdDate는 insert 당시의 현재 시간을 넣어야 하므로 now(),
     * isDeleted는 0으로 (삭제될 시 UPDATE문으로 1로 변경해 처리.)
     */
    let sql = 'INSERT CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    console.log('insert 동작중');
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });
});

app.delete('/api/customers/:id', (req, res) => {
    /**
     * 삭제를 한다고 실제로 DELETE FROM CUSTOMER ~~ 로 하지 않았음.
     * = 삭제 여부, 삭제 일시 등을 출력하기 위해 isDeleted에 1을 넣음으로
     * 고객리스트에서 출력하지 않고, 삭제된 고객을 따로 관리할 수 있게.
     */
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

//9:17부터 보기.
