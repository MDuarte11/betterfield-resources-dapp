// smart-contracts/BFAccessControl.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract BFAccessControl is AccessControl {
    // Users that want to register to the service
    mapping (address => bool) registeringUsers;
    // Currently registered users
    mapping (address => bool) public users;

    // A special function only run during the creation of the contract
    constructor(address firstUser) public {
        // Takes a string value and stores the value in the memory data storage area,
        // setting `message` to that value
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
        address from = msg.sender;
        registeringUsers[userAddress] = true;
        users[userAddress] = true;
    }
}

