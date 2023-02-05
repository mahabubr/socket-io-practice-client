import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

function App() {

  const socket = io.connect('http://localhost:5000/')

  const [message, setMessage] = useState('')
  const [getMessage, setGetMessage] = useState('')
  const [room, setRoom] = useState('')

  const handleSend = () => {
    socket.emit("reactEvent", { message, room })
  }

  useEffect(() => {
    socket.on('showMessage', (data) => {
      setGetMessage(data.message)
    })
  }, [message, getMessage, socket])

  const handleRoom = () => {
    socket.emit('joinRoom', room)
  }

  return (
    <div>
      <div>
        <h1>R : {message}</h1>
        <h1>S : {getMessage}</h1>
      </div>
      <input onBlur={(e) => setRoom(e.target.value)} type="text" placeholder='Room' name="" id="" />
      <button onClick={handleRoom}>Join Room</button>
      <br />
      <input onBlur={(e) => setMessage(e.target.value)} type="text" placeholder='Message....' name="" id="" />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
