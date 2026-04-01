import { useState, useEffect, useRef } from "react";
import "./App.css"
function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const BACKEND_URL = "https://christianmatchchatapp-production.up.railway.app"; 

  const fetchMessages = async () => {
    const res = await fetch(`${BACKEND_URL}/message`);
    const data = await res.json();
    setMessages(data.message);
  };

  const sendMessage = async () => {
    if (!username || !message) return;

    await fetch(`${BACKEND_URL}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, message })
    });

    setMessage("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2>💬 Chat App</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-row">
            <div className="chat-bubble">
              <div className="username">{msg.username}</div>
              <div>{msg.message}</div>
            </div>
          </div>
        ))}
          <div ref={bottomRef}></div>
      </div>

      <div className="inputs">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;