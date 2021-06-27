import React, {useState} from 'react';
import './chat.css';
//import ReactDOM from 'react-dom';





export function Chat(props) {
    const [name, setName] = useState("");
    const [count, setCount] = useState(props);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        count.user.data.
    }
    return (
        <div className="box">
            <div className="container">
                {count.user.name}
            </div> 
            {count.user.data.map(name => (
                <ul>
                <li>{name.text}</li>
                </ul>
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