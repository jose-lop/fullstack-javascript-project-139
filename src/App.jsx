import { useState, useEffect } from 'react'
import './App.css'
import useAuthStore from './store/authStore.js';
import { useNavigate } from 'react-router-dom';

function App({ socket }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
 
  useEffect(() => {
  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, {
      text: message.body,
      sender: 'other'
    }])
  }

  socket.on('newMessage', handleNewMessage)


  return () => {
    socket.off('newMessage', handleNewMessage)
  }
}, [socket])
  
  const handleSend = () => {
  if (!message.trim()) {
    return
  } 

  

  setMessages([...messages, {
    text: message,
    sender: 'me'
  }])

  socket.emit('newMessage', {
  body: message,
  channelId: '1',
  username: 'admin'
})

  setMessage('')
  }

  const handleLogout = () => {
  logout();
  navigate('/login');
};

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Chat App</h1>

        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main className="chat-messages">
        {messages.map((msg, index) => (
          <p
            className={`message-bubble ${msg.sender === 'me' ? 'my-message' : 'other-message'}`}
            key={index}
          >
            {msg.text}
          </p>
        ))}
      </main>

      <footer className="chat-footer">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSend()
            }
          }}
        />
        <button type="button" onClick={handleSend}>
           Enviar
        </button>
      </footer>
    </div>
  )
}

export default App