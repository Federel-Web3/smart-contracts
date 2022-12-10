// contracts/Registry.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Registry
 * @author Pedro Henrique Bufulin de Almeida
 * @notice Esse contrato implementa as funções de incorporação dos bens.
 * Os bens são "mintados" no contrato GoodsAndRealEstate.sol e incorporados aqui.
 * Nesse contrato, é possível fazer cessão de uso, aforramento, Autorização de uso,
 * transferência e autorização.
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
        bool tabeliaoVote;
        bool employeeVote;
        uint256[] previousRevision;
    }

    mapping(uint256 => Incorporation) _incorporations;

    constructor(address registryDAOAddress, address ERC1155Address) {
        _registryDAO = RegistryDAO(registryDAOAddress);
        _goodsAndRealEstate = GoodsAndRealEstate(ERC1155Address);
    }

    event IncorporateStart(uint256 indexed id, address incorporator);

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
            _registryDAO.hasRole(_registryDAO.gaetTabeliaoRole(), msg.sender),
            "only tabeliao allowed"
        );
        _;
    }

    function incorporateStart(uint256 id) public onlyEmployee {
        _goodsAndRealEstate.safeTransferFrom(
            msg.sender,
            address(this),
            id,
            1,
            ""
        );
        Incorporation storage incorp = _incorporations[id];
        incorp.lastId = id;
        incorp.employee = msg.sender;

        emit IncorporateStart(id, msg.sender);
    }

    //     function revert(uint256 id) public onlyEmployee {
    //     _goodsAndRealEstate.safeTransferFrom(
    //         msg.sender,
    //         address(this),
    //         id,
    //         1,
    //         ""
    //     );
    //     Incorporation storage incorp = _incorporations[id];
    //     incorp.lastId = id;
    //     incorp.employee = msg.sender;

    //     emit IncorporateStart(id, msg.sender);
    // }
}
