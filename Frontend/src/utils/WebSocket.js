import React from 'react'
import Web3Data from 'web3data-js'
import {addTicker, addSlider,updateTicker, addChartData, updateLinkEth} from '../Reducers/Actions/tickerActions'
import {connect} from 'react-redux'
import axios from 'axios'
const URL = `https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2` //url to the graph
const AMBERDATA = `UAKef588dbcea9e78af9b7a3c5643aa319e`
const ETHERSCAN = `TN33RKQE1612AZEZX4N139DDKKRDPJB63V`
const w3d = new Web3Data(AMBERDATA)


export const fetchLinkEthPrice = (props) => {

  try {
    
    axios.get('https://web3api.io/api/v2/market/spot/prices/pairs/link_eth/latest/', {
      headers: {
          "x-api-key" : AMBERDATA
      }
    }).then(response => {

      props.onLinkEthFetch(response.data.payload.price)

    })
  } catch (error) {
    console.log(error)
  }


}
export const fetchInitial = async (props) => {

   // https://web3api.io/api/v2/market/metrics/usdt/historical/nvt?startDate=1607058745 --> chart data here, do it by week

    const eth_usd = await axios.get('https://web3api.io/api/v2/market/spot/prices/pairs/eth_usd/latest', {
        headers: {
            "x-api-key" : AMBERDATA
        }
      })
      const btc_usd = await axios.get('https://web3api.io/api/v2/market/spot/prices/pairs/btc_usd/latest', {
        headers: {
            "x-api-key" : AMBERDATA
        }
      })

      axios.all([ btc_usd,eth_usd]).then(axios.spread((...responses) => {

        const date = Date.now()
 
            props.onInitialFetch({id : 0 ,pair : responses[0].data.payload.pair , price : parseFloat(responses[0].data.payload.price).toFixed(2), volume : parseFloat(responses[0].data.payload.volume).toFixed(2), date : date})
            props.onInitialFetch({id : 1 ,pair : responses[1].data.payload.pair , price : parseFloat(responses[1].data.payload.price).toFixed(2), volume : parseFloat(responses[1].data.payload.volume).toFixed(2), date : date})
           

            

      })).catch(errors => {
        // react on errors.
        console.log(errors)
        //console.error("Well Shiiiizzz")
      })

      //       //chart data, lotta usage on this endpoint
      //       const btc_chart = await axios.get(`https://web3api.io/api/v2/market/metrics/btc/historical/nvt?startDate=${oneWeek}`, 
      //       { 
      //         headers: 
      //         {
      //         "x-api-key" : AMBERDATA
      //     }})
      
      
      //     const eth_chart = await axios.get(`https://web3api.io/api/v2/market/metrics/eth/historical/nvt?startDate=${oneWeek}`, 
      //     { 
      //       headers: 
      //       {
      //       "x-api-key" : AMBERDATA
      //   }})
      
     

      // axios.all([ btc_chart,eth_chart]).then(axios.spread((...responses) => {

      //       props.onChartFetchData( 0, responses[0].data.payload.data)
      //       props.onChartFetchData( 1, responses[1].data.payload.data)
           
            

      // })).catch(errors => {
      //   // react on errors.
      //   console.log(errors)
      //   console.error("Well Shiiiizzz")
      // })
}



const calculateEthToUSD = async (amount) => {

  try {

  
  const eth_usd = await axios.get('https://web3api.io/api/v2/market/spot/prices/pairs/eth_link/latest/', {
    headers: {
        "x-api-key" : AMBERDATA
    }
  })

  const eth_price = parseFloat(eth_usd.data.payload.price).toFixed(2)

  return (eth_price * parseFloat(amount))

  } catch (error) {
    
  }
}
export const calculateTokenUSDValue = async (amount,contract) => {

  try {

    const am = parseFloat(amount)
 

    const Token = await axios({
      url: URL,
      method: 'post',
      data: {
      query: ` 
           {
              token(id : "${contract}") 
              {
               id
               symbol
               name
               decimals,
               derivedETH,
               
              }
            }`
          }
  })
  
  const tokenData = JSON.parse(JSON.stringify(Token.data.data))
  const amo = (parseFloat(tokenData.token.derivedETH) * am)

  const eth_usd = await axios.get('https://web3api.io/api/v2/market/spot/prices/pairs/eth_usd/latest/', {
    headers: {
        "x-api-key" : AMBERDATA
    }
  })

  const eth_price = parseFloat(eth_usd.data.payload.price).toFixed(2)

  return (eth_price * amo)

  } catch (error) {
    
  }
}


function getPercentageChange(oldNumber, newNumber){
  var decreaseValue = oldNumber - newNumber;

  return (decreaseValue / oldNumber) * 100;
}


export const awaitTxConfirmation = (tx) => 

new Promise((resolve, reject) => {
  //https://web3api.io/api/v2/transactions/0x0ac8d7d3930c8b8a2c88a0828ece6aca3bc1bda9b625b3ac76dad24f42806d89

  axios.get(`https://web3api.io/api/v2/transactions/${tx}`,{headers: {'x-amberdata-blockchain-id' : AMBERDATA}}).then((response) => {
  
            
         // console.log(response.data)

          resolve(response.data.payload.statusResult.code);
       
  }).catch((weir)=>{
      console.log("retrying")
      return false
  })
})

export  const  awaitTxConfirmationRinkeby =  (tx) =>
new Promise((resolve, reject) => {

  axios.get(`https://api-rinkeby.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${tx}&apiKey=${ETHERSCAN}`).then((response) => {
  
            
         // console.log(response.data)

          resolve(response.data.result.status);
       
  }).catch((weir)=>{
      console.log("retrying")
      return false
  })
})
const Subscribe = (props) => {

    
        w3d.on({eventName: 'market:prices:updates', filters: {pair: "btc_usd"}}, update  => {

            const priceDate = Date.now()
          


            props.onPriceFetch({id : 0 ,pair : "btc_usd" , price : parseFloat(update.price).toFixed(2), priceDate : priceDate})
            //console.log("subbed to BTC Updates")
            
          })
 

          w3d.on({eventName: 'market:prices:updates', filters: {pair: "eth_usd"}}, update  => {

       
            const priceDate = Date.now()
        

            props.onPriceFetch({id : 1 ,pair : "eth_usd" , price : parseFloat(update.price).toFixed(2), priceDate : priceDate})
          
            // Terminate the socket connection
           // console.log("subbed to ETH Updates")
            
          }) 
}

//keeps us connected
const healthCheck = () => {
        if (!w3d.websocket) return;
        if (w3d.websocket.socket.readyState !== 1) return;
        w3d.websocket.socket.send("heartbeat");
        setTimeout(healthCheck, 100000); //--> //ping over the interval in ms or * 10e3 s
        console.info("**    ❤️    Heart Beat    ❤️    **")
       
}



    const GetConnection = (props) => {

      

          fetchInitial(props)

          
          w3d.connect(() => healthCheck())
  
          
         
          
          
          fetchLinkEthPrice(props)
    
          Subscribe(props)
          //localStorage.removeItem("state")

        return (
            <div></div>
        )
            
    }


    const mapDispatchToProps = (dispatch) => {
        return {
            onPriceFetch: (data) => {
                dispatch(updateTicker(data))
            },
            onInitialFetch : (data) => {
                dispatch(addTicker(data))
            },
            onChartFetchData : (id, data) => {
                dispatch(addChartData(id,data))
            },
            onSliderFetch : (data) => {
              dispatch(addSlider(data))
          },
          onLinkEthFetch : (price) => {
            dispatch(updateLinkEth(price))
          }
        }
    }

    export default connect(null, mapDispatchToProps)(GetConnection)



/*
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣟⣫⡾⠛⠛⠛⠛⠛⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡟⣼⠏⠀⠀⠀⠀⠀⠀⣀⣀⡀⣙⣿⣿⢿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⢹⡟⠀⠀⠀⣰⡾⠟⠛⠛⠛⠛⠛⠛⠿⣮⡻⣿⣿
⣿⡿⢟⣻⣟⣽⠇⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿
⡟⣼⡟⠉⠉⣿⠀⠀⠀⠀⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⢟⣿⣿   
⣇⣿⠁⠀⠀⣿⠀⠀⠀⠀⠘⢿⣦⣄⣀⣀⣀⣀⣤⡴⣾⣏⣾⣿
⡇⣿⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠈⠉⠛⠋⠉⠉⠀⠀⢻⣿⣿⣿
⢃⣿⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣧⣿⣿
⡻⣿⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣧⣿⣿
⡇⣿⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⢹⣿⣿
⣿⡸⢷⣤⣤⣿⡀⠀⠀⠀⠀⢠⣤⣄⣀⣀⣀⠀⠀⢠⣿⣿⣿⣿
⣿⣿⣷⣿⣷⣿⡇⠀⠀⠀⠀⢸⡏⡍⣿⡏⠀⠀⠀⢸⡏⣿⣿⣿
⣿⣿⣿⣿⣿⢼⡇⠀⠀⠀⠀⣸⡇⣷⣻⣆⣀⣀⣀⣼⣻⣿⣿⣿
⣿⣿⣿⣿⣿⣜⠿⢦⣤⣤⡾⢟⣰⣿⣷⣭⣯⣭⣯⣥⣿⣿⣿⣿
*/