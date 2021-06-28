import React, {useState,useEffect} from 'react';
import './chat.css';
//import ReactDOM from 'react-dom';

function Chat(props) {
    
    const [name, setName] = useState(props.user.name);
    const [count, setCount] = useState(props.user.data);
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const newCount = [...count,{id:1,text:name}];
        setCount(newCount);
        //console.log(count);
    }
    
    return (
        <div className="box">
            <div className="container">
                {name}
            </div> 
            {count.map(data => (
                <p>
                    {data.id} : {data.text}
                </p>
            ))}
            <div>
            <form onSubmit={handleSubmit}>
            <label>
            Frirst Name:
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            </label>
            <input type="submit" value="Submit" />
             </form>
        </div>
        </div>
      
    );
  }

export default Chat;