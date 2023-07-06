// Simple script to manually test the AccessControl smart contract registration process

require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;

const ABI_FILE_PATH = "artifacts/contracts/BFAccessControl.sol/BFAccessControl.json"
const DEPLOYED_SMART_CONTRACT_ADDRESS = "0x196a41b70E3b2d669201B67eA3bb64d6f45242f7"

async function getAbi() {
    const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data)['abi'];
    return abi;
}

describe("Register User", function () {
    it("User should be registered", async function () {
        // Setup and check that address is neither as user or a registeringUser
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const access_control_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        const isUserFromPreviousTests = await access_control_contract.getUser("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")
        if(isUserFromPreviousTests) {
            // Clear previous test data
            await access_control_contract.unregister("0x3E572A3E08A1d5f622518b88dbE39473cF753c51")
        }
        
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
    })
})