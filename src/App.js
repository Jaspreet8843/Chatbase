import Home from './components/home.js'
import Chat, { NameForm } from './components/chat.js'

function App() {
  return (
    <div>
      <Chat user={{sender: 'Jaspreet', receiver: 'Manab'}}/>
      <Chat user={{sender: 'Manab', receiver: 'Jaspreet'}}/>
      
    </div>
  );
}

export default App;
