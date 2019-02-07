var mongoose = require("mongoose");
var express = require("express");
var route = express.Router();
var Registration = require('../schema/registration.schema')
var jwt = require('jsonwebtoken');
const encryptDecrypt = require('../db-config/EncryptDecrypt')
var checkJWT = require("../middleware/check.jwt.js")
route.post("/register", (req, resp) => {  
    Registration.findOne({ email: req.body.email }, (error, success) => {
        if (success) {
            resp.jsonp({
                success: true,
                message: "User already present"
            })
        } else {
         //   var encrptText = encryptDecrypt.encrypt(req.body.password);
            var registration = new Registration();
            registration.name = req.body.name;
            registration.email = req.body.email;
            registration.mobile = req.body.mobile;
        //    registration.password = encrptText.encryptedData;
        registration.password = req.body.password;
            registration.save();
            resp.jsonp({
                success: true,
                message: "User register successfully"
            })
        }
    })
})

route.post("/login", (req, resp) => {
  //  console.log("Print request ", req)
//  console.log("password :- ", req.body.password);
  var encrptText = encryptDecrypt.encrypt(req.body.password);
 // console.log("encrptText  password :- ", encrptText);
    Registration.findOne({
        email: req.body.email,
        password: req.body.password
      //  password: encrptText.encryptedData
    }, (error, Registration) => {
        if (Registration) {
            // resp.json({
            //     success: true,
            //     message: "User login successfully"
            // })

            var token = jwt.sign({
                Registration: Registration
            }, "123456");
            resp.jsonp({
                success: true,
                message: token
            })
        } else {
            resp.jsonp({
                success: true,
                message: "Invalid Login"
            })
        }
    })
})

route.post("/forgetpassword", (req, resp) => {
    Registration.findOne({
        email: req.body.email
    }, (error, Registration) => {
        if (Registration) {
            resp.json({
                success: true,
                message: "User available",
                data: Registration
            })
        } else {
            resp.jsonp({
                success: true,
                message: "User not found"
            })
        }
    })

})

route.put("/updatepassword/:id", (req, resp) => {
    Registration.update({ _id: req.params.id }, req.body, (err, Registration) => {
        if (err) {
            console.log('The error is ', err)
        }
        resp.json({
            success: true,
            message: "Password updated successfully"
        })
    })
})
module.exports = route;