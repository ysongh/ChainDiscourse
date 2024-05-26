import React, { useState } from 'react';

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ChainDiscourse Chat</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto my-4 p-4 bg-white rounded shadow">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 border-b border-gray-300">
            {messages.map((message) => (
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
  );
};

export default Chats;
