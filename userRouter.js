const express=require('express');
const router=express.Router();
const DbCon=require('./db');
const transporter=require('./smtp');
var mysql = require('mysql');

const singnUp=async (req,res) =>{

    console.log(req.body);

    var selectSql = "INSERT INTO users (name,email,password,balance) VALUES ("+mysql.escape(req.body['name'])+","+mysql.escape(req.body['email'])+ ","+mysql.escape(req.body['password'])+","+mysql.escape(req.body['balance'])+")";

    var getsql="select *from users ORDER BY id DESC LIMIT 1;";

    await DbCon.query(selectSql, function (err, result){
        if(result){
             DbCon.query(getsql, function (err, result){
                if(result){
                    console.log(result.body);
                    return res.send({
                        success: true,
                        data : result[0]

                    });
                }

            });
        }
    
    });

}


const login=async (req,res) =>{
    
    var selectSql = "SELECT * FROM users WHERE (email = "+mysql.escape(req.body['email'])+" AND password = "+mysql.escape(req.body['password'])+")";

    await DbCon.query(selectSql, function (err, result){

        if(result[0]){
            return res.send({
                success: true,
                data : result[0]

            });
        }
        else{
            return res.send({
                success: false,
                message : "wrong credential"

            });
        }
    
    });

}

const balanceUpdate=async (req,res) =>{

    var sql="UPDATE users SET balance = "+ mysql.escape(req.body['balance'])+ " WHERE id ="+mysql.escape(req.body['id'])
    console.log(sql)

   // var selectSql = "SELECT * FROM users WHERE (id = "+mysql.escape(req.body['id'])+")";

    await DbCon.query(sql, function (err, result){
        if(result){
            return res.send({
                success: true,
                data : req.body

            });
        }
        else{
            return res.send({
                success: false,
                message : "something went wrong"

            });
        }

    });

}


const sendEmail=async (req,res) =>{
    var mailOptions = {
        from: 'radee9999@gmail.com',
        to: req.body['email'],
        subject: 'Email verification code for Bankee',
        text: 'Your verification code is: 789456'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.send({
                success: false,
                data : "Something went wrong"

            });
        } else {
            return res.send({
                success: true,
                data : info.response

            });
        }
    });


}


router.route('/signup')
    .post(singnUp)
router.route('/login')
    .post(login)
router.route('/update_balance')
    .post(balanceUpdate)
router.route('/verify')
    .post(sendEmail)


module.exports=router;