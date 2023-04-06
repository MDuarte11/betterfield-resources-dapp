const hrd = require('hardhat');

async function run(smartContractAddress, resourceId, inspectionId) {
    const inspectionDeleted = await hrd.run("delete-inspection", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId,
        inspectionid: inspectionId
    });
    return inspectionDeleted === ""
}

module.exports = {
  run
}