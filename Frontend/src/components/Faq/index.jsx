import {
  HomeDemo1Faq
} from "../../utils/allImgs"

import SectionHeading from "../SectionHeading"

const Faq = ({data , ClassSpanTitle}) => {

    return (

      <div className="faq-timeline-area section-padding-0-85 mt-5" id="faq">
        <div className="container">
          <SectionHeading
            title="Token FAQ"
            text="Frequently Questions"
            ClassSpanTitle={ClassSpanTitle}
          />

          <div className="row align-items-center">
            <div className="col-12 col-lg-6 offset-lg-0 col-md-8 offset-md-2 col-sm-12">
              <img draggable="false" src={HomeDemo1Faq} alt="" className="center-block img-responsive" />
            </div>
            <div className="col-12 col-lg-6 col-md-12">
              <div className="dream-faq-area mt-s ">
                <dl id="basicAccordion">
                  {data && data.map((item , key) => (
                    <>
                      <dt className="wave" data-bs-toggle="collapse" data-bs-target={`#${item.ID}`} aria-expanded="false">{item.text}</dt>
                      <dd data-aos="fade-up" id={item.ID} aria-labelledby="headingOne" data-bs-parent="#basicAccordion" className="accordion-collapse collapse">
                          <p className="accordion-body">{item.description}</p>
                      </dd>
                    </>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}

export default Faq