var mongoose = require("mongoose");
var express = require("express");
var route = express.Router();
var Registration = require('../schema/registration.schema')

route.post("/register", (req, resp) => {
    Registration.findOne({ email: req.body.email }, (error, success) => {
        if (success) {
            resp.json({
                success: true,
                message: "User already present"
            })
        } else {
            var registration = new Registration();
            registration.name = req.body.name;
            registration.email = req.body.email;
            registration.mobile = req.body.mobile;
            registration.password = req.body.password;
            registration.save();
            resp.json({
                success: true,
                message: "User register successfully"
            })
        }
    })
})

route.post("/login", (req, resp) => {
    console.log("Print request ",  req)
    Registration.findOne({
        email: req.body.email,
        password: req.body.password
    }, (error, Registration) => {
        if (Registration) {
            resp.json({
                success: true,
                message: "User login successfully"
            })
        } else {
            resp.json({
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
                data:Registration
            })
        } else {
            resp.json({
                success: true,
                message: "User not found"
            })
        }
    })

})

route.put("/updatepassword/:id", (req, resp) => {
    Registration.update({_id : req.params.id},req.body,(err,Registration)=>{
        if(err){
            console.log('The error is ',err)
        }
        resp.json({
            success: true,
                message: "Password updated successfully"
        })
    })
})
module.exports = route;