const hrd = require('hardhat');

async function run(smartContractAddress, resourceId, inspectionId) {
    const inspection = await hrd.run("get-inspection", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId,
        inspectionid: inspectionId
    });
    return inspection
}

module.exports = {
  run
}