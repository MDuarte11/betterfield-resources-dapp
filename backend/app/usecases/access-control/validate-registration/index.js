const hrd = require('hardhat');

async function run(smartContractAddress, accountAddress) {
    const registrationValidated = await hrd.run("validate-registration", {
        smartcontractaddress: smartContractAddress,
        accountaddress: accountAddress
    });
    return registrationValidated
}

module.exports = {
  run
}