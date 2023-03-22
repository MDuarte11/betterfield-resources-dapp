const hrd = require('hardhat');

async function run(smartContractAddress, lastId, pageSize) {
    console.log("HI")
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