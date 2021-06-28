import Home from './components/home.js'
import Chat, { NameForm } from './components/chat.js'
function App() {
  return (
    <div>
      <Chat user={{sender: 'Jaspreet', receiver: 'Manab'}}/>
    </div>
  );
}

export default App;
