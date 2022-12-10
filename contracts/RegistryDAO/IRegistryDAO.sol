// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (access/IRegistry.sol)

pragma solidity ^0.8.0;

/**
 * @dev External interface of RegistryDAO
 */
interface IRegistryDAO {
  enum TypeOfProposal {
    revoke,
    grant
  }

  event ProposalCreate(
    uint256 id,
    string description,
    uint256 livePeriod,
    uint256 votesFor,
    uint256 votesAgainst,
    bool votingPassed,
    address roleReceiver,
    address proposer,
    string receiverName,
    bytes32 role,
    TypeOfProposal proposalType
  );

  function proposeRole(
    bytes32 role,
    address roleReceiver,
    string memory description,
    string memory name,
    TypeOfProposal proposalType
  ) external;
}
