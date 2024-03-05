import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    setIsTyping(true);

    let msgs = [...chats];
    msgs.push({ role: 'user', content: message });
    setChats(msgs);

    setMessage('');

    fetch('https://mychatgtp-sgjn.onrender.com', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <main>
      <h1>Mi ChatGPT App</h1>
      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === 'user' ? 'user_msg' : ''}>
                <span>{chat.role}</span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ''}
      </section>

      <div className={isTyping ? '' : 'hide'}>
        <p>
          <i>{isTyping ? 'Escribiendo' : ''}</i>
        </p>
      </div>

      <form onSubmit={(e) => chat(e, message)}>
        <input
          type='text'
          name='message'
          value={message}
          placeholder='Escríbeme que necesitas'
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default App;
