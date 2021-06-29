const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const http = require('http').createServer(app);
const io = require('socket.io')(http);

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
    const values = [obj.msgId,obj.sender,obj.receiver,obj.msg,obj.time];
    db.query(sql,values,(err,result)=>{
        if(err){
            console.log(err);
        }
    });

});

app.get("/chat",(req,res)=>{
    const from = req.query.sender;
    const to = req.query.receiver;
    const sql = "select * from messages where (sender = (?) and receiver = (?)) or (sender = (?) and receiver = (?)) order by time asc";
    const values = [from,to,to,from];
    db.query(sql,values,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            //success
            res.send(result);
        }
    });
});

//realtime message sync
io.on('connection',socket=>{
    socket.on('message',msgObj=>{
        io.emit('message',msgObj)
    })
});

http.listen(port,()=>{
    console.log("Running express on port 3001");
});