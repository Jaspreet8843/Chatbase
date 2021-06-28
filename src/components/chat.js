import React, {useState,useEffect} from 'react';
import './chat.css';
//import ReactDOM from 'react-dom';
import Axios from 'axios';

function Chat(props) {
    
    const sender = props.user.sender;
    const receiver = props.user.receiver;
    const [msg,setMsg] = useState('');
    const [chats, setChats] = useState([]);
    const base = "http://localhost:3001";
    
    //send message
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const msgId = sender + receiver + Date.now();
        const dt = new Date();
        const msgObj = {msgId:msgId,sender:sender,receiver:receiver,msg:msg,time:dt};
        const newChat = [...chats,msgObj];
        setChats(newChat);
        //console.log(msgObj);
        //send data by POST
        Axios.post(base+"/send",{
            userdata:msgObj,
        }).then(()=>{
            alert("success");
        });
    }
    
    //retrieve chats
    useEffect(()=>{
        console.log("response");
        Axios.get(base+"/chat").then(response=>{
            console.log(response.data);
            setChats(response.data);
        });
    },[]);

    return (
        <div className="box">
            <div className="container">
                {sender} to {receiver}
            </div> 
            {chats.map(data => (
                <p>
                    {data.msgId} : {data.msg}
                </p>
            ))}
            <div>
            <form onSubmit={handleSubmit}>
            <label>
            Message:
            <input
                type="text"
                hint="type your message here"
                onChange={e => setMsg(e.target.value)}
            />
            </label>
            <input type="submit" value="Submit" />
             </form>
        </div>
        </div>
      
    );
  }

export default Chat;