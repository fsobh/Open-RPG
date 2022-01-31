import { SET_ALL_BLOCKCHAIN_DATA, SET_WALLET_ABI , SET_NFT_ABI , SET_SIGNER, SET_METAMASK_STATUS,SET_ACCOUNT,SET_NETWORK,SET_WALLET_ASSETS, SET_WALLET_TOTAL_VALUE, SET_NEWS_FEED,SET_LOADING_STATE, SET_TRANSACTIONS } from './Actions/BlockChain'
const initialStore = {

NFT : null,
WALLET : null,
SIGNER : null,
isInstalledMM : false,
account :   null,
selectedNetwork :null,
isAuthenticated : false,
ASSETS : false,
TOTAL : false,
NEWS : false,
TRANSACTIONS : false,
IS_LOADING : false,
protocal : false,
Connector : false,
trezorNonce : false


    
}

export default function reducer(store = initialStore, action){

    

let {type, payload} = action

switch (type){

    case SET_ALL_BLOCKCHAIN_DATA:
        return Object.assign({}, store, {
        NFT : payload.data.nft,
        WALLET : payload.data.wallet,
        SIGNER : payload.data.signer,
        protocal : payload.data.protocal
        })

    case SET_WALLET_ABI:
            return Object.assign({}, store, {      
            WALLET : payload.wallet,          
        })  
        case SET_NEWS_FEED:
            return Object.assign({}, store, {      
            NEWS : payload.data,          
        })  
    case SET_ACCOUNT:
            return Object.assign({}, store, {      
            account : payload.account,
            isAuthenticated : payload.isAuthenticated,
            protocal : payload.protocal, 
            Connector : payload.connector,
            trezorNonce : payload.trezorNonce   
        })
    case SET_NETWORK:
            return Object.assign({}, store, {      
                selectedNetwork:payload.network,
                isAuthenticated : payload.isAuthenticated,
                protocal : payload.protocal,
                Connector : payload.connector  
        })
    case SET_TRANSACTIONS:
            return Object.assign({}, store, {      
                TRANSACTIONS : payload.transactions,          
            })  
    case SET_WALLET_ASSETS:
            return Object.assign({}, store, {      
            ASSETS : payload.assets          
        })
    case SET_WALLET_TOTAL_VALUE:
            return Object.assign({}, store, {      
            TOTAL: payload.total          
        })
    case SET_METAMASK_STATUS:
            return Object.assign({}, store, {      
            isInstalledMM : payload.status,          
        })         

    case SET_NFT_ABI:
        return Object.assign({}, store, {
        NFT : payload.nft,
        })    
    case SET_LOADING_STATE:
            return Object.assign({}, store, {
            IS_LOADING: payload.loading,
    })         
    case SET_SIGNER:
        return Object.assign({}, store, {
        SIGNER : payload.signer
        })
    default:  

        return store 


}



}

