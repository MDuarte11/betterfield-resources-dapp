const hrd = require('hardhat');
const geolib = require('geolib');

async function run(smartContractAddress, resourceId, resource) {
    let originalLocation = resource.location
    let formattedLocation = originalLocation
    if(originalLocation) {
      formattedLocation = convertCoordinatesToWGS84(originalLocation)
    }
    resource.location = formattedLocation
    const resourceAdded = await hrd.run("add-resource", {
        smartcontractaddress: smartContractAddress,
        resourceid: resourceId,
        resource: JSON.stringify(resource)
    });
    return typeof resourceAdded !== "undefined"
}

async function convertCoordinatesToWGS84(coordinates) {
  try {
    const convertedCoordinates = await geolib.getLatLon(coordinates);
    return convertedCoordinates;
  } catch (error) {
    console.error('Error converting coordinates to WGS84:', error);
    throw new Error('Failed to convert coordinates');
  }
}

module.exports = {
  run
}