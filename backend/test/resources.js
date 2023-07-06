// Tests for the resources smart contract

require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;
const { expect } = require("chai");
const { smallResource, mediumResource, largeResource } = require('../test/mocks/resources')

const ABI_FILE_PATH = "artifacts/contracts/BFWriteResource.sol/BFWriteResource.json"
const DEPLOYED_SMART_CONTRACT_ADDRESS = "0x4A2E92D926fCCcf9cbDEA377c690fab82C74877B"

async function getAbi() {
    const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data)['abi'];
    return abi;
}

describe("Write small resource", function () {
    it("Small resource should be written", async function () {
        // Setup and check that address is neither as user or a registeringUser
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_resource_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        // DELETE Resource from previous tests if it exists
        const previousResource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        if(previousResource) {
            const delete_resource_transaction = await write_resource_contract.deleteResource("SMALL_RESOURCE_TEST_ID")
            await delete_resource_transaction.wait()
        }

        console.log(`Resource to write to the Blockchain: ${JSON.stringify(smallResource)}`)
        const add_resource_transaction = await write_resource_contract.addResource("SMALL_RESOURCE_TEST_ID", JSON.stringify(smallResource))
        await add_resource_transaction.wait()
        const resource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        console.log(`Resource saved on the Blockchain: ${resource}`)
        expect(resource === smallResource)
    })
})

describe("Write medium resource", function () {
    it("Medium resource should be written", async function () {
        // Setup and check that address is neither as user or a registeringUser
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_resource_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        // DELETE Resource from previous tests if it exists
        const previousResource = await write_resource_contract.getResource("MEDIUM_RESOURCE_TEST_ID")
        if(previousResource) {
            const delete_resource_transaction = await write_resource_contract.deleteResource("MEDIUM_RESOURCE_TEST_ID")
            await delete_resource_transaction.wait()
        }

        console.log(`Resource to write to the Blockchain: ${JSON.stringify(mediumResource)}`)
        const add_resource_transaction = await write_resource_contract.addResource("MEDIUM_RESOURCE_TEST_ID", JSON.stringify(mediumResource))
        await add_resource_transaction.wait()
        const resource = await write_resource_contract.getResource("MEDIUM_RESOURCE_TEST_ID")
        console.log(`Resource saved on the Blockchain: ${resource}`)
        expect(resource === mediumResource)
    })
})

describe("Write large resource", function () {
    it("Large resource should be written", async function () {
        // Setup and check that address is neither as user or a registeringUser
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_resource_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        // DELETE Resource from previous tests if it exists
        const previousResource = await write_resource_contract.getResource("LARGE_RESOURCE_TEST_ID")
        if(previousResource) {
            const delete_resource_transaction = await write_resource_contract.deleteResource("LARGE_RESOURCE_TEST_ID")
            await delete_resource_transaction.wait()
        }

        console.log(`Resource to write to the Blockchain: ${JSON.stringify(largeResource)}`)
        const add_resource_transaction = await write_resource_contract.addResource("LARGE_RESOURCE_TEST_ID", JSON.stringify(largeResource))
        await add_resource_transaction.wait()
        const resource = await write_resource_contract.getResource("LARGE_RESOURCE_TEST_ID")
        console.log(`Resource saved on the Blockchain: ${resource}`)
        expect(resource === largeResource)
    })
})

describe("Update small resource", function () {
    it("Small resource should be updated", async function () {
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_resource_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        let beforeUpdateResource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        if(!beforeUpdateResource) {
            const add_resource_transaction = await write_resource_contract.addResource("SMALL_RESOURCE_TEST_ID", JSON.stringify(smallResource))
            await add_resource_transaction.wait()
            beforeUpdateResource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        }

        let resourceToUpdate = smallResource
        resourceToUpdate.name = `${smallResource.name} - UPDATED`
        console.log(`Resource to update to the Blockchain: ${JSON.stringify(resourceToUpdate)}`)
        const update_resource_transaction = await write_resource_contract.updateResource("SMALL_RESOURCE_TEST_ID", JSON.stringify(resourceToUpdate))
        await update_resource_transaction.wait()
        const resource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        console.log(`Resource saved on the Blockchain: ${resource}`)
        expect(resource === resourceToUpdate)
        expect(resource !== beforeUpdateResource)
    })
})


describe("Update medium resource", function () {
    it("Medium resource should be updated", async function () {
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_resource_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        const beforeUpdateResource = await write_resource_contract.getResource("MEDIUM_RESOURCE_TEST_ID")
        if(!beforeUpdateResource) {
            const add_resource_transaction = await write_resource_contract.addResource("MEDIUM_RESOURCE_TEST_ID", JSON.stringify(mediumResource))
            await add_resource_transaction.wait()
            beforeUpdateResource = await write_resource_contract.getResource("MEDIUM_RESOURCE_TEST_ID")
        }

        let resourceToUpdate = mediumResource
        resourceToUpdate.name = `${mediumResource.name} - UPDATED`
        console.log(`Resource to update to the Blockchain: ${JSON.stringify(resourceToUpdate)}`)
        const update_resource_transaction = await write_resource_contract.updateResource("MEDIUM_RESOURCE_TEST_ID", JSON.stringify(resourceToUpdate))
        await update_resource_transaction.wait()
        const resource = await write_resource_contract.getResource("MEDIUM_RESOURCE_TEST_ID")
        console.log(`Resource saved on the Blockchain: ${resource}`)
        expect(resource === resourceToUpdate)
        expect(resource !== beforeUpdateResource)
    })
})

describe("Update large resource", function () {
    it("Large resource should be updated", async function () {
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_resource_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        const beforeUpdateResource = await write_resource_contract.getResource("LARGE_RESOURCE_TEST_ID")
        if(!beforeUpdateResource) {
            const add_resource_transaction = await write_resource_contract.addResource("LARGE_RESOURCE_TEST_ID", JSON.stringify(largeResource))
            await add_resource_transaction.wait()
            beforeUpdateResource = await write_resource_contract.getResource("LARGE_RESOURCE_TEST_ID")
        }

        let resourceToUpdate = largeResource
        resourceToUpdate.name = `${largeResource.name} - UPDATED`
        console.log(`Resource to update to the Blockchain: ${JSON.stringify(resourceToUpdate)}`)
        const update_resource_transaction = await write_resource_contract.updateResource("LARGE_RESOURCE_TEST_ID", JSON.stringify(resourceToUpdate))
        await update_resource_transaction.wait()
        const resource = await write_resource_contract.getResource("LARGE_RESOURCE_TEST_ID")
        console.log(`Resource saved on the Blockchain: ${resource}`)
        expect(resource === resourceToUpdate)
        expect(resource !== beforeUpdateResource)
    })
})

describe("Delete small resource", function () {
    it("Small resource should be deleted", async function () {
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_resource_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        let beforeUpdateResource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        if(!beforeUpdateResource) {
            const add_resource_transaction = await write_resource_contract.addResource("SMALL_RESOURCE_TEST_ID", JSON.stringify(smallResource))
            await add_resource_transaction.wait()
            beforeUpdateResource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        }

        console.log(`Resource to delete from the Blockchain: ${JSON.stringify(beforeUpdateResource)}`)
        const delete_resource_transaction = await write_resource_contract.deleteResource("SMALL_RESOURCE_TEST_ID")
        await delete_resource_transaction.wait()
        const resource = await write_resource_contract.getResource("SMALL_RESOURCE_TEST_ID")
        console.log(`Resource saved on the Blockchain: ${resource}`)
        expect(resource === undefined)
        expect(resource !== beforeUpdateResource)
    })
})


describe("Delete medium resource", function () {
    it("Medium resource should be deleted", async function () {
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_resource_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        const beforeUpdateResource = await write_resource_contract.getResource("MEDIUM_RESOURCE_TEST_ID")
        if(!beforeUpdateResource) {
            const add_resource_transaction = await write_resource_contract.addResource("MEDIUM_RESOURCE_TEST_ID", JSON.stringify(mediumResource))
            await add_resource_transaction.wait()
            beforeUpdateResource = await write_resource_contract.getResource("MEDIUM_RESOURCE_TEST_ID")
        }

        console.log(`Resource to delete from the Blockchain: ${JSON.stringify(beforeUpdateResource)}`)
        const delete_resource_transaction = await write_resource_contract.deleteResource("MEDIUM_RESOURCE_TEST_ID")
        await delete_resource_transaction.wait()
        const resource = await write_resource_contract.getResource("MEDIUM_RESOURCE_TEST_ID")
        console.log(`Resource saved on the Blockchain: ${resource}`)
        expect(resource === undefined)
        expect(resource !== beforeUpdateResource)
    })
})

describe("Delete large resource", function () {
    it("Large resource should be deleted", async function () {
        const {RPC_API_URL} = process.env
        let provider = ethers.getDefaultProvider(RPC_API_URL)
        const abi = await getAbi()

        const { WALLET_PRIVATE_KEY } = process.env
        let signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
        const write_resource_contract = new ethers.Contract(DEPLOYED_SMART_CONTRACT_ADDRESS, abi, signer)

        const beforeUpdateResource = await write_resource_contract.getResource("LARGE_RESOURCE_TEST_ID")
        if(!beforeUpdateResource) {
            const add_resource_transaction = await write_resource_contract.addResource("LARGE_RESOURCE_TEST_ID", JSON.stringify(largeResource))
            await add_resource_transaction.wait()
            beforeUpdateResource = await write_resource_contract.getResource("LARGE_RESOURCE_TEST_ID")
        }

        console.log(`Resource to delete from the Blockchain: ${JSON.stringify(beforeUpdateResource)}`)
        const delete_resource_transaction = await write_resource_contract.deleteResource("LARGE_RESOURCE_TEST_ID")
        await delete_resource_transaction.wait()
        const resource = await write_resource_contract.getResource("LARGE_RESOURCE_TEST_ID")
        console.log(`Resource saved on the Blockchain: ${resource}`)
        expect(resource === undefined)
        expect(resource !== beforeUpdateResource)
    })
})