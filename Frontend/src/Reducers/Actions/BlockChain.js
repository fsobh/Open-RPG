export const SET_ALL_BLOCKCHAIN_DATA = 'SET_ALL_BLOCKCHAIN_DATA';
export const SET_WALLET_ABI = 'SET_WALLET_ABI';
export const SET_NFT_ABI = 'SET_NFT_ABI';
export const SET_SIGNER = 'SET_SIGNER';
export const SET_METAMASK_STATUS = 'SET_METAMASK_STATUS';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_NETWORK = 'SET_NETWORK';
export const SET_WALLET_ASSETS = 'SET_WALLET_ASSETS';
export const SET_WALLET_TOTAL_VALUE = 'SET_WALLET_TOTAL_VALUE';
export const SET_NEWS_FEED = 'SET_NEWS_FEED';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const SET_LOADING_STATE = 'SET_LOADING_STATE'

export function setAllBlockChainData(data) {
  return {
    type: SET_ALL_BLOCKCHAIN_DATA,
    
    payload : { 
      data    
    }
  }
}
export function setTransactions(transactions) {
  return {
    type: SET_TRANSACTIONS,
    
    payload : { 
      transactions    
    }
  }
}
export function setLoadingState(loading) {
  return {
    type: SET_LOADING_STATE,
    
    payload : { 
      loading   
    }
  }
}
export function setNewsFeed(data) {
  return {
    type: SET_NEWS_FEED,
    
    payload : { 
      data    
    }
  }
}
export function setWalletTotalValue(total) {
  return {
    type: SET_WALLET_TOTAL_VALUE,
    
    payload : { 
      total    
    }
  }
}

export function setMetaMaskStatus(status) {
  return {
    type: SET_METAMASK_STATUS,
    payload : {
    status
    }
  }
}

export function setWalletAssets(assets) {
  return {
    type: SET_WALLET_ASSETS,
    payload : {
    assets
    }
  }
}
export function setAccount(account, isAuthenticated,protocal,connector,trezorNonce) {
  return {
    type: SET_ACCOUNT,
    payload : {
    account,
    isAuthenticated,
    protocal,
    connector,
    trezorNonce
    
    }
  }
}

export function setNetwork(network,isAuthenticated,protocal,connector) {
  return {
    type: SET_NETWORK,
    payload : {
    network,
    isAuthenticated,
    protocal,
    connector
    }
  }
}
export function setWalletData(wallet) {
  return {
    type: SET_WALLET_ABI,
    payload : {
    wallet
    }
  }
}

export function setNFTData(nft) {
  return {
    type: SET_NFT_ABI,
    payload : {
     nft
    }
  }
}

export function setSigner(signer) {
  return {
    type: SET_SIGNER,
    payload : {
      signer
    }
  }
}