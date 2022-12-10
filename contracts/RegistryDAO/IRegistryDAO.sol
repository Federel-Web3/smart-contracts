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

    /*
    Grants a role to a certain account, if it doesn't already have it
  */

    function proposeRole(
        bytes32 role,
        address roleReceiver,
        string memory description,
        string memory name,
        TypeOfProposal proposalType
    ) external;

    struct Proposal {
        uint256 id;
        string description;
        uint256 livePeriod;
        uint256 votesFor;
        uint256 votesAgainst;
        bool votingPassed;
        address roleReceiver;
        address proposer;
        string receiverName;
        bytes32 role;
        TypeOfProposal proposalType;
    }

    /*
    Vote for a proposal, if it is still votable and the account hasn't voted yet
  */

    function vote(uint256 proposalId, bool supportProposal) external;

    /*
    Execute a proposal, if it has passed
  */

    function execute(uint256 proposalId) external;

    /*
    Returns the minimum amount of votes required for a proposal to pass
  */

    function minVotesRequired() external view returns (uint256);

    /*
    Checks if a proposal is still votable
  */

    function votable(Proposal memory roposal) external;

    /*
    Revoke the role of overseer from the account that calls this function
  */
    function revokeSelf(bytes32 role) external;
}
