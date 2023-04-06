const hrd = require('hardhat');

async function run(smartContractAddress, resourceId, inspectionId, inspection) {
    const inspectionAdded = await hrd.run("add-inspection", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId,
        inspectionid: inspectionId,
        inspection: JSON.stringify(inspection)
    });
    return typeof inspectionAdded !== "undefined"
}

module.exports = {
  run
}