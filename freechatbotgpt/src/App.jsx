import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  organization: 'org-zvQgdrUrI0wqfaS1bmDWyVdf',
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

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
    scrollTo(0, 1e10);
    setMessage('');

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente para escribir código de programación',
          },
          ...chats,
        ],
        model: 'gpt-3.5-turbo',
      });
      const responseMessage = completion.choices[0].message.content;
      msgs.push({ role: 'assistant', content: responseMessage });
      setChats(msgs);
      setIsTyping(false);
      scrollTo(0, 1e10);
    } catch (error) {
      console.error(error);
    }
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
          <i>Escribiendo</i>
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
