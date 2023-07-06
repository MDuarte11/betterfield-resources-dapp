// Tests for the resources smart contract

require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;
const { expect } = require("chai");
const { inspection } = require('../test/mocks/inspections')
const { smallResource } = require('../test/mocks/resources')

const ABI_FILE_PATH = "artifacts/contracts/BFWriteInspection.sol/BFWriteInspection.json"
const RESOURCES_ABI_FILE_PATH = "artifacts/contracts/BFWriteResource.sol/BFWriteResource.json"
const DEPLOYED_SMART_CONTRACT_ADDRESS = "0xF1587bB8496fb83cbD588195746A02dFd9e3B40C"
const RESOURCES_DEPLOYED_SMART_CONTRACT_ADDRESS = "0x4A2E92D926fCCcf9cbDEA377c690fab82C74877B"

async function getAbi(abiFilePath) {
    const data = await fsPromises.readFile(abiFilePath, 'utf8');
    const abi = JSON.parse(data)['abi'];
    return abi;
}

describe("Write inspection for resource", function () {
    it("Inspection for resource should be written", async function () {
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi(ABI_FILE_PATH)
        const resourcesAbi = await getAbi(RESOURCES_ABI_FILE_PATH)

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_inspection_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)
        const write_resource_contract = new ethers.Contract(RESOURCES_DEPLOYED_SMART_CONTRACT_ADDRESS, resourcesAbi, signer)

        const previousResource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        if(!previousResource) {
            const add_resource_transaction = await write_resource_contract.addResource("SMALL_RESOURCE_TEST_ID", JSON.stringify(smallResource))
            await add_resource_transaction.wait()
        }

        // DELETE Inspection from previous tests if it exists
        const previousInspection = await write_inspection_contract.getInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID")
        if(previousInspection) {
            const delete_inspection_transaction = await write_inspection_contract.deleteInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID")
            await delete_inspection_transaction.wait()
        }

        console.log(`Inspection to write to the Blockchain: ${JSON.stringify(inspection)}`)
        const add_inspection_transaction = await write_inspection_contract.addInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID", JSON.stringify(inspection))
        await add_inspection_transaction.wait()
        const savedInspection = await write_inspection_contract.getInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID")
        console.log(`Inspection saved on the Blockchain: ${savedInspection}`)
        expect(savedInspection === inspection)
    })
})

describe("Update inspection for resource", function () {
    it("Inspection for resource should be updated", async function () {
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi(ABI_FILE_PATH)
        const resourcesAbi = await getAbi(RESOURCES_ABI_FILE_PATH)

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_inspection_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)
        const write_resource_contract = new ethers.Contract(RESOURCES_DEPLOYED_SMART_CONTRACT_ADDRESS, resourcesAbi, signer)

        const previousResource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        if(!previousResource) {
            const add_resource_transaction = await write_resource_contract.addResource("SMALL_RESOURCE_TEST_ID", JSON.stringify(smallResource))
            await add_resource_transaction.wait()
        }

        const previousInspection = await write_inspection_contract.getInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID")
        if(!previousInspection) {
            const add_inspection_transaction = await write_inspection_contract.addInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID", JSON.stringify(inspection))
            await add_inspection_transaction.wait()
        }

        let inspectionToUpdate = inspection
        inspectionToUpdate.conformity = "Validado"
        console.log(`Inspection to update to the Blockchain: ${JSON.stringify(inspectionToUpdate)}`)
        const update_inspection_transaction = await write_inspection_contract.updateInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID", JSON.stringify(inspectionToUpdate))
        await update_inspection_transaction.wait()
        const savedInspection = await write_inspection_contract.getInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID")
        console.log(`Inspection saved on the Blockchain: ${savedInspection}`)
        expect(savedInspection !== inspection)
        expect(savedInspection === inspectionToUpdate)
    })
})

describe("Delete inspection for resource", function () {
    it("Inspection for resource should be deleted", async function () {
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi(ABI_FILE_PATH)
        const resourcesAbi = await getAbi(RESOURCES_ABI_FILE_PATH)

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_inspection_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)
        const write_resource_contract = new ethers.Contract(RESOURCES_DEPLOYED_SMART_CONTRACT_ADDRESS, resourcesAbi, signer)

        const previousResource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        if(!previousResource) {
            const add_resource_transaction = await write_resource_contract.addResource("SMALL_RESOURCE_TEST_ID", JSON.stringify(smallResource))
            await add_resource_transaction.wait()
        }

        const previousInspection = await write_inspection_contract.getInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID")
        if(!previousInspection) {
            const add_inspection_transaction = await write_inspection_contract.addInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID", JSON.stringify(inspection))
            await add_inspection_transaction.wait()
        }


        console.log(`Inspection to delete from the Blockchain: ${JSON.stringify(inspection)}`)
        const delete_inspection_transaction = await write_inspection_contract.deleteInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID")
        await delete_inspection_transaction.wait()
        const savedInspection = await write_inspection_contract.getInspection("SMALL_RESOURCE_TEST_ID", "INSPECTION_TEST_ID")
        console.log(`Inspection saved on the Blockchain: ${savedInspection}`)
        expect(savedInspection !== inspection)
        expect(savedInspection === undefined)
    })
})