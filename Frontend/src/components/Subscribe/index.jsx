const Subscribe = () => {

    return (

      <section className="container mb-5 mt-5 pt-4">
        <div className="subscribe section-padding-0-0">
          <div className="row">
            <div className="col-sm-12">
              <div className="subscribe-wrapper">
                <div className="section-heading text-center">
                  <h2 data-aos="fade-up" data-aos-delay="300">Don’t Miss OpenRPG News And Updates!</h2>
                  <p data-aos="fade-up" data-aos-delay="400">Get the latest updates and announcements on OpenRPG</p>
                </div>
                <div className="service-text text-center">
                  <div className="subscribe-section has-shadow">
                    <div className="input-wrapper">
                      <i className="fa fa-home" />
                      <input type="email" placeholder="Enter your Email" />
                    </div>
                    <button className="btn more-btn">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </section>
    );

}

export default Subscribe