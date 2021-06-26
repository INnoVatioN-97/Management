const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            id: 1,
            image: 'https://placeimg.com/64/64/1',
            name: '고영일',
            birthDay: '970603',
            gender: '남자',
            job: '대학생',
        },
        {
            id: 2,
            image: 'https://placeimg.com/64/64/2',
            name: '고영이',
            birthDay: '970604',
            gender: '남자',
            job: '프로그래머',
        },
        {
            id: 3,
            image: 'https://placeimg.com/64/64/3',
            name: '고영삼',
            birthDay: '970605',
            gender: '남자',
            job: '프로글래머',
        },
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
