const hrd = require('hardhat');

async function run(smartContractAddress, accountAddress) {
    const queuedForRegistration = await hrd.run("register", {
        smartcontractaddress: smartContractAddress,
        accountaddress: accountAddress
    });
    return queuedForRegistration
}

module.exports = {
  run
}