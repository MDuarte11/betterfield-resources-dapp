const hrd = require('hardhat');

async function run(smartContractAddress, resourceId, inspectionId, inspection) {
    const inspectionUpdated = await hrd.run("update-inspection", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId,
        inspectionid: inspectionId,
        inspection: JSON.stringify(inspection)
    });
    return inspectionUpdated === JSON.stringify(inspection)
}

module.exports = {
  run
}