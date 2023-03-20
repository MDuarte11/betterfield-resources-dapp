const hrd = require('hardhat');

async function run(smartContractAddress, resourceId, resource) {
    const resourceAdded = await hrd.run("add-resource", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId,
        resource: JSON.stringify(resource)
    });
    return typeof resourceAdded !== "undefined"
}

module.exports = {
  run
}