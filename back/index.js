require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const QUESTION_QUANTITY = require('./constants').QUESTION_QUANTITY



const {QuestionAnswer, QuestionName} = require('./dbConnection').models;
const connectDB = require('./dbConnection').connectDb


connectDB().then(() => {
    console.log('Connected to db');
    app.get('/question/:id/:answer', (req, res) => {
        QuestionAnswer.findOne({ question_id: req.params.id })
            .then(data => {
                if (data.answer_number === Number(req.params.answer)) {
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
    })

    app.get('/questions', (req, res) => {
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
    })

    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});