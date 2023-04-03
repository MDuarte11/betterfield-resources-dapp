async function main() {
    const BFAccessControl = await ethers.getContractFactory("BFAccessControl");
 
    // Start deployment, returning a promise that resolves to a contract object
    const access_control = await BFAccessControl.deploy("0x92C5C193945EFD4bEd3fE46490792081E753Ef91");   
    console.log("Access Control contract deployed to address:", access_control.address);

    const BFWriteResource = await ethers.getContractFactory("BFWriteResource");
 
    // Start deployment, returning a promise that resolves to a contract object
    const write_resource = await BFWriteResource.deploy(access_control.address);   
    console.log("Write Resource contract deployed to address:", write_resource.address);

    const BFWriteInspection = await ethers.getContractFactory("BFWriteInspection");
 
    // Start deployment, returning a promise that resolves to a contract object
    const write_inspection = await BFWriteInspection.deploy(access_control.address, write_resource.address);   
    console.log("Write Inspection contract deployed to address:", write_inspection.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });