// Simple script to manually test the AccessControl smart contract registration process

require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;

const ABI_FILE_PATH = "artifacts/contracts/BFAccessControl.sol/BFAccessControl.json"
const DEPLOYED_SMART_CONTRACT_ADDRESS = "0x3E572A3E08A1d5f622518b88dbE39473cF753c51" // Replace for deployed smart contract address

async function getAbi() {
    const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data)['abi'];
    return abi;
}

async function main() {
    // Setup and check that address is neither as user or a registeringUser
    const {API_URL} = process.env
    let provider = ethers.getDefaultProvider(API_URL)
    const abi = await getAbi()

    const { PRIVATE_KEY } = process.env
    let signer = new ethers.Wallet(PRIVATE_KEY, provider)
    const access_control_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

    const isUser = await access_control_contract.getUser("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")
    const isRegisteringUser = await access_control_contract.getRegisteringUser("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")
    console.log(`IS USER: ${isUser}`)
    console.log(`IS QUEUED: ${isRegisteringUser}`)

    // Queue address to be registered
    let register_transaction = await access_control_contract.register("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")
    await register_transaction.wait()
    const isUserAfterRegister = await access_control_contract.getUser("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")
    const isRegisteringUserAfterRegister = await access_control_contract.getRegisteringUser("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")
   
    // Check that address is not an user but it's a registeringUser
    console.log(`IS USER AFTER REGISTRATION REQUEST: ${isUserAfterRegister}`)
    console.log(`IS QUEUED AFTER REGISTRATION REQUEST: ${isRegisteringUserAfterRegister}`)

    // Accept address registration request
    let accept_registration_transaction = await access_control_contract.validateRegistration("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")
    await accept_registration_transaction.wait()
    const isUserAfterValidateRegistration = await access_control_contract.getUser("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")
    const isRegisteringUserAfterValidateRegistration = await access_control_contract.getRegisteringUser("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")

    // Check that address is an user and was removed from the queue
    console.log(`IS USER AFTER REGISTRATION VALIDATION: ${isUserAfterValidateRegistration}`)
    console.log(`IS QUEUED AFTER REGISTRATION VALIDATION: ${isRegisteringUserAfterValidateRegistration}`)
}
 
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });