import React from 'react';

const Sidebar = ({ channels, currentChannel, setCurrentChannel }) => {
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
      </ul>
    </div>
  );
};

export default Sidebar;
