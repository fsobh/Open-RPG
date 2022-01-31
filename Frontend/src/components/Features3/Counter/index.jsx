import { SlideCountdown } from 'react-fancy-countdown';
import { Line } from 'rc-progress';
import { commitTransaction ,getTotalCirculating , getCurrentMinted} from '../../../utils/commitTransaction';
import { connect } from 'react-redux';
import React from 'react'
import {  PulseLoader } from 'react-spinners';
const Counter = (props) => {

  const [total,setTotal] = React.useState(false)
  const [minted,setMinted] = React.useState(false)

  getTotalCirculating (setTotal)

  setInterval(() => {

    getCurrentMinted(setMinted)

    
  }, 5000);


  return (
    <div className="col-12 col-lg-12 col-md-12 col-sm-12">
      <div style={{ width: 'fit-content' }} className={props.icoCounterClass}>
        <div className="counter-down">
          <div className="content">
            <div className="conuter-header">
              <h3 className="w-text text-center">PUBLIC SALE BEGINS IN</h3>
            </div>
            <div className="counterdown-content">
              <div className="count-down titled circled text-center">
                <SlideCountdown weeks={false} deadline="2022-12-08 16:55:06" />
              </div>
              <div className="ico-progress">
                <ul className="list-unstyled list-inline clearfix mb-10">
                  <li className="title">5%</li>
                  <li className="strength">100%</li>
                </ul>
                <div className="current-progress">
                  <Line
                    percent="9"
                    trailWidth="3"
                    strokeWidth="4"
                    strokeColor="#fb881d"
                    trailColor="#000000"
                  />
                </div>
                <span className="pull-left">Whitelist event</span>
                <span className="pull-right">SOLD OUT</span>
              </div>
              <div className="text-center justify-content-center text-lg">

                <h5 className='text-dark text-center justify-content-center' ><strong>{minted ? minted : <PulseLoader size= {5} color = {"black"}></PulseLoader>} / {total ? total : <PulseLoader size= {5} color = {"black"}></PulseLoader>} Minted </strong> </h5> 
                <button
                  disabled={
                    props.account &&
                    props.authenticated &&
                    (typeof props.account === 'string' ||
                      props.account instanceof String)
                      ? false
                      : true
                  }
                  className="btn-lg font-size-lg dream-btn mt-15 fadeInUp"
                  style={{ fontSize: 'larger' }}
                  data-wow-delay="0.6s"
                  onClick={() => {
                    if (
                      props.account &&
                      props.authenticated &&
                      (typeof props.account === 'string' ||
                        props.account instanceof String)
                    && (minted && total && (parseInt(minted) < parseInt(total)))) {
                      commitTransaction(props);
                    }
                  }}>
                  MINT  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MapStateToProps = (state) => {
  return {
    account: state.BlockChain.account,
    network: state.BlockChain.selectedNetwork,
    authenticated: state.BlockChain.isAuthenticated,
    Wallet: state.BlockChain.WALLET,
    Protocal: state.BlockChain.protocal,
    Connector: state.BlockChain.Connector,
    trezorNonce: state.BlockChain.trezorNonce
  };
};

export default connect(MapStateToProps)(Counter);
