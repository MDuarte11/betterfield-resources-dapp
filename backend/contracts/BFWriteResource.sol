// smart-contracts/BFWriteResource.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BFAccessControl.sol";

contract BFWriteResource {
    BFAccessControl access_control;
    mapping (string => string) resources;

    //Events
    event ResourceAdded(address indexed user, string resourceId, string resource);
    event ResourceUpdated(address indexed user, string resourceId, string oldResource, string updatedResource);
    event ResourceDeleted(address indexed user, string resourceId);

    constructor(address accessControlAddress) {
        access_control = BFAccessControl(accessControlAddress);
    }

    function addResource(string memory resourceID, string memory newResource) public {
        require(access_control.isUser(msg.sender), "To add a resource the sender must be a valid user.");
        require(keccak256(bytes(resources[resourceID])) == keccak256(bytes("")), "The resource for the provided ID already exists.");
        resources[resourceID] = newResource;
        emit ResourceAdded(msg.sender, resourceID, newResource);
    }

    function updateResource(string memory resourceID, string memory updatedResource) public {
        require(access_control.isUser(msg.sender), "To add a resource the sender must be a valid user.");
        require(keccak256(bytes(resources[resourceID])) != keccak256(bytes("")), "The resource for the provided ID does not exist.");
        string memory oldResource = resources[resourceID];
        resources[resourceID] = updatedResource;
        emit ResourceUpdated(msg.sender, resourceID, oldResource, updatedResource);
    }

    function deleteResource(string memory resourceID) public {
        require(access_control.isUser(msg.sender), "To add a resource the sender must be a valid user.");
        require(keccak256(bytes(resources[resourceID])) != keccak256(bytes("")), "The resource for the provided ID does not exist.");
        delete resources[resourceID];
        emit ResourceDeleted(msg.sender, resourceID);
    }

    function getResource(string memory resourceID) public view returns (string memory) {
        return resources[resourceID];
    }
}