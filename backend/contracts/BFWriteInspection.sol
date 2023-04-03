// smart-contracts/BFWriteInspection.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BFAccessControl.sol";
import "./BFWriteResource.sol";

contract BFWriteInspection {
    BFAccessControl access_control;
    BFWriteResource resources;
    mapping (string => mapping(string => string)) inspections;
    string[] inspectionIDs;

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
        inspectionIDs.push(inspectionID);
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

    function getInspection(string memory resourceID, string memory inspectionID) public view returns (string memory) {
        return inspections[resourceID][inspectionID];
    }
}