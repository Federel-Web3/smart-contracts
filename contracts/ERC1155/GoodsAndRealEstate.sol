// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GoodsAndRealEstate is ERC1155 {
  mapping(uint256 => bytes) public _immobiles;

  constructor() ERC1155("") {}

  event Mint(
    address indexed minter,
    uint256 indexed id,
    uint256 amount,
    bytes indexed ipfsHash
  );

  /**
   * @param cid_ ipfs content id
   * Essa função recebe o cid do ipfs e faz um mapeamento
   * dele para um valor de keccak256 dentro do contrato. Usamos uma conversão
   * de uma hash de bytes32 para um inteiro para manter a compatibilidade
   * com o padrão ERC1155 além de permitir a checagem de valores já !"mintados".
   *
   * This function receives the ipfs cid and maps it to it's keccak256 as an integer.
   * this is done in order to acheive compatibility with ERC1155 pattern and still be able
   * to check if the cid was already minted before
   */
  function mint(bytes memory cid_) public {
    uint256 id = uint256(keccak256(abi.encodePacked(cid_)));
    require(_immobiles[id].length == 0, "Immobile already exists");
    _immobiles[id] = cid_;
    _mint(msg.sender, id, 1, cid_);
    emit Mint(msg.sender, id, 1, cid_);
  }
}
