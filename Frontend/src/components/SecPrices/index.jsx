import SectionHeading from "../SectionHeading"
import PricingItem from "./PricingItem"
import {connect} from 'react-redux'
import {  PulseLoader } from 'react-spinners';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import{
  FooterPattern,
  FooterLogo
} from '../../utils/allImgs'



function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const SecPrices = ({ClassSec="features section-padding-0-70" , data , ClassSpanTitle, tickers}) => {
  
  TimeAgo.addLocale(en)

    return (
<footer className="footer-area bg-img mt-5" style={{backgroundImage: `url(${FooterPattern})`}}>
      <section className={ClassSec}>
        <div className="container col-12 align-items-center justify-content-center">

          <SectionHeading
            title="Mint Prices"
            text="Price to Mint"
            subtitle={"Early mints available for cheap, get more chances to score rare and exclusive items by becoming an early adopter. "}
            ClassSpanTitle={ClassSpanTitle}
          />          
          <div className="row align-items-center  justify-content-center" style={{zIndex : 100}}>
            {data && data.map((item , key) => (
              <PricingItem
                key={key}
                Round={item.Round}
                dollar={item.dollar}
                bonus={item.bonus}
                perc = {item.perc}
                eth  =  {tickers && tickers[1] ? formatNumber(tickers[1].price) : <PulseLoader size= {5} color = {"white"}></PulseLoader>}
                date = {tickers[1] && tickers[1].date ?  tickers[1].priceDate ?  <ReactTimeAgo date={tickers[1].priceDate} locale="en-US" timeStyle="round-minute"/> : <ReactTimeAgo date={tickers[1].date} locale="en-US" timeStyle="round-minute"/> : null}
              />
            ))}
          </div>
        </div>
      </section>
      </footer>
    );
}
const MapStateToProps = state =>{
  return {
    tickers : state.Tickers.tickers
  }
    }
  export default connect(MapStateToProps,null)(SecPrices)
