  
export const UPDATE_TICKER = 'UPDATE_TICKER'
export const UPDATE_SLIDER = 'UPDATE_SLIDER'
export const ADD_TICKER = 'ADD_TICKER'
export const ADD_CHART = 'ADD_CHART'
export const UPDATE_LINK_ETH = 'UPDATE_LINK_ETH'

export function updateTicker(ticker) {
  return {
    type: UPDATE_TICKER,
    
    payload : { 
      tic: ticker
    }
  }
}

export function updateLinkEth(price) {
  return {
    type: UPDATE_LINK_ETH,
    
    payload : { 
      price
    }
  }
}
export function addTicker(ticker) {
  return {
    type: ADD_TICKER,
    
    payload : { 
      tic: ticker
    }
  }
}

export function addChartData(id, chart) {
  return {
    type: ADD_CHART,
    
    payload : { 
      id ,
      chart
    }
  }
}
export function addSlider(slider) {
  return {
    type: UPDATE_SLIDER,
    
    payload : { 
      slider
    }
  }
}