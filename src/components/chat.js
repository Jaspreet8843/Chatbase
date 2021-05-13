import React from 'react';
import './chat.css';
//import ReactDOM from 'react-dom';


const Chat= ({user}) => {  
    return(  
        <div className="box">
            <div className="container">
                {user.name}
            </div> 
            <div>
            {user.chat.forEach(element) => {
              return  {element}
            }
            }
            </div>
        </div>
    )
}


export default Chat;