import ConnectWalletIconswallet from '../../../assets/img/icons/wallet.png';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { whoWeData } from '../../../data/data-containers/data-whoWe.js';
import {
  setAllBlockChainData,
  setAccount,
  setNetwork
} from '../../../Reducers/Actions/BlockChain';
import React from 'react';
//imports for wallets
import getWeb3 from '../../../utils/getWeb3';
import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnect from '@walletconnect/client';
import Fortmatic from 'fortmatic';
import TrezorConnect, {DEVICE_EVENT,DEVICE} from 'trezor-connect';
import WalletLink from 'walletlink'
import Portis from '@portis/web3';
import Web3 from 'web3'
import { toast ,ToastContainer} from 'react-toastify';


const FeaturesList = (props) => {
  const ETH_PATH = `m/44'/60'/0'/0/0`
  const [pend, setPending] = React.useState(false);
  const [reject, setRejected] = React.useState(false);
  const [noWeb3, setWeb3NotDetected] = React.useState(false);
  const [loading, setLoading] = React.useState({state : false, wallet : ''});
  const [anyError, setError] = React.useState({state : false, error : ''});
//Connect and listener functions for wallets

//Portis functions
const listenPortisAccount = async (portis,web3) => {
  try {

 portis.onError(error => {
      console.log('error', error);
   
    });
    
    portis.onLogin(async (walletAddress, email, reputation) => {
      
      console.log(walletAddress, email, reputation);

      props.onAcountChange(walletAddress, true, "portis",web3.eth)

      const network = await web3.eth.getChainId()

      if (network !== 1 && network !== 4) {
        //must be on mainnet or Testnet
        props.onNetworkChange(network, false, "portis",web3.eth);
      }
      else
        web3.eth.getChainId().then((id)=> props.onNetworkChange(id, true, "portis",web3.eth));

        
    })

    portis.onLogout(() => {
      
      props.onAcountChange(false, false,false,false);
      props.onNetworkChange(false, false,false,false);
    });

    
    
    portis.onActiveWalletChanged(async walletAddress => {

      props.onAcountChange(walletAddress, true, "portis",web3.eth)

      const network = await web3.eth.getChainId()

      if (network !== 1 && network !== 4) {
        //must be on mainnet or Testnet
        props.onNetworkChange(network, false, "portis",web3.eth);
      }
      else
        web3.eth.getChainId().then((id)=> props.onNetworkChange(id, true, "portis",web3.eth));
    })

  } catch (error) {
    console.log('error', error);
    
  }



}

async function connectPortis(disconnect = false) {
  try {
   

      
    const portis = new Portis('74a7ec07-631d-4579-93d1-7bfa6b1a2e03', 'rinkeby');
    const web3 = new Web3(portis.provider);

    if(web3 && web3.eth){

      if (disconnect && props.authenticated && (await portis.isLoggedIn()).result){

        await portis.logout()

        props.onAcountChange(false, false,false);
        props.onNetworkChange(false, false,false);
      
    }
      

      web3.eth.getAccounts().then(async(accounts)=> {
       

        if(accounts && accounts[0])
        {

        props.onAcountChange(accounts[0], true, "portis",web3.eth)
        const network = await web3.eth.getChainId()
        
        
        if (network !== 1 && network !== 4) {
          //must be on mainnet or Testnet
          props.onNetworkChange(network, false, "portis",web3.eth);
        }
        else
          web3.eth.getChainId().then((id)=> props.onNetworkChange(id, true, "portis",web3.eth));
  
       
        await listenPortisAccount(portis,web3)
  
      window.addEventListener("beforeunload", async (ev) => {
      
        await portis.logout()
  
        props.onAcountChange(false, false,false,false);
        props.onNetworkChange(false, false,false,false);
        
      });
        
        
        }
    
    
      })

    }


  } catch (error) {
    
  }

}

  //Formatic
async function connectFormatic(disconnect = false) {
  try {
    setLoading({state:true,wallet:'Formatic'})
    setError({state:false,error:``})
    const fm = new Fortmatic('pk_test_25E2ADA8B773A4CB','rinkeby');
    console.log(fm)
    window.web3 = new Web3(fm.getProvider());

    if (await fm.user.isLoggedIn() && props.authenticated && disconnect){

      fm.user.logout().then(() => {
            
        props.onAcountChange(false, false,false,false);
        props.onNetworkChange(false, false,false,false);

        toast.info('Formatic disconnected  ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      
      });
      return
    }
    //if()
   
    fm.user.login().then(async () => {
      window.web3.eth.getAccounts().then((accounts)=> props.onAcountChange(accounts[0], true, "formatic",window.web3)); 
      
      const network = await window.web3.eth.getChainId()

      if (network !== 1 && network !== 4) {
        //must be on mainnet or Testnet
        props.onNetworkChange(network, false, "formatic",window.web3);
      }
      else
        window.web3.eth.getChainId().then((id)=> props.onNetworkChange(id, true, "formatic",window.web3));
   
    
    }).catch((e)=>{ 
      
      setLoading({state:false,wallet:''})
      setError({state:true,error:`Formatic user denied access`})
      
      })
  
  
    window.addEventListener("beforeunload", async (ev) => {
    
      if (await fm.user.isLoggedIn()){

          fm.user.logout().then(() => {
            
            props.onAcountChange(false, false,false,false);
            props.onNetworkChange(false, false,false,false);
          
          });
      }
    });
  } catch (error) {
    
  }
}

  //Coinbase wallet
async function listenCoinbaseAccount(ethereum){

      // Initialize a Web3 object
  try {
  


   const web3 = new Web3(ethereum)

   ethereum.send('eth_requestAccounts').then(async (accounts) => {
  

    if(accounts && accounts[0]){
    props.onAcountChange(accounts[0], true, "coinbase",ethereum);
    props.onNetworkChange(await web3.eth.getChainId(), true, "coinbase",ethereum);
    }
  })
  

  
  ethereum.on('chainChanged', async function (chainId) {
    const chainIDDecimal = parseInt(chainId, 16);

    if (chainIDDecimal !== 1 && chainIDDecimal !== 4) {
      //must be on mainnet or Testnet (Web3 returns it as a decimal, thats why im converting ) - window.ethereum returns it as a hex
      props.onNetworkChange(chainIDDecimal, false, "coinbase",ethereum);
    } else {
      props.onNetworkChange(chainIDDecimal, true, "coinbase",ethereum);
    }
  });

  
  ethereum.on('accountsChanged', async function (accounts) {
    console.log(accounts);

    const network = await web3.eth.getChainId()

    if (network !== 1 && network !== 4) {
      //must be on mainnet or Testnet
      props.onNetworkChange(network, false, "coinbase",ethereum);
    } else {
      //Do this check to ddetect if the user disconnected their wallet from the Dapp
      if (accounts && accounts[0]) props.onAcountChange(accounts[0], true, "coinbase",ethereum);
      else {
        /*
      @Arg1 : account address (String)
      @Arg2 : isAuthenticated (bool) 
    */
        props.onAcountChange(false, false,false,false);
        props.onNetworkChange(false, false,false,false);
      }
    }
  });

  window.addEventListener("beforeunload", (ev) => {
    
          ethereum.disconnect()
    
 });

  } catch (error) {
    
    console.log(error)
  }
  

  }
async function connectCoinBaseWallet(disconnect = false){

  try {
    
  
  const APP_NAME = 'Open RPG'
  const APP_LOGO_URL = 'https://example.com/logo.png'
  const ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/2d50c035b508455dbc6f58d4dc8a217c'
  const CHAIN_ID = 1
  
  // Initialize WalletLink
  const walletLink = new WalletLink({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: true,
    overrideIsMetaMask : true,
    
    
  })

  
 
  if(walletLink){

  // Initialize a Web3 Provider object
   const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID)
  
   if(ethereum && ethereum.isConnected() && props.authenticated && disconnect){

    ethereum.disconnect()

    props.onAcountChange(false, false,false);
    props.onNetworkChange(false, false,false);
    toast.info('Coinbase wallet disconnected  ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      return

   }
   
   

   if(ethereum && ethereum.isConnected())
      await listenCoinbaseAccount(ethereum)

  }

  } catch (error) {
    console.log(error)
  }

  }
  //Trezor
async function listenTrezorAccount(){

    TrezorConnect.on(DEVICE_EVENT, async (event) => {

      if (event.type === DEVICE.CONNECT) {
       

        const account = await TrezorConnect.getAccountInfo({path: ETH_PATH, coin:"eth"})

        console.log("Account : " , account.payload)
        if(account.payload.descriptor){
      
          props.onAcountChange(account.payload.descriptor, true, "trezor",TrezorConnect,account.payload.misc.nonce);
          props.onNetworkChange(1, true, "trezor",TrezorConnect);
        
      }
  
      } else if (event.type === DEVICE.DISCONNECT) {
        props.onAcountChange(false, false,false,false);
        props.onNetworkChange(false, false,false,false);
        toast.info('Trezor disconnected  ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    //     else if (event.type === DEVICE.CHANGED) {
    //     props.onAcountChange(false, false,false,false);
    //     props.onNetworkChange(false, false,false,false);
    // }
    /***THERE ARE MORE EVENTS TO LOOK INTO. CANT FIND DOCS ANYWHERE */

      
  })
  }

 async function connectTrezor(disconnect = false) {
  try {
    
    if (disconnect && props.authenticated){

      TrezorConnect.disableWebUSB()
      props.onAcountChange(false, false,false,false);
      props.onNetworkChange(false, false,false,false);

      toast.info('Trezor disconnected  ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        return
    }
  

      TrezorConnect.manifest({
    
            email: 'fsobh15@icloud.com',
            appUrl: 'https://beta.openrpg.link/'
          })




    
      const account = await TrezorConnect.getAccountInfo({path: ETH_PATH, coin:"eth"})
     console.log(await TrezorConnect.ethereumGetAddress({path: ETH_PATH, coin:"eth"}))
      
      
      
      if (account && account.payload.descriptor ){

      await  listenTrezorAccount()

      
        props.onAcountChange(account.payload.descriptor, true, "trezor",TrezorConnect,account.payload.misc.nonce);
        props.onNetworkChange(1, true, "trezor",TrezorConnect);
      }
      } catch (error) {
        
        console.log(error)
        props.onAcountChange(false, false,false,false,false);
        props.onNetworkChange(false, false,false,false);
      }

  }
 //Metamask
async function listenMMAccount(Ethereum) {

    window.ethereum.on('accountsChanged', async function (accounts) {
      console.log(accounts);

      const network = await Ethereum.eth.getChainId();

      if (network !== 1 && network !== 4) {
        //must be on mainnet or Testnet
        props.onNetworkChange(network, false, "metamask",window.ethereum);
      } else {
        //Do this check to ddetect if the user disconnected their wallet from the Dapp
        if (accounts && accounts[0]) props.onAcountChange(accounts[0], true, "metamask",window.ethereum);
        else {
          /*
			  @Arg1 : account address (String)
			  @Arg2 : isAuthenticated (bool) 
			*/
          props.onAcountChange(false, false,false,false);
          props.onNetworkChange(false, false,false,false);
        }
      }
    });

    window.ethereum.on('chainChanged', async function (chainId) {
      const chainIDDecimal = parseInt(chainId, 16);

      if (chainIDDecimal !== 1 && chainIDDecimal !== 4) {
        //must be on mainnet or Testnet (Web3 returns it as a decimal, thats why im converting ) - window.ethereum returns it as a hex
        props.onNetworkChange(chainIDDecimal, false, "metamask",window.ethereum);
      } else {
        props.onNetworkChange(chainIDDecimal, true, "metamask",window.ethereum);
      }
    });
  }
async function connectMetaMask(disconnect = false) {
    try {

      if(disconnect && props.authenticated)
        return toast.info('Disconnected using Meta mask ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });


      const Ethereum = await getWeb3();

      if (Ethereum) {
        //this is all the user data we need, and need to track
        const addy = await Ethereum.eth.getAccounts();
        const network = await Ethereum.eth.getChainId();
        let auth = true;
        if (network !== 1 && network !== 4) auth = false;
        //add check here for chain

        props.onAcountChange(addy[0], auth, "metamask", window.ethereum);
        props.onNetworkChange(network, auth, "metamask", window.ethereum);

        await listenMMAccount(Ethereum);
      } else throw new Error('Provider not found');
    } catch (error) {
      console.log(error.code);

      if (error.code === 4001) setRejected(true);

      if (error.code === -32002) setPending(true);

      if (error.code === 4003) setWeb3NotDetected(true);
    }
  }
 //Wallet connect
async function listenWCAccount(connector) {
    connector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts, chainId } = payload.params[0];

      if (chainId !== 1 && chainId !== 4) {
        //must be on mainnet or Testnet
        props.onNetworkChange(chainId, false,"walletconnect",connector);
      } else {
        
      
        
      
        if (accounts && accounts[0]) props.onAcountChange(accounts[0], true,"walletconnect",connector);
        else {
          /*
					@Arg1 : account address (String)
					@Arg2 : isAuthenticated (bool) 
					*/
          props.onAcountChange(false, false,false,false);
          props.onNetworkChange(false, false,false,false);
        }
      }
    });

    connector.on('session_update', (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts, chainId } = payload.params[0];

      if (chainId !== 1 && chainId !== 4) {
        //must be on mainnet or Testnet
        console.log("CID : ", chainId)
        props.onNetworkChange(chainId, false,"walletconnect",connector);
      } else {
        props.onNetworkChange(chainId, true, "walletconnect",connector);
        if (accounts && accounts[0]) props.onAcountChange(accounts[0], true,"walletconnect",connector);
        else {
          /*
					@Arg1 : account address (String)
					@Arg2 : isAuthenticated (bool) 
					*/
          props.onAcountChange(false, false,false,false);
          props.onNetworkChange(false, false,false,false);
        }
      }
    });

    connector.on('disconnect', (error, payload) => {
      if (error) {
        throw error;
      }

      props.onAcountChange(false, false,false,false);
      props.onNetworkChange(false, false,false,false);
    });

    window.addEventListener("beforeunload", (ev) => {
      if (connector.connected)
        return  connector.killSession()
      
   });
  }
async function connectWalletConnect(disconnect = false) {
    try {



      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      });

      if (connector.connected && disconnect && props.authenticated){ //on disconnect button click
         await connector.killSession()
         props.onAcountChange(false, false,false,false);
         props.onNetworkChange(false, false,false,false);

         return toast.info('Wallet Connect Session Terminated', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

        }

      //JUST INCASE, proper handling is at end of listenWCAccount() function
      if (connector.connected)
        await connector.killSession()

      // TODO: check if connector is connected, if connected then disconnect it
      const data = await connector.connect();

      if (connector.connected) {
        console.log(data);

        await listenWCAccount(connector);

        if (connector.chainId !== 1 && connector.chainId !== 4) {
          //must be on mainnet or Testnet
          props.onNetworkChange(connector.chainId, false,"walletconnect",connector);
        } else {
          //Do this check to ddetect if the user disconnected their wallet from the Dapp
          if (connector.accounts && connector.accounts[0]) {
            props.onAcountChange(connector.accounts[0], true,"walletconnect",connector);
            props.onNetworkChange(connector.chainId, true,"walletconnect",connector);
          } else {
            /*
			  @Arg1 : account address (String)
			  @Arg2 : isAuthenticated (bool) 
			*/
            props.onAcountChange(false, false,false,false);
            props.onNetworkChange(false, false,false,false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  //END OF Connect and listener functions for wallets

  

return (
    <>
      <SweetAlert
        title={`Wallet connection Failed`}
        confirmButtonColor={'Close'}
        show={noWeb3}
        onConfirm={() => setWeb3NotDetected(false)}
        text={`No Web 3 Injection detected`}
        type={'error'}
      />

      <SweetAlert
        title={`Wallet connection rejected`}
        confirmButtonColor={'Close'}
        show={reject}
        onConfirm={() => setRejected(false)}
        text={`You Rejected the request to connect to your wallet`}
        type={'error'}
      />

      <SweetAlert
        title={`Wallet Connection already pending`}
        confirmButtonColor={'Close'}
        show={pend}
        onConfirm={() => setPending(false)}
        text={`You already have a pending request in your  wallet to confirm`}
        type={`error`}
      />
      <SweetAlert
        title={`${loading.wallet} wallet Connection loading`}
        confirmButtonColor={'Close'}
        show={loading.state}
        onConfirm={() => setLoading({state: false, wallet : ''})}
        text={`Your connection to ${loading.wallet} is loading...`}
        type={`info`}
      />

       <SweetAlert
        title={`Wallet not connected`}
        confirmButtonColor={'Close'}
        show={anyError.state}
        onConfirm={() => setError({state: false, error : ''})}
        text={`${anyError.error}`}
        type={'error'}
      />


      <div className="service-img-wrapper col-lg-5 col-md-12 col-sm-12 mx-auto text-center " > 
      

          <div className="who-we-contant text-center"  >
            <div className='m-5'>
            <img
              src={ConnectWalletIconswallet}
              className="m-3"
              
              width="60"
              alt=""
            />
            <h4 className="w-text mb-30 text-dark" data-wow-delay="0.3s">
              Connect Your Wallet to Start minting NFTs.
            </h4>
            </div>
            {whoWeData &&
              whoWeData.map((item, i) => (
                <div
                  key={i}
                  className="pricing-item v2"
                  onClick={async () => {
                    if (i === 0) await connectMetaMask();
                    if (i === 1) await connectWalletConnect();
                    if (i === 2) await connectCoinBaseWallet();
                    if (i === 3) await connectFormatic();
                    if (i === 4) await connectPortis();

                  }}>
                  <img src={item.img} width="40" className="wal-icon rounded img-fluid" alt="" />
                  {item.text}
                </div>
              ))}
             
          </div>
        
      </div>
    </>
  );
};

const MapStateToProps = (state) => {
  return {
    account: state.BlockChain.account,
    network: state.BlockChain.selectedNetwork,
    authenticated: state.BlockChain.isAuthenticated,
    Wallet: state.BlockChain.WALLET,
    Pro: state.BlockChain.protocal,
    trezorNonce : state.BlockChain.trezorNonce
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDataFetch: (BCdata) => {
      dispatch(setAllBlockChainData(BCdata));
    },
 
    onAcountChange: (acc, isAuth,protocal,connector,trezorNonce = false) => {
      dispatch(setAccount(acc, isAuth,protocal,connector,trezorNonce));
    },
    onNetworkChange: (network, isAuth,protocal,connector) => {
      dispatch(setNetwork(network, isAuth,protocal,connector));
    }
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(FeaturesList);
