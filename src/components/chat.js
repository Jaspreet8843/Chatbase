import React, { useEffect, useRef, useState } from 'react';
import './chat.css';
import sendIcon from '../sendIcon.svg';
//import ReactDOM from 'react-dom';
import Axios from 'axios';

import io from 'socket.io-client';
const socket = io("http://localhost:3001", { transports: ['websocket', 'polling', 'flashsocket'] });

function Chat(props) {
    //const sender = props.user.sender;
    //const receiver = props.user.receiver;
    const username = props.username;
    const table_name = props.table_id;
    const [msg, setMsg] = useState('');
    const [chats, setChats] = useState([]);
    const [receiver, setReceiver] = useState('');
    const base = "http://localhost:3001";
    const messageRef = useRef();
    const textInput = React.useRef();
    const clearInput = () => (textInput.current.value = "");

    //retrieve chats
    useEffect(() => {
        //console.log(props);
        Axios.get(base + "/chat", {
            params: {
                table_name:table_name
            }
        }).then(response => {
            setChats(response.data);
        });

        //retrieve receiver from user chat map table
        Axios.get(base + "/receiver", {
            params: {
                user: props.username,
                table_id:table_name
            }
        }).then(response => {
            setReceiver(response.data);
            console.log(response.data);
        });


        socket.on('message', (msgObj) => {
             console.log(msgObj);
            setChats(msgObj);
        })
    }, [props]);

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
        const msgId = username + receiver + Date.now();
        const d = new Date();
        const dt= d.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const msgObj = {table_name:table_name, msgId: msgId, sender: username, receiver: receiver, msg: msg, time: d };
        const newChat = [...chats, msgObj];
        setChats(newChat);
        socket.emit('message', newChat);
        //console.log(msgObj);
        Axios.post(base + "/send", {
            userdata: msgObj,
        }).then(() => {
            alert("success");
        });
    }

    

    return (
        <div className="box">
            <div className="container">
                {receiver}
            </div>
            <div class="messageDataCont">
            <div class="messageData">
                {chats.map(data => (
                    //<p>
                    //    {data.msgId} : {data.msg}
                    //</p>


                    <p class={data.receiver == username ? "left" : "right"} ref={messageRef}>
                        <div class="data">{data.msg}</div>
                        <div class="time">{data.time.toString().substring(10,15)+data.time.toString().substring(18,20)}</div>
                        <span class="clear"></span>
                    
                    </p>

                ))}
            </div>
            </div>
            <div class="messageCont">
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            ref={textInput}
                            type="text"
                            placeholder="type your message here"
                            onChange={e => setMsg(e.target.value)}
                        />
                    </label>
    
                    <button type="submit" onClick={clearInput} src={sendIcon}><img src={sendIcon}></img></button>
                </form>
            </div>
        </div>

    );
}

export default Chat;


