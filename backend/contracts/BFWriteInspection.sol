// smart-contracts/BFWriteInspection.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BFAccessControl.sol";
import "./BFWriteResource.sol";

contract BFWriteInspection {
    BFAccessControl access_control;
    BFWriteResource resources;
    mapping (string => mapping(string => string)) inspections;
    mapping (string => string[]) inspectionIDs;

    //Events
    event InspectionAdded(address indexed user, string resourceId, string inspectionId, string inspection);
    event InspectionUpdated(address indexed user, string resourceId, string inspectionId, string oldInspection, string updatedInspection);
    event InspectionDeleted(address indexed user, string resourceId, string inspectionId);

    constructor(address accessControlAddress, address resourcesAddress) {
        access_control = BFAccessControl(accessControlAddress);
        resources = BFWriteResource(resourcesAddress);
    }

    function addInspection(string memory resourceID, string memory inspectionID, string memory newInspection) public {
        require(access_control.isUser(msg.sender), "To add an inspection the sender must be a valid user.");
        require(resources.resourceExists(resourceID), "The resource for the provided ID does not exist.");
        require(keccak256(bytes(inspections[resourceID][inspectionID])) == keccak256(bytes("")), "The inspection for the provided ID already exists.");
        inspections[resourceID][inspectionID] = newInspection;
        inspectionIDs[resourceID].push(inspectionID);
        emit InspectionAdded(msg.sender, resourceID, inspectionID, newInspection);
    }

    function updateInspection(string memory resourceID, string memory inspectionID, string memory updatedInspection) public {
        require(access_control.isUser(msg.sender), "To add an inspection the sender must be a valid user.");
        require(resources.resourceExists(resourceID), "The resource for the provided ID does not exist.");
        require(keccak256(bytes(inspections[resourceID][inspectionID])) != keccak256(bytes("")), "The inspection for the provided ID does not exist.");
        string memory oldInspection = inspections[resourceID][inspectionID];
        inspections[resourceID][inspectionID] = updatedInspection;
        emit InspectionUpdated(msg.sender, resourceID, inspectionID, oldInspection, updatedInspection);
    }

    function deleteInspection(string memory resourceID, string memory inspectionID) public {
        require(access_control.isUser(msg.sender), "To add an inspection the sender must be a valid user.");
        require(resources.resourceExists(resourceID), "The resource for the provided ID does not exist.");
        require(keccak256(bytes(inspections[resourceID][inspectionID])) != keccak256(bytes("")), "The inspection for the provided ID does not exist.");
        delete inspections[resourceID][inspectionID];
        for (uint i = 0; i < inspectionIDs[resourceID].length; i++) {
            if (keccak256(bytes(inspectionIDs[resourceID][i])) == keccak256(bytes(inspectionID))) {
                inspectionIDs[resourceID][i] = inspectionIDs[resourceID][inspectionIDs[resourceID].length - 1];
                inspectionIDs[resourceID].pop();
                break;
            }
        }
        emit InspectionDeleted(msg.sender, resourceID, inspectionID);
    }

    function getInspection(string memory resourceID, string memory inspectionID) public view returns (string memory) {
        return inspections[resourceID][inspectionID];
    }

    function getInspections(string memory resourceID, string memory lastID, uint8 pageSize) public view returns (string[] memory, string[] memory) {
        uint256 totalIDs = inspectionIDs[resourceID].length;
        uint256 startIdx = 0;
        if (bytes(lastID).length > 0) {
            for (uint256 i = 0; i < totalIDs; i++) {
                if (keccak256(bytes(inspectionIDs[resourceID][i])) == keccak256(bytes(lastID))) {
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
            resultKeys[i - startIdx] = inspectionIDs[resourceID][i];
            resultValues[i - startIdx] = inspections[resourceID][inspectionIDs[resourceID][i]];
        }
        return (resultKeys, resultValues);
    }
}