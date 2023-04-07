const hrd = require('hardhat');

async function run(smartContractAddress, lastId, pageSize) {
    const resources = await hrd.run("get-resources", {
        smartcontractaddress: smartContractAddress,
        lastid: lastId,
        pagesize: pageSize
    });
    return resources
}

module.exports = {
  run
}