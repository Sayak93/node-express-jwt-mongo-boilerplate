var express = require('express')
var UserModel = require('./models/user')
var app = express()
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var cors = require('cors')
var mongoose = require('mongoose')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.listen(3000)
app.use(cors())

// //mongodb connected through mongoose import
// const mongoose=require('mongoose');
// mongoose.Promise=global.Promise;
// mongoose.connect('mongodb://localhost:27017/boilerplate');

app.post('/signup', (req,res)=>{
    data = new UserModel(req.body)
    data.save().then(data=>{
        const token = jwt.sign(data.email, data.password);
        res.status(200).send({"message": "ok", "token":token, "role":data.role, "id":data.email})
    }).catch(e => {
		console.log(e)
		res.status(400).send({"message": "failed"})
	})
})
app.post('/login', (req,res)=>{
    UserModel.findOne({email:req.body.email,password:req.body.password})
    .exec()
    .then((user,err)=>{
        if(err){
            res.status(400).send({"message": "failed", "Error" : "User not found"})
        }
        else{
            const token = jwt.sign(user.email, user.password);
            res.status(200).send({"message":"ok", "token" : token, "role":user.role, "id":user.email})
        }
    })

})

//verify jwt for incoming http requests with

// token = req.headers.authorization;
// jwt.verify(token, data.password, function(err, decoded){}

