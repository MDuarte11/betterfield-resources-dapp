const hrd = require('hardhat');

async function run(smartContractAddress, accountAddress) {
    const unregistered = await hrd.run("unregister", {
        smartcontractaddress: smartContractAddress,
        accountaddress: accountAddress
    });
    return unregistered
}

module.exports = {
  run
}