import {UPDATE_TICKER, UPDATE_SLIDER,ADD_TICKER, ADD_CHART, UPDATE_LINK_ETH} from './Actions/tickerActions'


const initialStore = {
    tickers : [],
    sliders : [],
    LINK_ETH : null
}


export default function reducer(store = initialStore, action){

let {type, payload} = action

switch (type) {

    case  ADD_TICKER:        
        let newArray0 = [...store.tickers]
        newArray0[payload.tic.id] = payload.tic
        return Object.assign({}, store, { 
            tickers : newArray0,
        })

    case  UPDATE_TICKER:
        let newArray = [...store.tickers]
        newArray[payload.tic.id] = {...newArray[payload.tic.id], price: payload.tic.price, priceDate : payload.tic.priceDate, status : payload.tic.status, perc : payload.tic.perc, amount : payload.tic.amount}
        return Object.assign({}, store, {
            tickers : newArray,
        })

    case  UPDATE_LINK_ETH:
         
        let price = payload.price
        return Object.assign({}, store, {
                LINK_ETH : price,
            })

    case  ADD_CHART: 
        let beforeChart = [...store.tickers]
        beforeChart[payload.id] = {...beforeChart[payload.id], chart : payload.chart}
        return Object.assign({}, store, {
            tickers : beforeChart,
        })

    case  UPDATE_SLIDER:
        let newArray2 = payload.slider
        return Object.assign({}, store, {
            sliders : newArray2,
        })

    default:
      return store
  }



}