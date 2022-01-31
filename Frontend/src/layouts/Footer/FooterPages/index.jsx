import{
  FooterPattern,
  FooterLogo
} from '../../../utils/allImgs'

import SectionHeading from "../../../components/SectionHeading"

import '../Footer.scss'

import IcoName from '../../../data/data-layout/Footer/data-IcoName.json'
import TextFooter from '../../../data/data-layout/Footer/data-TextFooter.json'

const FooterPages = ({ClassSpanTitle=""}) => {

  var year3 = new Date().getFullYear();
    return (

      <footer className="footer-area bg-img mt-5" style={{backgroundImage: `url(${FooterPattern})`}}>
        {/* ##### Contact Area Start ##### */}
        {/* <div className="contact_us_area section-padding-0-0" id="contact">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <SectionHeading
                  title="Contact us"
                  text="Contact With Us"
                  ClassSpanTitle={ClassSpanTitle}
                />

              </div>
            </div>
            {/* Contact Form */}
            {/* <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8">
                <div className="contact_form">
                  <form action="#" method="post" id="main_contact_form" noValidate>
                    <div className="row">
                      <div className="col-12">
                        <div id="success_fail_info" />
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="group fadeInUp" data-wow-delay="0.2s">
                          <input type="text" name="name" id="name" required />
                          <span className="highlight" />
                          <span className="bar" />
                          <label>Name</label>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="group fadeInUp" data-wow-delay="0.3s">
                          <input type="text" name="email" id="email" required />
                          <span className="highlight" />
                          <span className="bar" />
                          <label>Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="group fadeInUp" data-wow-delay="0.4s">
                          <input type="text" name="subject" id="subject" required />
                          <span className="highlight" />
                          <span className="bar" />
                          <label>Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="group fadeInUp" data-wow-delay="0.5s">
                          <textarea name="message" id="message" required defaultValue={""} />
                          <span className="highlight" />
                          <span className="bar" />
                          <label>Message</label>
                        </div>
                      </div>
                      <div className="col-12 text-center fadeInUp" data-wow-delay="0.6s">
                        <button type="submit" className="btn more-btn">Send Message</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */} 
        {/* ##### Contact Area End ##### */}
        
        <div className="footer-area bg-img" style={{backgroundImage: `url(${FooterPattern})`}}>
          <div className="footer-content-area demo">
            <div className="container">
              <div className="row ">
                
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="footer-copywrite-info">
                    <div className="copywrite_text fadeInUp" data-wow-delay="0.2s">
                      <div className="footer-logo">
                        <a href="#"><img draggable="false" src={FooterLogo} alt="logo" /> Open RPG</a>
                      </div>
                     
                
                <p><strong><span><strong>© {year3 === 2021 ? `2021 ` : `2021 - ${year3} `}</strong></span></strong></p>
                
            
                    </div>
                    
                    <div className="footer-social-info fadeInUp text-secondary" data-wow-delay="0.4s">
                      {IcoName && IcoName.map((item , key) => (
                          <a key={key} href="#"><i className={item.IcoName} aria-hidden="true" /></a>    
                      ))}
                        
            || Crafted with
           <span className="text-danger px-1">❤</span>
     
                    </div>
                    
                  </div>
                </div>

                
              </div>
            </div>
            
          </div>
        </div>
      </footer>
    );
}

export default FooterPages