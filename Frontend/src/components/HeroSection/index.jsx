import Features3 from '../Features3';
import Images from '../../data/data-containers/data-sample';
import React from 'react';

import './../../assets/css/HeroSection.css';

const SecHeroSection = ({
  ClassSec = '',
  ClassDiv = '',
  specialHead = '',
  title = '',
  link1 = '',
  link2 = '',
  img = '',
  HomeDemo1Or3Or4Or5Or6 = true,
  HomeDemo1Or4Or5Or6 = true
}) => {
  const [cur, setCur] = React.useState(Images[0]);

  React.useEffect(
    () =>
      setInterval(() => {
        var rand = Math.floor(Math.random() * Images.length);
        setCur(Images[rand]);
      }, 1000),
    []
  );

  return (
    <section
      className={ClassSec}
      id="home"
      style={{ backgroundSize: 'cover', paddingBottom: '8rem' }}>
      <div className="hero-section-content">
        <div className="container ">
          <div className="align-items-center mt-4">
            {/* <div className={ClassDiv}> */}
            <div>
              <div className="welcome-content adjust-height">
                <div className="promo-section ">
                  <h3 className="special-head dark ">{specialHead}</h3>
                </div>
                <h1>{title}</h1>
                <p className="w-text fadeInUp" data-wow-delay="0.3s">
                  OpenRPG is a system for blockchain based videogame items (as Non-Fungible Tokens) based on the classic archetypes of everyone’s favorite tabletop fantasy role-playing-games. Join our adventure into the Meta-verse today!
                </p>
              </div>
            </div>
            <div className="row align-items-center justify-content-around">
              <div
                className="col-lg-7 col-sm-12 justify-content-center"
                style={{ display: 'flex' }}>
                <Features3
                  style={{ width: 'fit-content' }}
                  icoCounterClass="ico-counter dotted-bg mb-30"
                  addOther={true}
                />
              </div>

              {HomeDemo1Or3Or4Or5Or6 && (
                <div className="sword-media-cont col-lg-3 col-sm-12">
                  <div
                    className="openSea-weapon-container"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: '250px'
                    }}>
                    {HomeDemo1Or4Or5Or6 && (
                      <div className="illusto-2 text-center">
                        <img
                          draggable="false"
                          height="180px"
                          width={'250px'}
                          src={cur}
                          alt="Low quality image of actual item"
                          style={{ border: '0px solid' }}
                        />
                      </div>
                    )} 
                    <div className="row">
                    <div className="col illusto-2 text-center mb-sm-5 open-sea-button-margin">
                      <a
                        href="https://testnets.opensea.io/collection/open-rpg-5dzurnfurc"
                        title="Buy on OpenSea"
                        target="_blank"
                        rel="noreferrer">
                        <img
                          style={{
                            // margin: '0 0 0 0',
                            width: '100%',
                            borderRadius: '5px',
                            boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.25)'
                          }}
                          src="https://storage.googleapis.com/opensea-static/Logomark/Badge%20-%20Available%20On%20-%20Light.png"
                          alt="Available on OpenSea Testnet"
                        />
                      </a>
                      
                    </div>
                    <div className= " col illusto-2 text-center  open-sea-button-margin">
                    <a
                        href="https://rinkeby.rarible.com/collection/0x133f28ac48e4a12db4681455c09fdc0876810f58/activity"
                        title="Buy on Rarible"
                        target="_blank"
                        rel="noreferrer">
                        <img
                          style={{
                            // margin: '0 0 0 0',
                            width: '100%',
                            borderRadius: '5px',
                            boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.25)'
                          }}
                          src="https://i.insider.com/61a69d252ff9830018d5fc29?width=600&format=jpeg&auto=webp"
                          alt="Available on Rarible Testnet"
                        />
                      </a>
                      </div>
                      </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecHeroSection;

// <>
//   {HomeDemo1 && (
//     <section className={"hero-section moving section-padding"} id="home">
//       <div className="moving-bg" />
//       <div className="hero-section-content">
//         <div className="container ">
//           <div className="row align-items-center">
//             <div className={"col-12 col-lg-5 col-md-12"}>
//               <div className="welcome-content">
//                 <div className="promo-section">
//                   <h3 className="special-head dark">{specialHead}</h3>
//                 </div>
//                 <h1 className="" data-aos-delay="200">{title}</h1>
//                 <p className="w-text " data-aos-delay="300">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet dolorem blanditiis ad perferendis, labore delectus dolor sit amet, adipisicing elit. Eveniet.</p>
//                 <div className="dream-btn-group " data-aos-delay="400">
//                   <a href="#" className="btn more-btn mr-3">{link1}</a>
//                   <a href="#" className="btn more-btn">{link2}</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="dotted mt-30 " data-aos-delay="500">
//                 <img draggable="false" src={img} alt="" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )}

//   {HomeDemo2 && (
//     <section className="hero-section app section-padding" id="home">
//       <div className="hero-section-content">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-12 col-lg-7 col-md-12">
//               <div className="welcome-content">
//                 <div className="promo-section">
//                   <h3 className="special-head dark">{specialHead}</h3>
//                 </div>
//                 <h1>{title}</h1>
//                 <p className="w-text">We have over 15 year exprience in business consultting arena. We have over 15 year exprience in business consultting arena and artficial intelligence.</p>
//                 <div className="dream-btn-group">
//                   <a href="#" className="btn more-btn mr-3">{link1}</a>
//                   <a href="#" className="btn more-btn">{link2}</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )}

//   {HomeDemo3 && (
//     <section className="hero-section de-3 section-padding" id="home">
//       <div className="hero-section-content">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-12 col-lg-5 col-md-12">
//               <div className="welcome-content">
//                 <div className="promo-section">
//                   <h3 className="special-head dark">{specialHead}</h3>
//                 </div>
//                 <h1>{title}</h1>
//                 <p className="w-text fadeInUp" data-wow-delay="0.3s">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet dolorem blanditiis ad perferendis, labore delectus dolor sit amet, adipisicing elit. Eveniet.</p>
//                 <div className="dream-btn-group fadeInUp" data-wow-delay="0.4s">
//                   <a href="#" className="btn more-btn mr-3">{link1}</a>
//                   <a href="#" className="btn more-btn">{link2}</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6">
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )}

//   {HomeDemo4 && (

//     <section className={ClassSec} id="home">
//       <div className="hero-section-content">
//         <div className="container ">
//           <div className="row align-items-center">
//             <div className={ClassDiv}>
//               <div className="welcome-content">
//                 <div className="promo-section">
//                   <h3 className="special-head dark">{specialHead}</h3>
//                 </div>
//                 <h1>{title}</h1>
//                 <p className="w-text fadeInUp" data-wow-delay="0.3s">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet dolorem blanditiis ad perferendis, labore delectus dolor sit amet, adipisicing elit. Eveniet.</p>
//                 <div className="dream-btn-group fadeInUp" data-wow-delay="0.4s">
//                   <a href="#" className="btn more-btn mr-3">{link1}</a>
//                   <a href="#" className="btn more-btn">{link2}</a>
//                 </div>
//               </div>
//             </div>
//             {HomeDemo1Or3Or4Or5Or6 && (
//               <div className="col-lg-6">
//                 {HomeDemo1Or4Or5Or6 && (
//                   <div className="illusto-2">
//                     <img draggable="false" draggable="false" src={img} alt="" />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>

//   )}

//   {HomeDemo5 && (

//     <section className="hero-section moving-2 section-padding" id="home">
//       <div className="hero-section-content">
//         <div className="container ">
//           <div className="row align-items-center">
//             <div className="col-12 col-lg-6 col-md-12">
//               <div className="welcome-content">
//                 <div className="promo-section">
//                   <h3 className="special-head dark">{specialHead}</h3>
//                 </div>
//                 <h1>{title}</h1>
//                 <p className="w-text fadeInUp" data-wow-delay="0.3s">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet dolorem blanditiis ad perferendis, labore delectus dolor sit amet, adipisicing elit. Eveniet.</p>
//                 <div className="dream-btn-group fadeInUp" data-wow-delay="0.4s">
//                   <a href="#" className="btn more-btn mr-3">{link1}</a>
//                   <a href="#" className="btn more-btn">{link2}</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="illusto-1 mt-30 fadeInUp" data-wow-delay="0.5s">
//                 <img draggable="false" draggable="false" src="img/core-img/hero-img.png" alt="" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )}

//   {HomeDemo6 && (

//     <section className="hero-section moving section-padding" id="home">
//       <div className="hero-section-content">
//         <div className="container ">
//           <div className="row align-items-center">
//             <div className="col-12 col-lg-6 col-md-12">
//               <div className="welcome-content">
//                 <div className="promo-section">
//                   <h3 className="special-head dark">{specialHead}</h3>
//                 </div>
//                 <h1>{title}</h1>
//                 <p className="w-text fadeInUp" data-wow-delay="0.3s">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet dolorem blanditiis ad perferendis, labore delectus dolor sit amet, adipisicing elit. Eveniet.</p>
//                 <div className="dream-btn-group fadeInUp" data-wow-delay="0.4s">
//                   <a href="#" className="btn more-btn mr-3">{link1}</a>
//                   <a href="#" className="btn more-btn">{link2}</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="illusto mt-30 fadeInUp" style={{}} data-wow-delay="0.5s">
//                 <img draggable="false" draggable="false" src="img/core-img/about-1.png" alt="" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//   )}
// </>
