// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GoodsAndRealEstate is ERC1155 {
  uint256 public _id = 0;

  constructor() ERC1155("") {}

  event Mint(
    address indexed minter,
    uint256 indexed id,
    uint256 amount,
    bytes indexed ipfsHash
  );

  function mint(bytes memory ipfsHash) public {
    _mint(msg.sender, _id, 1, ipfsHash);
    emit Mint(msg.sender, _id, 1, ipfsHash);
    _id += 1;
  }
}
