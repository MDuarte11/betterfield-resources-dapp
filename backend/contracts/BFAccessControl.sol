// smart-contracts/BFAccessControl.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract BFAccessControl is AccessControl {
    // Users that want to register to the service
    mapping (address => bool) registeringUsers;
    // Currently registered users
    mapping (address => bool) users;

    constructor(address firstUser) {
        users[firstUser] = true;
    }

    // A public getter to check if an user is registered
    function getUser(address account) public view returns (bool) {
        return users[account];
    }

    // A public getter to check if an user is in the registration process
    function getRegisteringUser(address account) public view returns (bool) {
        return registeringUsers[account];
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
        registeringUsers[userAddress] = true;
    }

    // A publicly accessible function that takes an address to unregister an user by setting its active status to false,
    // but keeps the address for history purposes
    function unregister(address userAddress) onlyUsers public {
        require(users[userAddress], 'The provided account is not a current user to be unregistered.');
        users[userAddress] = false;
    }

    // A public function to let a current user accept an another account registration
    function validateRegistration(address userAddress) onlyUsers public {
        require(registeringUsers[userAddress], 'The provided account is not queued to be registered.');
        
        delete registeringUsers[userAddress];
        users[userAddress] = true;     
    }
}

