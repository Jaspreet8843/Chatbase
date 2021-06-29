import React, {useEffect, useRef, useState} from 'react';
import './chat.css';
//import ReactDOM from 'react-dom';
import Axios from 'axios';

import io from 'socket.io-client';
const socket = io("http://localhost:3001", { transports: ['websocket', 'polling', 'flashsocket'] });

function Chat(props) {
    
    const sender = props.user.sender;
    const receiver = props.user.receiver;
    const [msg,setMsg] = useState('');
    const [chats, setChats] = useState([]);
    const base = "http://localhost:3001";
    const messageRef = useRef();
    const textInput = React.useRef();
    const clearInput = () => (textInput.current.value = "");
    
    //scroll to bottom
    useEffect(() => {
        if (messageRef.current) {
          messageRef.current.scrollIntoView(
            {
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest'
            })
        }
      })
    //send message
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const msgId = sender + receiver + Date.now();
        const dt = new Date();
        const msgObj = {msgId:msgId,sender:sender,receiver:receiver,msg:msg,time:dt};
        const newChat = [...chats,msgObj];
        setChats(newChat);
        socket.emit('message',newChat);
        //console.log(msgObj);
        Axios.post(base+"/send",{
            userdata:msgObj,
        }).then(()=>{
            alert("success");
        });
    }
    
    //retrieve chats
    useEffect(()=>{
        Axios.get(base+"/chat").then(response=>{
            // console.log(response.data);
            setChats(response.data);
        });
        socket.on('message',(msgObj)=>{
            // console.log(msgObj);
            setChats(msgObj);
        })
    },[]);

    return (
        <div className="box">
            <div className="container">
                {receiver}
            </div> 
            <div class="messageData">
            {chats.map(data => (
                //<p>
                //    {data.msgId} : {data.msg}
                //</p>
               
                
                <p class={data.sender==receiver?"left":"right"} ref={messageRef}>
                    <div class="data">{data.msg} </div>
                    <div class="time">{data.time.toString().substring(11,16)}</div>
                    <span class="clear"></span>
                </p>
                
            ))}
            </div>
            <div class="messageCont">
            <form onSubmit={handleSubmit}>
            <label>
            <input
                ref={textInput}
                type="text"
                placeholder="type your message here"
                onChange={e => setMsg(e.target.value) }
            />
            </label>
            <input type="submit" value="Send" onClick={clearInput}/>
             </form>
        </div>
        </div>
      
    );
  }

export default Chat;


