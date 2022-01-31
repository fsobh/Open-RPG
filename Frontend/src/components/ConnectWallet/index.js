import React from 'react';
import {connect} from 'react-redux'
import './style.css'
import  Modal from '../../components/Modal/Modal'
import styled from "styled-components";
import FeaturesList from './FeaturesList/index.js';
import {
  MetamaskTop,
	WalletConnectTop,
  ConnectWalletIconswallet,
  TrezorLogo,
  Coinbase,
  Formatic,
  Portis
} from '../../utils/allImgs'
const ModalContent = styled.div`
  height: 95%;
  width: 100%;
  overflow-y:auto;
  -ms-overflow-style: none;  
  scrollbar-width: none;  
  padding : 20px
  justify-content: center;
  align-items: center;
  h4 {
    color: #5c3aff;
  }
`;
const HeaderUserbox = (props) => {

  console.log(props)
  const [isOpen , setOpen]= React.useState(false)
  const myRef = React.useRef(null)
  
  return (
<div  className= "p-3 d-lg-flex d-md-flex justify-content-center">

             <Modal isOpen={props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?  false :isOpen} handleClose={() => setOpen(!isOpen)}  >
                <ModalContent className='row mx-auto hideScroll'  >
                    <FeaturesList ref ={myRef}/>
                </ModalContent>
            </Modal>
    

    <div class="btn-group" role="group" aria-label="Basic example" style={{maxHeight: "fit-content", zIndex : 1}}>
  {props.network ? props.network == "1" ? 
         
    <button type="button" className="btn btn-success p-1" style={{fontSize:"0.8em"}}>  
        <span >Mainnet </span>
    </button>
    
   : props.network == "4" ? 
   <button type="button" className="btn btn-warning p-1" style={{fontSize:"0.8em"}}>  
        <span >Rinkeby </span>
   </button>
   : 
   <button type="button" className="btn btn-danger p-1" style={{fontSize:"0.8em"}}>  
        <span >Network not supported</span>
    </button>    
   :
   <button type="button" className="btn btn-danger p-1" style={{fontSize:"0.8em"}}>  
        <span >Not connected</span>
   </button>
 }
  <button type="button" class="btn  p-1 connectButton" style={{fontSize:"0.8em"}} onClick={()=> props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ? null : setOpen(!isOpen)}><span className="font-weight-bold  " >{  props.account && (typeof props.account === 'string' || props.account instanceof String) ? `${props.account.substring(0,6)}...${props.account.substring(props.account.length - 6, props.account.length )}    `  : `Connect to Wallet    ` }</span></button>
  
  {
  
  props.Protocal ? 
  
  props.Protocal == "metamask" ? 
  
  <img className="bg-white p-1" src={MetamaskTop} height="35px" width="35px" style={
    /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
  
  
   : props.Protocal == "walletconnect" ? 
   
   <img className="bg-white p-1" src={WalletConnectTop} height="35px" width="35px" style={
     /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
   
   : 

    props.Protocal == "trezor" ? 
   
    <img className="bg-white p-1" src={TrezorLogo} height="35px" width="35px" style={
     /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */ {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
   :

   props.Protocal == "portis" ? 
   
    <img className="bg-white p-1" src={Portis} height="35px" width="35px" style={
      /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
   :
    props.Protocal == "coinbase" ? 
   
    <img className="bg-white " src={Coinbase} height="35px" width="35px" style={
      /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
   :
   props.Protocal == "formatic" ? 
   
    <img className="bg-white " src={Formatic} height="35px" width="35px" style={
      /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
   :
    <img className="bg-dark p-1" src={ConnectWalletIconswallet} height="35px" width="35px" style={
      /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */  {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>

   : <img className="bg-dark p-1" src={ConnectWalletIconswallet} height="35px" width="35px" style={
     /**props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?{} : */ {borderTopRightRadius : "5px",borderBottomRightRadius : "5px"}} ></img>
   
   }
  
  {/** To do : Add logout button   */}
  {/* {props.account && props.authenticated && (typeof props.account === 'string' || props.account instanceof String) ?  <button type="button" className="btn btn-danger p-1" style={{fontSize:"0.6em"}}
  onClick={()=> {

    console.log(myRef)

  }}
  >  
        <span >Logout</span>
   </button> :null} */}

 
</div>

  </div>
  );
};


const MapStateToProps = state => {

  return {
    account : state.BlockChain.account,
    network : state.BlockChain.selectedNetwork,
    authenticated : state.BlockChain.isAuthenticated,
    Wallet : state.BlockChain.WALLET,
    Protocal : state.BlockChain.protocal
    }
  
};


export default connect(MapStateToProps)(HeaderUserbox);


