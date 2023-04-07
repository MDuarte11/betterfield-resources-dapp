const hrd = require('hardhat');

async function run(smartContractAddress, resourceId, lastId, pageSize) {
    const inspections = await hrd.run("get-inspections", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId,
        lastid: lastId,
        pagesize: pageSize
    });
    return inspections
}

module.exports = {
  run
}