async function main() {
    const BFAccessControl = await ethers.getContractFactory("BFAccessControl");
 
    // Start deployment, returning a promise that resolves to a contract object
    const access_control = await BFAccessControl.deploy("0x92C5C193945EFD4bEd3fE46490792081E753Ef91");   
    console.log("Contract deployed to address:", access_control.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });