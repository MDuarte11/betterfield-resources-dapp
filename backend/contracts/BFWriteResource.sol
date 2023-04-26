// smart-contracts/BFWriteResource.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BFAccessControl.sol";

contract BFWriteResource {
    BFAccessControl access_control;
    mapping (string => string) resources;
    string[] resourceIDs;

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
        resourceIDs.push(resourceID);
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
        for (uint i = 0; i < resourceIDs.length; i++) {
            if (keccak256(bytes(resourceIDs[i])) == keccak256(bytes(resourceID))) {
                resourceIDs[i] = resourceIDs[resourceIDs.length - 1];
                resourceIDs.pop();
                break;
            }
        }
        emit ResourceDeleted(msg.sender, resourceID);
    }

    function getResource(string memory resourceID) public view returns (string memory) {
        return resources[resourceID];
    }

    function getResources(string memory lastID, uint8 pageSize) public view returns (string[] memory, string[] memory, uint256) {
        uint256 totalIDs = resourceIDs.length;
        uint256 startIdx = 0;
        if (bytes(lastID).length > 0) {
            for (uint256 i = 0; i < totalIDs; i++) {
                if (keccak256(bytes(resourceIDs[i])) == keccak256(bytes(lastID))) {
                    startIdx = i + 1;
                    break;
                }
            }
        }
        uint256 endIdx = startIdx + pageSize;
        if (endIdx > totalIDs) {
            endIdx = totalIDs;
        }
        uint256 resultSize = endIdx - startIdx;
        string[] memory resultKeys = new string[](resultSize);
        string[] memory resultValues = new string[](resultSize);
        for (uint256 i = startIdx; i < endIdx; i++) {
            resultKeys[i - startIdx] = resourceIDs[i];
            resultValues[i - startIdx] = resources[resourceIDs[i]];
        }
        return (resultKeys, resultValues, totalIDs);
    }

    function resourceExists(string memory resourceID) public view returns (bool) {
        return keccak256(bytes(resources[resourceID])) != keccak256(bytes(""));
    }

}