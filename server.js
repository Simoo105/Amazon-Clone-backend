const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/user');

const { request } = require('express');

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(err) {
            console.log(err)
        }else {
            console.log("Connected to the database");
        }
    }
);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json("hello amazon clone");
});

app.post("/", (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.save((err) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json('Successfully saved');
        }
    })
})

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    else{
        console.log('Listning on PORT', 3000);
    }
})