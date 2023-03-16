const hrd = require('hardhat');

async function run(smartContractAddress, resourceId, resource) {
  console.log("NOBODY")
    const resourceAdded = await hrd.run("add-resource", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId,
        resource: JSON.stringify(resource)
    });
    console.log("LIBAD")
    return typeof resourceAdded !== "undefined"
}

module.exports = {
  run
}