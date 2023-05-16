const { Web3Storage } = require('web3.storage')
const fileType = require('file-type')

const { WEB3_STORAGE_TOKEN } = process.env
const web3StorageClient = new Web3Storage({ token: WEB3_STORAGE_TOKEN });

async function run(inspectionName, itemName, mediaUrls) {
    const filename = `BF - ${inspectionName}: ${itemName}`
    const promises = mediaUrls.map(async (url) => {
        // Download file from URL
        const res = await fetch(url)
        const data = await res.arrayBuffer();
        const type = await fileType.fromBuffer(data);
        const options = { type: type ? type.mime : 'application/octet-stream' };
        const blob = new Blob([data], options)

        // Create random number to change blob hash and force a new CID to be returned
        const randomString = Math.random().toString(36).substring(7);
        const modifiedBlob = new Blob([blob], blob.options);
        modifiedBlob.lastModifiedDate = new Date();
        modifiedBlob.name = `${filename} - ${randomString}`;
        return modifiedBlob
    })

    const blobs = await Promise.all(promises)
    
    // Upload blobs and store CID
    const cid = await web3StorageClient.put(blobs, { name: filename })
    return cid
}

module.exports = {
    run
}