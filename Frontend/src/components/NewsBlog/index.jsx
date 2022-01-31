import SectionHeading from "../SectionHeading"
import React from 'react'
import { getNewsFeed} from "../../utils/newsApi";
import './text.css'
const OurBlog = ({data , ClassSpanTitle}) => {

  const [news, setNews] = React.useState([])
  React.useEffect(() => {

    const fetch = async () => {

      const a = await getNewsFeed()

      console.log(a)
       setNews(a)



    }

    fetch();

  }, [])

    return (

      <section className="our_blog_area clearfix section-padding-100-0" id="blog" >
        <div className="container" >
          <div className="row">
            <div className="col-12">
              <SectionHeading
                title="News"
                text="Latest News"
                subtitle="Follow up on the latest news in Crypto"
                ClassSpanTitle={ClassSpanTitle}
              />

            </div>
          </div>
          <div className="row justify-content-center">
            {news && news.map((item , key) => (
              <div className="col-12 col-md-6 col-lg-4" key={key} >
                <div className="single-blog-area" data-aos="fade-up">
                  {/* Post Thumbnail */}
                  <div className="blog_thumbnail">
                    <img draggable="false" src={item.image_url} alt="" />
                  </div>
                  {/* Post Content */}
                  <div className="blog-content">
                    {/* Dream Dots */}
                    <div className="post-meta mt-20">
                      <p>
                      {item.sentiment === 'Neutral' ? <span class="badge badge-warning mr-3">Neutral</span> :
                      item.sentiment  === 'Positive' ? <span class="badge badge-success mr-3">Positive</span> :
                      item.sentiment === 'Negative' ? <span class="badge badge-danger mr-3">Negative</span> : null  }
                        
                         <a>  - by {item.source_name}</a> <a className="post-comments">7 comments</a></p>
                    </div>
                    <a href={item.news_url}  target= "_blank" rel="noreferrer" className="post-title">
                      <h4 className="text" >{item.title}</h4>
                    </a>
                    <p className="text" style={{minHeight: "60px"}}>{item.text}</p>
                    <a href={item.news_url}  target= "_blank" rel="noreferrer" className="btn more-btn mt-15">Read Article</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

}

export default OurBlog