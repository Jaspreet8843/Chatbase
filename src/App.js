import Home from './components/home.js'
import Chat, { onChatChange } from './components/chat.js'
import Chatlist, { abc } from './components/chatlist.js';

import './App.css';


import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [chatId, setChatId] = useState('mnJas');
  const [username, setusername] = useState('Jas');
  return (
    <Router>
      <Switch>
    <div class="home">
    <Route exact path="/chats/:id">
        <div class="chatlist">
          <Chatlist username={username} setChatId={setChatId}/> 
        </div>
        <div class="chat">
        <Chat username={username} table_id={chatId}/>
        </div>
      </Route>
         
    </div>
    </Switch>
    </Router>
  );
}

export default App;
