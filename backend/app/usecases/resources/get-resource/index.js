const hrd = require('hardhat');

async function run(smartContractAddress, resourceId) {
    const resource = await hrd.run("get-resource", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId
    });
    return resource
}

module.exports = {
  run
}