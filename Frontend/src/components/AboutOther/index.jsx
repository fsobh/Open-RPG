import {
  HomeDemo1Computer
} from '../../utils/allImgs'

const AboutOther = ({ClassTitle="gradient-text blue"}) => {

  return (

    <section className="about-us-area section-padding-0-100 clearfix">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 offset-lg-0">
            <div className="who-we-contant">
              <div className="dream-dots text-left fadeInUp" data-aos="fade-up" data-aos-delay="200">
                <span className={ClassTitle}>Decentralized Platform for In-Game Assets</span>
              </div>
              <h4 className="fadeInUp" data-aos="fade-up" data-aos-delay="200">Create Non-Fungible Items With Actual In-Game Utility</h4>
              <p className="fadeInUp" data-aos="fade-up" data-aos-delay="200">Unlike buying ugly copy-pasted NFTs with inflated costs and no utility, our items actually have a use-case. Create a character and power them up by equipping them with gear that augments their attributes.</p>
              <p className="fadeInUp" data-aos="fade-up" data-aos-delay="300">Every item you mint has traits attached which make it useful in-game. Hammers of strength, robes of wisdom, flaming swords, and knives that inflict poison damage. Don’t need an item? Just trade or sell it to someone who does, or visit our Weapon smith shop for more!</p>
              <a className="btn more-btn mt-30" href="#">Read More</a>
            </div>
          </div>
          <div className="col-12 col-lg-6 offset-lg-0 col-md-12 mt-30 no-padding-left">
            <div className="welcome-meter floating-anim fadeInUp">
              <img draggable="false" src={HomeDemo1Computer} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutOther;