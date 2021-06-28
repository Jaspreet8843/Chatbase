import Home from './components/home.js'
import Chat, { NameForm } from './components/chat.js'
function App() {
  return (
    <div>
      <Chat user={{name: 'Jaspreet', data: [{id:1,text:'vc bvc tgds dg'},{id:1,text:'as ffa vcabc'},
            {id:2,text:'asad asf cdbc'},{id:1,text:'a bcd sfdfaf'},{id:2,text:'vcxvcx vxc'}]}}/>
    </div>
  );
}

export default App;
