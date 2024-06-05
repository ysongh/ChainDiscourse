import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ channels, currentChannel, setCurrentChannel }) => {
  const change = useNavigate();

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li
            key={channel.id}
            className={`mb-2 p-2 rounded cursor-pointer ${
              currentChannel.id === channel.id ? 'bg-gray-600' : 'bg-gray-700'
            }`}
            onClick={() => setCurrentChannel(channel)}
          >
            {channel.name}
          </li>
        ))}
        <li>
          <button
            className="px-4 py-2 text-white bg-gray-600 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => change('/create-space')}
            >
           + Create Space
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
