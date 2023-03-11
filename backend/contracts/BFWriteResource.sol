// smart-contracts/BFWriteResource.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BFAccessControl.sol";

contract BFWriteResource {
    BFAccessControl access_control;
    mapping (string => string) resources;

    constructor(address accessControlAddress) {
        access_control = BFAccessControl(accessControlAddress);
    }

    function addResource(string memory resourceID, string memory newResource) public {
        require(access_control.isUser(msg.sender), "To add a resource the sender must be a valid user.");
        require(keccak256(bytes(resources[resourceID])) == keccak256(bytes("")), "The resource for the provided ID already exists.");
        resources[resourceID] = newResource;
    }

    function updateResource(string memory resourceID, string memory updatedResource) public {
        require(access_control.isUser(msg.sender), "To add a resource the sender must be a valid user.");
        require(keccak256(bytes(resources[resourceID])) != keccak256(bytes("")), "The resource for the provided ID does not exist.");
        resources[resourceID] = updatedResource;
    }

    function deleteResource(string memory resourceID) public {
        require(access_control.isUser(msg.sender), "To add a resource the sender must be a valid user.");
        require(keccak256(bytes(resources[resourceID])) != keccak256(bytes("")), "The resource for the provided ID does not exist.");
        delete resources[resourceID];
    }

    function getResource(string memory resourceID) public view returns (string memory) {
        return resources[resourceID];
    }
}