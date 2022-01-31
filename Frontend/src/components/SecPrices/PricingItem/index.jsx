const PricingItem = ({ Round, dollar, bonus, perc,eth,date }) => {

    return (
      <div className="col-lg-3 col-sm-6 col-xs-12" style={{zIndex : 100}}>
        <div className="pricing-item-o ">
          <h4>{Round}</h4> 
          <h3><strong className="xzc-1-month">{dollar}</strong></h3> 
          <span>1 ETH = ${eth} (USD)<br/>
          <small className="text-white">updated {date}</small></span>
          
          <div className="pricing">{perc}</div>
          <label><strong>{bonus}</strong></label>
        </div>
      </div>
    );
}

export default PricingItem;