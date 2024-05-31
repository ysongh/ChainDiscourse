import React, { useState } from 'react';
import lighthouse from '@lighthouse-web3/sdk';

import Sidebar from '../components/Sidebar';
import { LIGHTHOUSE_APIKEY } from '../../keys';

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [channels] = useState([
    { id: 1, name: 'General' },
    { id: 2, name: 'Tech Talk' },
    { id: 3, name: 'Random' },
  ]);
  const [currentChannel, setCurrentChannel] = useState(channels[0]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      channel: currentChannel.id,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');

    const text = message;
    const apiKey = LIGHTHOUSE_APIKEY;
    const name = "test";

    const response = await lighthouse.uploadText(text, apiKey, name);
    console.log(response);
  };

  const filteredMessages = messages.filter(
    (message) => message.channel === currentChannel.id
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          channels={channels}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
        />
        <div className="flex-1 flex flex-col">
          <header className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">ChainDiscourse Chat</h1>
              <span className="text-xl">{currentChannel.name}</span>
            </div>
          </header>

          <main className="flex-1 container mx-auto my-4 p-4 bg-white rounded shadow">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 border-b border-gray-300">
                {filteredMessages.map((message) => (
                  <div key={message.id} className="mb-4">
                    <div className="text-sm text-gray-600">{message.timestamp}</div>
                    <div className="bg-blue-100 text-blue-900 p-2 rounded mt-1">
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex mt-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Chats;
