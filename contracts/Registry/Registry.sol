// contracts/Registry.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Registry
 * @author Pedro Henrique Bufulin de Almeida
 * @notice Esse contrato implementa as funções de incorporação dos bens.
 * Os bens são "mintados" no contrato GoodsAndRealEstate.sol e incorporados aqui.
 *
 * Esse contrato lida  também com a parte das concessões, aforramento,
 * transferência e outras operações jurídicas dos terrenos da SPU.
 * Os terrenos são representados no ERC1155 e os funcionários e tabeliões registrados no
 * RegistryDAO são capazes de editar ou criar representações dos contratos jurídicos do
 * mundo real neste contrato inteligente.
 */

import "../RegistryDAO/RegistryDAO.sol";
import "../ERC1155/GoodsAndRealEstate.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract Registry is ERC1155Holder {
  RegistryDAO public _registryDAO;
  GoodsAndRealEstate public _goodsAndRealEstate;

  struct Incorporation {
    uint256 lastId;
    address employee;
    address tabeliao;
    bool reverted;
    bool finished;
    uint256 previousId;
  }

  mapping(uint256 => Incorporation) _incorporations;

  constructor(address registryDAOAddress, address ERC1155Address) {
    _registryDAO = RegistryDAO(registryDAOAddress);
    _goodsAndRealEstate = GoodsAndRealEstate(ERC1155Address);
  }

  event IncorporateStart(uint256 indexed id, address incorporator);
  event IncorporateRevert(uint256 indexed id, address tabeliao);
  event IncorporateFinish(uint256 indexed id, address tabeliao);
  event IncorporateFinishUpdate(
    uint256 indexed id,
    uint256 indexed previousId,
    address tabeliao
  );

  /* @dev
    Checks if the account has the role of Employee
  */
  modifier onlyEmployee() {
    require(
      _registryDAO.hasRole(_registryDAO.getEmployeeRole(), msg.sender),
      "only employee allowed"
    );
    _;
  }

  modifier onlyTabeliao() {
    require(
      _registryDAO.hasRole(_registryDAO.getTabeliaoRole(), msg.sender),
      "only tabeliao allowed"
    );
    _;
  }

  modifier ableToFinish(uint256 id) {
    require(!_incorporations[id].reverted, "incorporation reverted");
    require(!_incorporations[id].finished, "incorporation finished already");

    require(
      _incorporations[id].employee != address(0),
      "incorporation not started"
    );
    _;
  }

  modifier ableToFinishSubstitution(uint256 id, uint256 previousId) {
    require(!_incorporations[id].reverted, "incorporation reverted");
    require(
      _incorporations[id].employee != address(0),
      "incorporation not started"
    );
    require(
      !_incorporations[previousId].reverted,
      "incorporation reverted for previousId"
    );
    require(
      _incorporations[previousId].finished,
      "previous incorporation not finished for previousId"
    );

    require(
      _incorporations[previousId].employee != address(0),
      "incorporation not started for previousId"
    );

    _;
  }

  function startIncorporation(uint256 id) public onlyEmployee {
    require(
      _incorporations[id].employee == address(0),
      "someone already started this incorporation"
    );

    _goodsAndRealEstate.safeTransferFrom(msg.sender, address(this), id, 1, "");
    Incorporation storage incorp = _incorporations[id];
    incorp.lastId = id;
    incorp.employee = msg.sender;

    emit IncorporateStart(id, msg.sender);
  }

  function revertIncorporation(uint256 id) public onlyTabeliao {
    require(!_incorporations[id].reverted, "incorporation already reverted");

    _goodsAndRealEstate.safeTransferFrom(address(this), msg.sender, id, 1, "");
    Incorporation storage incorp = _incorporations[id];
    incorp.tabeliao = msg.sender;
    incorp.reverted = true;
    emit IncorporateRevert(id, msg.sender);
  }

  function finishIncorporation(
    uint256 id
  ) public onlyTabeliao ableToFinish(id) {
    Incorporation storage incorp = _incorporations[id];
    incorp.tabeliao = msg.sender;
    incorp.finished = true;
    emit IncorporateFinish(id, msg.sender);
  }

  function finishIncorporationUpdate(
    uint256 id,
    uint256 previousId
  ) public onlyTabeliao ableToFinishSubstitution(id, previousId) {
    Incorporation storage incorp = _incorporations[id];
    incorp.tabeliao = msg.sender;
    incorp.previousId = previousId;
    incorp.finished = true;

    emit IncorporateFinishUpdate(id, previousId, msg.sender);
  }
}
