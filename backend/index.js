const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const port = 3001;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chatbase",
});

app.get("/",(req,res)=>{
    res.send("Backend from videochat..!!");
});

app.post("/send",(req,res)=>{
    const obj = req.body.userdata;
    const sql = "insert into messages(msgId,sender,receiver,msg,time) values(?,?,?,?,?)";
    const values = [obj.id,obj.sender,obj.receiver,obj.msg,obj.time];
    db.query(sql,values,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            //success
            console.log(result);
        }
    });

});

app.listen(port,()=>{
    console.log("Running express on port 3001");
});