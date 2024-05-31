pragma solidity ^0.8.24;

contract ChainDiscourse {
  mapping(uint48 => string[]) public messages;

  constructor() {}

  function addMessage(uint48 _id, string memory _hash) public {
    messages[_id].push(_hash);
  }
}