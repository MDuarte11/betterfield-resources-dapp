/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
var fs = require('fs');
const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;

const { API_URL, PRIVATE_KEY } = process.env;
const ACCESS_CONTROL_ABI_FILE_PATH = "artifacts/contracts/BFAccessControl.sol/BFAccessControl.json";

async function getAbi(abi_path) {
    const data = await fsPromises.readFile(abi_path, 'utf8');
    const abi = JSON.parse(data)['abi'];
    return abi;
}

task("register", "Starts the registration process of an account")
.addParam("smartcontractaddress", "The deployed AccessControl smart contract address")
.addParam("accountaddress", "The account address to be registered")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(ACCESS_CONTROL_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const access_control_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Queue address to be registered
   let register_transaction = await access_control_contract.register(taskArgs.accountaddress)
   await register_transaction.wait()
   const queuedForRegistration = await access_control_contract.getRegisteringUser(taskArgs.accountaddress)
   console.log(`Account queued for registration: ${queuedForRegistration}`)
});

task("unregister", "Unregisters an account")
.addParam("smartcontractaddress", "The deployed AccessControl smart contract address")
.addParam("accountaddress", "The account address to be unregistered")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(ACCESS_CONTROL_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const access_control_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Unregister an account
   let unregister_transaction = await access_control_contract.unregister(taskArgs.accountaddress)
   await unregister_transaction.wait()
   const accountUnregistered = await access_control_contract.getUser(taskArgs.accountaddress)
   console.log(`Account unregistered: ${!accountUnregistered}`)
});

task("validate-registration", "Validate a queued account of the registration process")
.addParam("smartcontractaddress", "The deployed AccessControl smart contract address")
.addParam("accountaddress", "The account address to be accepted as a new user")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(ACCESS_CONTROL_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const access_control_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Unregister an account
   let validate_registration_transaction = await access_control_contract.validateRegistration(taskArgs.accountaddress)
   await validate_registration_transaction.wait()
   const accountValidated= await access_control_contract.getUser(taskArgs.accountaddress)
   console.log(`Account validated: ${accountValidated}`)
});

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
