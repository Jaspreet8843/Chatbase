import Home from './components/home.js'
import Chat, { onChatChange } from './components/chat'
import Chatlist, { abc } from './components/chatlist';
import Login from './components/login/login';
import Register from './components/register/register';
import Axios from 'axios';
import './App.css';
import { baseUrl } from './base.js';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

function App() {
  const [chatId, setChatId] = useState('DEFAULT');
  const [username, setusername] = useState(null);
  Axios.defaults.withCredentials = true;
  let history = useHistory();

  useEffect(() => {
        Axios.get(baseUrl+"/login").then((response) => {
          if (response.data.loggedIn == true) {
            console.log(response.data);
            setusername(response.data.user[0].username);
          }
        });
  }, []);

  // if(!username){
  //   return(
  //     <Router>
  //       <Switch>
  //       <div className="container-fluid row m-0 p-0">
  //         <Route exact path="/">
  //           <Login setusername={setusername}/>
  //         </Route>
  //         </div>
  //       </Switch>
  //     </Router>
  //   )
  // }

  return (
    <Router>
      <Switch>
        <div className="container-fluid row m-0 p-0">
          <Route exact path="/register">
            <Register setusername={setusername} />
          </Route>
          <Route exact path="/login">
            <Login setusername={setusername}/>
          </Route>
          <Route exact path="/">
              <div class="chatlist col-md-4 mt-2">
                <Chatlist username={username} setChatId={setChatId} />
              </div>
              <div class="chat col-md-8 mt-2">
                <Chat username={username} table_id={chatId} />
              </div>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
