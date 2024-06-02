pragma solidity ^0.8.24;

contract ChainDiscourse {
  mapping(uint48 => string[]) public messages;
  Channel[] public channels;

  struct Channel {
    uint8 id;
    string name;
  }

  constructor() {}

  function getChannel() public view returns (Channel[] memory){
    return channels;
  }

  function addMessage(uint48 _id, string memory _hash) public {
    messages[_id].push(_hash);
  }

  function addChannel(uint8 _id, string memory _name) public {
    channels.push(Channel(_id, _name));
  }
}