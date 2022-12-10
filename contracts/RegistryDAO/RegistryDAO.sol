// contracts/RegistryDAO.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title RegistryDAO
 * @author Pedro Henrique Bufulin de Almeida
 * @notice Esse contrato serve para autorizar quem tem
 * permissão de incorporar e propor incorporações no contrato
 * Registry.sol. Dessa forma, funcionários controlando endereços autorizados
 * podem fazer a incorporação e propor incorporações.
 */

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IRegistryDAO.sol";

abstract contract RegistryDAO is AccessControl, IRegistryDAO {
  bytes32 public constant OVERSEER_ROLE = keccak256("OVERSEER");
  bytes32 public constant EMPLOYEE_ROLE = keccak256("EMPLOYEE");
  bytes32 public constant TABELIAO_ROLE = keccak256("TABELIAO_ROLE");

  uint256 public _lastProposalId = 0;
  uint256 public _overseersAmount = 0;
  uint32 constant _minVotingPeriod = 1 weeks;
  uint16 constant _minRequiredDividend = 2;

  mapping(uint256 => Proposal) public _proposals;
  mapping(uint256 => mapping(address => bool)) public _overseerVotes;
  mapping(address => string) names;

  constructor(address[] memory overseers) {
    for (uint i; i < overseers.length; i++) {
      grantRole(OVERSEER_ROLE, overseers[i]);
    }
    _overseersAmount = overseers.length;
  }

  /*
    Checks if the account has the role of Overseer
  */
  modifier onlyOverseer() {
    require(hasRole(OVERSEER_ROLE, msg.sender), "only overseer allowed");
    _;
  }

  /*
    Grants a role to a certain account, if it doesn't already have it
  */

  function proposeRole(
    bytes32 role,
    address roleReceiver,
    string memory description,
    string memory name,
    TypeOfProposal proposalType
  ) public onlyOverseer {
    require(
      proposalType == TypeOfProposal.grant ||
        proposalType == TypeOfProposal.revoke,
      "invalid proposal type"
    );

    Proposal storage proposal = _proposals[_lastProposalId];
    proposal.id = _lastProposalId;
    proposal.description = description;
    proposal.livePeriod = _minVotingPeriod;
    proposal.proposalType = proposalType;
    proposal.proposer = msg.sender;
    proposal.receiverName = name;
    proposal.roleReceiver = roleReceiver;
    proposal.role = role;
    _lastProposalId += 1;
  }

  /*
    Vote for a proposal, if it is still votable and the account hasn't voted yet
  */ 
  function vote(uint256 proposalId, bool supportProposal) public onlyOverseer {
    Proposal storage proposal = _proposals[proposalId];

    votable(proposal);

    if (supportProposal) proposal.votesFor++;
    else proposal.votesAgainst++;

    _overseerVotes[proposalId][msg.sender] = true;
  }

  /*
    Execute a proposal, if it has passed
  */
  function execute(uint256 proposalId) public {
    Proposal storage proposal = _proposals[proposalId];

    require(
      proposal.votesFor >= minVotesRequired(),
      "The proposal does not have the required amount of votes to pass"
    );

    names[proposal.roleReceiver] = proposal.receiverName;

    if (uint8(proposal.proposalType) == uint8(TypeOfProposal.grant)) {
      grantRole(proposal.role, proposal.roleReceiver);
    }
    if (uint8(proposal.proposalType) == uint8(TypeOfProposal.revoke)) {
      revokeRole(proposal.role, proposal.roleReceiver);
    }
    if (proposal.role == OVERSEER_ROLE) {
      if (proposal.proposalType == TypeOfProposal.grant) {
        _overseersAmount += 1;
      }
      if (proposal.proposalType == TypeOfProposal.revoke) {
        _overseersAmount -= 1;
      }
    }
  }
  /*
    Returns the minimum amount of votes required to pass a proposal
  */
  function minVotesRequired() public view returns (uint256) {
    return _overseersAmount / _minRequiredDividend;
  }

  /*
    Checks if the proposal is still votable
  */
  function votable(Proposal storage proposal) private {
    if (proposal.votingPassed || proposal.livePeriod <= block.timestamp) {
      proposal.votingPassed = true;
      revert("Voting period has passed on this proposal");
    }
    if (_overseerVotes[proposal.id][msg.sender])
      revert("This stakeholder already voted on this proposal");
  }

  /*
    Revoke the role of overseer from the account that calls this function
  */
  function revokeSelf(bytes32 role) public {
    revokeRole(role, msg.sender);
    if (role == OVERSEER_ROLE) {
      _overseersAmount -= 1;
    }
  }
}
