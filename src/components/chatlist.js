import axios from 'axios';
import React, { Component, useEffect, useRef, useState } from 'react';
import './chatlist.css';


function Chatlist(props){
    const username=props.username;
    const [chats, setChats] = useState([]);
    const [msg, setMsg] = useState('');
    const base = "http://localhost:3001";
    const onButtonClick=(id)=>{
        props.setChatId(id);
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post(base + "/createchat", {
            touser: msg,
            curuser:username,

        }).then(() => {
            alert("success");
        });
    }
        useEffect(() => {
            axios.get(base + "/chatlist", {
                params: {
                    user: username,
                }}).then( response => {
                    setChats(response.data);
            });
        },[]);
    

    return(
        <div>
            <div>
            {chats.map(data => (
                <p><button value={data.table_id} onClick={()=>onButtonClick(data.table_id)}> {(data.user1==username)?data.user2:data.user1}</button>
                    <br></br>
                </p>
            ))}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter user name to chat" onChange={e => setMsg(e.target.value)}/>
                    <button type="submit">submit</button>
                </form>
            </div>
            
        </div>
    );

}

export default Chatlist;