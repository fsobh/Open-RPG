// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
require("dotenv").config()
const fs = require('fs');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled

try {
  



   await hre.run('compile');

  
  console.log('\x1b[36m',"\n\t\t>_ Deploying",'\x1b[33m',"Oracle",'\x1b[36m',"Contract")
  const Oracle = await hre.ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy(); // pass in the contract constructors arguments (uniswap router on rinkeby)
  const oracleDeployed = await oracle.deployed();
  const oracleAddress = oracleDeployed.address
  console.log("\x1b[36m","\n\t\t\t>_ Oracle deployed to:",'\x1b[33m', oracleAddress);



  console.log('\x1b[36m',"\n\t\t>_ Deploying",'\x1b[35m',"Open RPG",'\x1b[36m',"Contract")
  const OpenRPG = await hre.ethers.getContractFactory("OpenRPG");
  const openRPG = await OpenRPG.deploy(oracleAddress); // pass in the contract constructors arguments (uniswap router on rinkeby)
  const openRPGDeployed = await openRPG.deployed();
  const openRPGAddress = openRPGDeployed.address
  console.log("\x1b[36m","\n\t\t\t>_ Open RPG deployed to:",'\x1b[35m', openRPGAddress);



  console.log('\x1b[36m',"\n\t\t>_ Deploying",'\x1b[32m',"Factory ",'\x1b[36m',"Contract")
  const Factory = await hre.ethers.getContractFactory("Factory");
  const factory = await Factory.deploy(openRPGAddress,oracleAddress,"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"); // pass in the contract constructors arguments (uniswap router on rinkeby)
  const factoryDeployed = await factory.deployed();
  const factoryAddress = factoryDeployed.address
  console.log("\x1b[36m","\n\t\t\t>_ Factory deployed to:",'\x1b[32m', factoryAddress);




//set interfaces accodingly

  console.log(`\n\t\t`,'\x1b[43m \x1b[30m',`>_ Setting Oracle and OpenRPG Factory Interfaces  `,'\x1b[0m', `  `)
  await oracle.setFactory(factoryAddress);
  await openRPG.setFactory(factoryAddress);

  console.info(`\n\t\t`,'\x1b[46m \x1b[30m',`>_ Setting Oracle's OpenRPG Interface  `,'\x1b[0m', `  `)
  const OpenRpgABI =   require('../artifacts/contracts/OpenRPG.sol/OpenRPG.json').abi
  const OracleABI =   require('../artifacts/contracts/Oracle.sol/Oracle.json').abi
  const FactoryABI =   require('../artifacts/contracts/Factory.sol/Factory.json').abi

  let data = `{
    
    "Factory" : { 
        
        "Address" : "${factoryAddress}",
        
        "Abi" : ${JSON.stringify(FactoryABI)} 
      },
  
    "Oracle" : { 
      
        "Address" : "${oracleAddress}",

        "Abi"     : ${JSON.stringify(OracleABI)}
      
      },
  
    "OpenRPG" : { 
      
      "Address" : "${openRPGAddress}",

      "Abi"     : ${JSON.stringify(OpenRpgABI)}
    
    }
  
  
  }`;

  fs.writeFile('../Frontend/src/contracts/contracts.json', data,
  {
    encoding: "utf8",
    flag: "w",
    mode: 0o666
  },
  (err) => {
    if (err)
      console.log(err);
    else {
      console.log("Addresses written successfully\n");
      
    }
});
  await oracleDeployed.setOpenRPGInterface(openRPGAddress);

console.log("Job completed")


// send eth/link to contract


  



/*
  
  DONE - #1 Deploy oracle
  DONE - #2 Deploy OpenRPG (pass in oracle address as argument)
  DONE - #3 Deploy Factory (pass in Oracle, OpenRPG, and Uniswap router addresses)
  #4 Call transaction using same private key as deployer to the Oracle contract and set the Factory Address  (get from step 3)
  #5 Call transaction using same private key as deployer to the OpenRPG contract and set the Factory Address (get from step 3)
  #6 Fund Contract with eth
  #7 Should be ready!

  
  **/

  } catch (error) {
    
    console.log(error)
}

 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
