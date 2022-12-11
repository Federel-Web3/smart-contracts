// contracts/GoodsAndRealEstate.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RegistryDAO.sol";

contract Executor {
    RegistryDAO public _registryDAO;

    constructor(address registryDAOAddress) {
        _registryDAO = RegistryDAO(registryDAOAddress);
    }

    function execute(uint256 proposalId) public {
        _registryDAO.execute(proposalId);
    }
}
