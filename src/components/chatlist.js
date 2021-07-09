import axios from 'axios';
import React, { Component, useEffect, useRef, useState } from 'react';
import './chatlist.css';
import {baseUrl} from '../base';
import {useHistory} from 'react-router-dom';

function Chatlist(props) {
    const history = useHistory();
    const username = props.username;
    if(!username){
        history.push("/login");
    }
    const [chats, setChats] = useState([]);
    const [msg, setMsg] = useState('');
    const [tables, setTables] = useState([]);
    const base = baseUrl;
    const onButtonClick=(id)=>{
        props.setChatId(id);
    }

    useEffect(()=>{
        if (tables.length>0)
        {
            if(tables.includes(username+msg)||tables.includes(msg+username))
            {   
                props.setChatId(tables.includes(username+msg)?username+msg:msg+username);
            }
            else{
                console.log("tables: "+tables);
                axios.post(base + "/createchat", {
                    touser: msg,
                    curuser:username,
        
                }).then(() => {
                    alert("success");
                });
                alert("table created... refresh page to view changes");
            }

        }
        
    },[tables]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // axios.post(base + "/createchat", {
        //     touser: msg,
        //     curuser: username,

        // }).then(() => {
        //     alert("success");
        // });
        setTables(tables=>[...tables,msg]);
        chats.map(x=> {setTables(tables => [...tables,x.table_id])});
    }
    useEffect(() => {
        axios.get(base + "/chatlist", {
            params: {
                user: username,
            }
        }).then(response => {
            setChats(response.data);
        });
    }, []);

    const logout = ()=>{
        axios.get(base+"/logout").then(response =>{
            console.log(response.data)
            history.replace("/login");
        })
    };


    const nulldisplay =
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter user name to chat" onChange={e => setMsg(e.target.value)}/>
                    <button type="submit">Chat</button>
                </form>
            </div>;

    const chatdisplay = 
            <div>
            <h3>ChatBase : {username}</h3>
            <button onClick={logout} className="logoutBtn">Logout</button>
            <form onSubmit={handleSubmit} className="my-2">
                <input type="text" placeholder="Enter user name to chat" className="chatInput" onChange={e => setMsg(e.target.value)} /> 
                <button type="submit" className="chatBtn">Chat</button>
            </form>
            {chats.map(data => (
                <span><button className="chatUser" value={data.table_id} onClick={() => onButtonClick(data.table_id)}> {(data.user1 === username) ? data.user2 : data.user1}</button>
                    <br></br>
                </span>
            ))}
        </div>;          


    return (
        <div>    
        {chatdisplay}
        </div>
    );

}

export default Chatlist;