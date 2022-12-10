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

contract Registry {
    RegistryDAO public registryDAO;
    GoodsAndRealEstate public goodsAndRealEstate;

    constructor(address registryDAOAddress, address ERC1155Address) {}

    //  function incorporate() {}
}
