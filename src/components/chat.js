import React, {useState,useEffect} from 'react';
import './chat.css';
//import ReactDOM from 'react-dom';

function Chat(props) {
    
    const sender = props.user.sender;
    const receiver = props.user.receiver;
    const [msg,setMsg] = useState('');
    const [count, setCount] = useState(props.user.data);
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const newCount = [...count,{id:1,text:msg}];
        const msgId = sender + receiver + Date.now();
        const dt = new Date();
        const msgObj = {id:msgId,sender:sender,receiver:receiver,msg:msg,time:dt};
        setCount(newCount);
        console.log(msgObj);
    }
    
    return (
        <div className="box">
            <div className="container">
                {sender} to {receiver}
            </div> 
            {count.map(data => (
                <p>
                    {data.id} : {data.text}
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