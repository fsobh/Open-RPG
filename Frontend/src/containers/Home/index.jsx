import {useEffect} from "react";
import {addRemoveClassBody} from '../../utils'
import { Services,OurBlogInfo} from '../../data/data-containers/HomeDemo4/data-HomeDemo4.js';
import SecPricesInfo from '../../data/data-containers/HomeDemo4/data-SecPricesInfo.json';
import RoadmapInfo from '../../data/data-containers/HomeDemo4/data-RoadmapInfo.json';
import FaqInfo from '../../data/data-containers/HomeDemo4/data-FaqInfo.json';
import {HomeDemo4About3} from '../../utils/allImgs'
import './style/HomeDemo4.scss'
import Header from "../../layouts/Header"
import FooterPages from '../../layouts/Footer/FooterPages'
import SecHeroSection from '../../components/HeroSection'
import AboutOther from '../../components/AboutOther'
import SecPrices from '../../components/SecPrices'
import Roadmap from '../../components/Roadmap'
import Faq from '../../components/Faq'
import { Timeline } from 'react-twitter-widgets'
import NewsBlog from '../../components/NewsBlog'
import OurServices from './OurServices'
import SectionHeading from "../../components/SectionHeading";

const HomeContainer = () => {

    useEffect(() => {
      addRemoveClassBody('darker')
    },[])

    return (
      <div>
        <Header Title="OpenRPG" />
        <SecHeroSection
            ClassSec="hero-section moving section-padding"
            ClassDiv="col-12 col-lg-6 col-md-12"
            specialHead="Open Sourced & Tradable Game Assets"
            title="Open RPG"
            img={HomeDemo4About3}
        />
        
        <SecPrices
            ClassSec="features section-padding-100-70 "
            data={SecPricesInfo}
        />
        <div className="clearfix" />
        <AboutOther
            ClassTitle="gradient-text"
        />
        <OurServices data={Services} />

<div id="social">
        <SectionHeading
          title="Social Media"
          text="Join our  Discord, Telegram, and Twitter communities"
        />

        <div className="row" style={{zIndex : 100}}>
             <div className="container col-lg-4 col-md-12 col-sm-12 col-xs-12  align-items-center justify-content-center text-center mb-4">
                 <iframe  src="https://discordapp.com/widget?id=848328569464553483&theme=dark" width="350" height="560" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </div>
            <div className="container col-lg-4 col-md-12  col-sm-12 col-xs-12  align-items-center justify-content-center text-center mb-4">
        
                <iframe
                data-dark = {1}
                width="350" height="560" 
                allowtransparency="true" 
                frameborder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                src={'https://t.me/openrpgofficial/5' + '?embed=1'}
                
                id={'telegram-post' + 'https://t.me/+rT26lLDeQj01OWQx'.replace(/[^a-z0-9_]/ig, '-')}
                
                />
            </div>
            <div className="container col-lg-4 col-md-12 col-sm-12 col-xs-12 align-items-center justify-content-center text-center mb-4">
                    <Timeline
                dataSource={{ sourceType: "profile", screenName: "openrpg_" }}
                options={{ theme: "dark", width: "350", height: "560" }}
            />
            </div>
        </div>
        </div>
        <Roadmap
            data={RoadmapInfo}
            ClassSpanTitle="gradient-text blue"
        />
        {/* <Features2
            icoCounterClass="ico-counter dotted-bg mb-30"
            addOther={true}
            FeaturesOtherTop={FeaturesOtherTop}
            FeaturesOtherDown={FeaturesOtherDown}
        /> */}
        <Faq
            data={FaqInfo}
            ClassSpanTitle="gradient-text blue"
        />
        {/* <OurTeam
            data={OurTeamInfo}
            ClassSpanTitle="gradient-text blue"
        /> */}
      
        <NewsBlog
            data={OurBlogInfo}
            ClassSpanTitle="gradient-text blue"
        />
        <FooterPages
            ClassSpanTitle="gradient-text blue"
        />
      </div>
    );
};

export default HomeContainer