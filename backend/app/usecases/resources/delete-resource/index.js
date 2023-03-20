const hrd = require('hardhat');

async function run(smartContractAddress, resourceId) {
    const resourceDeleted = await hrd.run("delete-resource", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId
    });
    return resourceDeleted === ""
}

module.exports = {
  run
}