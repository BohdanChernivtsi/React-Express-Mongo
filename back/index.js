require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const QUESTION_QUANTITY = require('./constants').QUESTION_QUANTITY



const { QuestionAnswer, QuestionName, UserModel } = require('./dbConnection').models;
const connectDB = require('./dbConnection').connectDb

const verifyJWT = (callback) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            callback()
        }
    });
}

const verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

connectDB().then(() => {
    console.log('Connected to db');
    app.get('/question/:id/:answer', (req, res) => {
        // verifyJWT(QuestionAnswer.findOne({ question_id: req.params.id })
        QuestionAnswer.findOne({ question_id: req.params.id })
            .then(data => {
                if (data.answer_number === Number(req.params.answer)) {
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
            // }))
    })

    app.get('/questions',  (req, res) => {
        // verifyJWT(QuestionName.countDocuments().exec((err, count) => {
        QuestionName.countDocuments().exec((err, count) => {
            let set = new Set()
            while (set.size < QUESTION_QUANTITY) {
                let num = Math.ceil(Math.random() * count) - 1
                set.add(num)
            }
            QuestionName.find({})
                .then(data => {
                    let resultArr = []
                    for (let key of set.keys()) {
                        resultArr.push(data[key])
                    }
                    res.send(resultArr)
                })
        })
        // }))
    })

    app.post('/login', (req, res) => {
        const { username, email } = req.body
        const newUser = new UserModel({ username, email })
        newUser.save((err) => {
            if (err) console.log(err);
            res.send(jwt.sign(req.body, 'expressJSKey'))
        });
    })

    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});