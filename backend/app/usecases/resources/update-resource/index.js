const hrd = require('hardhat');

async function run(smartContractAddress, resourceId, resource) {
    const resourceUpdated = await hrd.run("update-resource", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId,
        resource: JSON.stringify(resource)
    });
    return resourceUpdated === JSON.stringify(resource)
}

module.exports = {
  run
}