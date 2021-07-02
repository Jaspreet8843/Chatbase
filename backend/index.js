const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const { table } = require("console");

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
    const sql = "insert into "+obj.table_name+" (msgId,sender,receiver,msg,time) values(?,?,?,?,?)";
    const values = [obj.msgId,obj.sender,obj.receiver,obj.msg,obj.time];
    db.query(sql,values,(err,result)=>{
        if(err){
            console.log(err);
        }
    });
    const d = new Date();
    const sql2 = "update userchatmap set lastupdate = ? where table_id = ?";
    const values2 = [d, obj.table_name];
    db.query(sql2,values2,(err,result)=>{
        if(err){
            console.log(err);
        }
    });

});

app.get("/chat",(req,res)=>{
    const table_name = req.query.table_name;
    const sql = "select * from "+table_name+" order by time asc";
    const values = [];
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

app.get("/chatlist", (req,res)=>{
    const username = req.query.user;
    const sql = "select user1, user2, table_id from userchatmap where (user1 = (?) or user2 = (?)) order by lastupdate desc";
    const values = [username, username];
    db.query(sql, values, (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    })

});
app.get("/receiver", (req,res)=>{
    const username = req.query.user;
    const table_id = req.query.table_id;
    const sql = "select * from userchatmap where table_id='"+table_id+"'";
    const values = [username];
    db.query(sql, values, (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            //console.log(result[0].user1, result[0].user2, username);
            if (username==result[0].user1){
                res.send(result[0].user2);
            }
            else{
                res.send(result[0].user1);
            }
            
        }
    })

});

app.post("/createchat",(req,res)=>{
    const user1 = req.body.touser;
    const user2 = req.body.curuser;
    console.log(user1,user2)
    const d = new Date();
    const dt= d.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const chatid = user1+user2;
    const sql1 = "insert into userchatmap values(?,?,?,?)";
    const values1 = [chatid,user1,user2,d]
    db.query(sql1, values1, (err, result) => {
        if (err){
            console.log(err);
        }
    })

    const sql2 = "create table "+chatid+" (msgID varchar(255), sender varchar(255), receiver varchar(255), msg varchar(4095), time datetime)";
    const values2 = [];
    db.query(sql2, values2, (err, result) => {
        if (err){
            console.log(err);
        }
    })
    
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