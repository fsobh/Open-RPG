
import Web3 from "web3";
import AddressHolder from '../contracts/contracts.json'

export const commitTransaction = (props) =>

  new Promise(async (resolve, reject) => {
   
    if (!AddressHolder.Factory.Address || !AddressHolder.OpenRPG.Address || !AddressHolder.Oracle.Address)
        throw Error(`Contract Address NOT Detected -- check deployment Script`)

    //check authentication state
   if(props.account && props.authenticated && props.Protocal &&
     (typeof props.account === 'string' || 
     props.account instanceof String)){
        
        const web3 = new Web3('https://rinkeby.infura.io/v3/59ac0ae806124c318d91bd03d6520cfa'); 
      


        switch(props.Protocal){

            case 'metamask' : {

              if (!window || !window.ethereum)
                reject({Message : `No Injection Found` , code : 400})

                ///0xCe081338CC84FDe4f76b0d57054AcCf0E1eab784
                ///0x51112353073ca2Ef890d08f0dA123Cc1cAB73b07
                ///0x234094098889dAa77DE94E46af7382ba18e14C67
     
              
                const transactionParameters = {
                  to: AddressHolder.Factory.Address, // Required except during contract publications.
                  from: props.account, // must match user's active address.
                  
                  value: parseInt(Web3.utils.toWei("0.05", 'ether')).toString(16), // MAKE SURE TO CONVERT THIS TO HEX --- Only required to send ether to the recipient from the initiating external account.
                  data: web3.eth.abi.encodeFunctionCall(    
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        }
                      ],
                      "name": "Mint",
                      "outputs": [],
                      "stateMutability": "payable",
                      "type": "function"
                    },[props.account]
                ),
                  chainId: `0x${parseInt(props.network)}`, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
                };

 
                await window.ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [transactionParameters],
                }).then( (result) => {

                     resolve(result) 

                }).catch((error)=> reject({code :5503 , Message : `Rejected : ${error}`}))

                break
            }
            case 'walletconnect' : { 

              if(!props.Connector || !web3)
                reject({code : 4044, Message: "Provider not Found, Check your wallet connection or refresh the page & reconnect"})

            const customRequest = {
              id: 1337,
              jsonrpc: "2.0",
              method: "eth_sendTransaction",
              params: [
                {
                  to: AddressHolder.Factory.Address, // Required except during contract publications.
                  from: props.account, // must match user's active address. 
                  value: Web3.utils.toWei("0.05", 'ether'), // MAKE SURE TO CONVERT THIS TO HEX --- Only required to send ether to the recipient from the initiating external account.
                  
                  data: web3.eth.abi.encodeFunctionCall(    
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        }
                      ],
                      "name": "Mint",
                      "outputs": [],
                      "stateMutability": "payable",
                      "type": "function"
                    },[props.account]
                ),
                }
              ],
            };

              // Send transaction
              
                props.Connector.sendCustomRequest(customRequest)
                .then((result) => {
                  // Returns transaction id (hash)
                  resolve(result) 
                })
                .catch((error) => {
                  // Error returned when rejected
                  console.error(error);
                  reject({code :5503 , Message : `Rejected : ${error}`})
                });

              break
            }
            case 'trezor' : {

              try {
                
              console.log(props)
              const rawTx = {
                to: "0x234094098889dAa77DE94E46af7382ba18e14C67",
                value: parseInt(Web3.utils.toWei("0.05", 'ether')).toString(16),
                data: web3.eth.abi.encodeFunctionCall(    
                  {
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                      }
                    ],
                    "name": "Mint",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                  },[props.account]
              ),
                chainId: 1,
                nonce: web3.utils.toHex(props.trezorNonce),
                gasLimit: "0x5208",
                gasPrice: web3.utils.toHex(web3.eth.getGasPrice()),
              
                }

                props.Connector.ethereumSignTransaction({
                  path: "m/44'/60'/0'",
                  transaction: rawTx
              });
            } catch (error) {
              console.error(error)
            }

                break
            }
            case 'portis' : {

              if(!props.Connector || !web3)
                  reject({code : 4044, Message: "Provider not Found, Check your wallet connection or refresh the page & reconnect"})

              const rawTx = {
                  to: AddressHolder.Factory.Address,
                  from: props.account, 
                  value: parseInt(Web3.utils.toWei("0.05", 'ether')).toString(16), 
                  data: web3.eth.abi.encodeFunctionCall(    
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        }
                      ],
                      "name": "Mint",
                      "outputs": [],
                      "stateMutability": "payable",
                      "type": "function"
                    },[props.account]
                )
                  }

                  
                    
                     await props.Connector.currentProvider.send("eth_sendTransaction", [
                      rawTx
                    ]).then((result)=>{

                      resolve(result) 
                      
                    }).catch((err)=>{

                      console.error(err);
                      reject({code :5503 , Message : `Rejected : ${err}`})
                    })
 
                break
            }
            case 'coinbase' : {


              if(!props.Connector || !web3)
              reject({code : 4044, Message: "Provider not Found, Check your wallet connection or refresh the page & reconnect"})

              //CHANGE THIS TO DO WHAT PORTIS DOING
                        const rawTx = {
                  to: AddressHolder.Factory.Address,
                  from: props.account, 
                  value: parseInt(Web3.utils.toWei("0.05", 'ether')).toString(16), 
                  data: web3.eth.abi.encodeFunctionCall(    
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        }
                      ],
                      "name": "Mint",
                      "outputs": [],
                      "stateMutability": "payable",
                      "type": "function"
                    },[props.account]
                )
                  }

                     await props.Connector.send("eth_sendTransaction", [
                      rawTx
                    ]).then((result)=>{

                      resolve(result) 
                      
                    }).catch((err)=>{

                      console.error(err);
                      reject({code :5503 , Message : `Rejected : ${err}`})
                    })

            // Send transaction
            
              

            break

            }
            case 'formatic' : {

              if(!props.Connector || !web3)
              reject({code : 4044, Message: "Provider not Found, Check your wallet connection or refresh the page & reconnect"})

          const rawTx = {
              to: AddressHolder.Factory.Address,
              from: props.account, 
              value: Web3.utils.toWei("0.05", 'ether'), 
              data: web3.eth.abi.encodeFunctionCall(    
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                    }
                  ],
                  "name": "Mint",
                  "outputs": [],
                  "stateMutability": "payable",
                  "type": "function"
                },[props.account]
                )
            }

              
                
                 await props.Connector.eth.sendTransaction(rawTx,(error,txnHash)=>
                 {
                  if (error) 
                    reject({code :5503 , Message : `Rejected : ${error}`})

                  resolve(txnHash) 
                 })

                break
            }

            default :
                console.log("ass")


        }




    }




   
  });

export const getTotalCirculating = (set) => {



  const web3 = new Web3('https://rinkeby.infura.io/v3/59ac0ae806124c318d91bd03d6520cfa'); 
  const OpenRPGContract = new web3.eth.Contract(AddressHolder.OpenRPG.Abi, AddressHolder.OpenRPG.Address);
 
   OpenRPGContract.methods.totalSupply().call().then((val)=>{

      

      set(val)

    })
    
    
  
}

export const getCurrentMinted = (set) => {



  const web3 = new Web3('https://rinkeby.infura.io/v3/59ac0ae806124c318d91bd03d6520cfa'); 
  const OpenRPGContract = new web3.eth.Contract(AddressHolder.OpenRPG.Abi, AddressHolder.OpenRPG.Address);
 
   OpenRPGContract.methods.getCurrentlylyMintedBSO().call().then((val)=>{

     

      set(val)

    })
    
    
  
  }
  
