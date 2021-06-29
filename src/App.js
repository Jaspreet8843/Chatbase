import Home from './components/home.js'
import Chat, { NameForm } from './components/chat.js'

function App() {
  return (
    <div>
      <Chat user={{sender: 'Jas', receiver: 'Man'}}/>
      <Chat user={{sender: 'Man', receiver: 'Jas'}}/>  
    
    </div>
  );
}

export default App;
