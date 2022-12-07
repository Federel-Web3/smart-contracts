// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GoodsAndRealEstate is ERC1155 {
  uint256 public constant IMOVEL = 0;
  
  constructor() ERC1155("") {
  }

  function mint_imovel(bytes memory ipfs_hash) public {
    _mint(msg.sender, IMOVEL, 1, ipfs_hash);
  }
}
