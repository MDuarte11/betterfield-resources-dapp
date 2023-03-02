// smart-contracts/BFAccessControl.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract BFAccessControl is AccessControl {
    // Users that want to register to the service
    mapping (address => bool) registeringUsers;
    // Currently registered users
    mapping (address => bool) public users;

    constructor(address firstUser) {
        users[firstUser] = true;
    }

    modifier onlyUsers() {
        require(isUser(msg.sender), "Restricted to users.");
        _;
    }

    /// @dev Return `true` if the account belongs to the user role.
    function isUser(address account) public view returns (bool)
    {
        return users[account];
    }

    // A publicly accessible function that takes an address to start the registration process
    function register(address userAddress) public {
        registeringUsers[userAddress] = false;
    }

    function validateRegistration(address userAddress) onlyUsers public {
        registeringUsers[userAddress] = true;
        users[userAddress] = true;
    }
}

