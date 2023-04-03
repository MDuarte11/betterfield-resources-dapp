/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
var fs = require('fs');
const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;

const { API_URL, PRIVATE_KEY } = process.env;
const ACCESS_CONTROL_ABI_FILE_PATH = "artifacts/contracts/BFAccessControl.sol/BFAccessControl.json";
const WRITE_RESOURCE_ABI_FILE_PATH = "artifacts/contracts/BFWriteResource.sol/BFWriteResource.json";
const WRITE_INSPECTION_ABI_FILE_PATH = "artifacts/contracts/BFWriteInspection.sol/BFWriteInspection.json";

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
   return queuedForRegistration
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
   return !accountUnregistered
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

   // Validate an account
   let validate_registration_transaction = await access_control_contract.validateRegistration(taskArgs.accountaddress)
   await validate_registration_transaction.wait()
   const accountValidated= await access_control_contract.getUser(taskArgs.accountaddress)
   console.log(`Account validated: ${accountValidated}`)
   return accountValidated
});

task("add-resource", "Add a resource")
.addParam("smartcontractaddress", "The deployed WriteResource smart contract address")
.addParam("resourceid", "Resource's ID")
.addParam("resource", "Resource's JSON")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(WRITE_RESOURCE_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const write_resource_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Test
   let write_transaction = await write_resource_contract.addResource(taskArgs.resourceid, taskArgs.resource)
   await write_transaction.wait()
   let returned_resource = await write_resource_contract.getResource(taskArgs.resourceid)
   return returned_resource
});

task("get-resource", "Get a resource")
.addParam("smartcontractaddress", "The deployed WriteResource smart contract address")
.addParam("resourceid", "Resource's ID")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(WRITE_RESOURCE_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const write_resource_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Test
   const returned_resource = await write_resource_contract.getResource(taskArgs.resourceid)
   console.log(`Resource: ${JSON.stringify(returned_resource)}`)
   return returned_resource
});

task("get-resources", "Get multiple resources")
.addParam("smartcontractaddress", "The deployed WriteResource smart contract address")
.addParam("lastid", "Last retrieved resource's ID")
.addParam("pagesize", "The pagination's page size")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(WRITE_RESOURCE_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const write_resource_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Test
   const returned_resources = await write_resource_contract.getResources(taskArgs.lastid, taskArgs.pagesize)
   console.log(`Resources: ${JSON.stringify(returned_resources)}`)
   return returned_resources
});

task("update-resource", "Update a resource")
.addParam("smartcontractaddress", "The deployed WriteResource smart contract address")
.addParam("resourceid", "Resource's ID")
.addParam("resource", "Resource's JSON")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(WRITE_RESOURCE_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const write_resource_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Test
   const update_resource_transaction = await write_resource_contract.updateResource(taskArgs.resourceid, taskArgs.resource)
   await update_resource_transaction.wait()
   let returned_resource = await write_resource_contract.getResource(taskArgs.resourceid)
   return returned_resource
});

task("delete-resource", "Delete a resource")
.addParam("smartcontractaddress", "The deployed WriteResource smart contract address")
.addParam("resourceid", "Resource's ID")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(WRITE_RESOURCE_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const write_resource_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Test
   const delete_resource_transaction = await write_resource_contract.deleteResource(taskArgs.resourceid)
   await delete_resource_transaction.wait()
   let returned_resource = await write_resource_contract.getResource(taskArgs.resourceid)
   return returned_resource
});

task("add-inspection", "Add an inspection")
.addParam("smartcontractaddress", "The deployed WriteInspection smart contract address")
.addParam("resourceid", "Resource's ID")
.addParam("inspectionid", "Inspection's ID")
.addParam("inspection", "Inspection's JSON")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(WRITE_INSPECTION_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const write_inspection_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Test
   let write_transaction = await write_inspection_contract.addInspection(taskArgs.resourceid, taskArgs.inspectionid, taskArgs.inspection)
   await write_transaction.wait()
   let returned_inspection = await write_inspection_contract.getInspection(taskArgs.resourceid, taskArgs.inspectionid)
   return returned_inspection
});

task("get-inspection", "Get an inspection")
.addParam("smartcontractaddress", "The deployed WriteInspection smart contract address")
.addParam("resourceid", "Resource's ID")
.addParam("inspectionid", "Inspection's ID")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(WRITE_INSPECTION_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const write_inspection_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Test
   const returned_inspection = await write_inspection_contract.getInspection(taskArgs.resourceid, taskArgs.inspectionid)
   console.log(`Inspection: ${JSON.stringify(returned_inspection)}`)
   return returned_inspection
});

task("update-inspection", "Update an inspection")
.addParam("smartcontractaddress", "The deployed WriteInspection smart contract address")
.addParam("resourceid", "Resource's ID")
.addParam("inspectionid", "Inspection's ID")
.addParam("inspection", "Inspection's JSON")
.setAction(async (taskArgs) => {
   // Setup
   const {API_URL} = process.env
   let provider = ethers.getDefaultProvider(API_URL)
   const abi = await getAbi(WRITE_INSPECTION_ABI_FILE_PATH)

   const { PRIVATE_KEY } = process.env
   let signer = new ethers.Wallet(PRIVATE_KEY, provider)
   const write_inspection_contract = new ethers.Contract(taskArgs.smartcontractaddress, abi, signer)

   // Test
   const update_inspection_transaction = await write_inspection_contract.updateInspection(taskArgs.resourceid, taskArgs.inspectionid, taskArgs.inspection)
   await update_inspection_transaction.wait()
   let returned_inspection = await write_inspection_contract.getInspection(taskArgs.resourceid, taskArgs.inspectionid)
   return returned_inspection
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
