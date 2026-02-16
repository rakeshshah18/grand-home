
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
//  
import $ from 'jquery';
import 'magnific-popup/dist/magnific-popup.css';
import 'magnific-popup';
const AboutUsBox = () => {
  useEffect(() => {
   

    const initVideoPopup = () => {
      $('.popup-video').magnificPopup({
        type: 'iframe',
        removalDelay: 260,
        mainClass: 'mfp-zoom-in',
      });
    };

   
    initVideoPopup();

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', () => {
     
      initVideoPopup();
    });

    return () => {
      $('button[data-bs-toggle="tab"]').off('shown.bs.tab');
    };
  }, []);

  return (
   <>
      {/* <!--============================== About Area ==============================--> */}
      {/* <div className="circle-text-container">
      <svg viewBox="0 0 100 100" className="circle-svg">
        <defs>
          <path
            id="circlePath"
            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <text className="circular-text">
          <textPath to="#circlePath" startOffset="50%" textAnchor="middle">
            Grand Home Builders
          </textPath>
        </text>
      </svg>
     </div> */}
      <div className="about-area-6 z-index-common position-relative space" id="about-sec" >
        <div className="container">
            <div className="row gx-80 justify-content-between">
              <div className="col-xl-6 mb-50 mb-xl-0">
                  <div className="img-box6">
                    <div className="img1">
                        <img src="assets/img/normal/about_6_1.png" alt="img" />
                    </div>
                    <div className="img2">
                        <img src="assets/img/normal/about_6_2.png" alt="img" />
                    </div>
                    <div className="about-tag">
                        <div className="about-experience-tag">
                          {/* <span className="circle-title-anime">Grand Home Builders</span> */}
                            <div className="circle-text-container circle-title-anime">
      <svg viewBox="0 0 100 100" className="circle-svg">
        <defs>
          <path
            id="circlePath"
            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <text className="circular-text">
          <textPath to="#circlePath" startOffset="50%" textAnchor="middle">
            Grand Home Builders
          </textPath>
        </text>
      </svg>
                            </div>
                        </div>
                        <Link to="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn popup-video"><i className="fa-sharp fa-solid fa-play"></i></Link>
                    </div>
                  </div>
              </div>
              <div className="col-xl-6">
                  <div className="title-area mb-32">
                    <span className="sub-title">About Us</span>
                    <h2 className="sec-title text-theme">Welcome to GrandHome Builders</h2>
                    <p className="sec-text text-theme">For over 9 Years, Grand Home Builders has been one of Calgary's leading custom home builders. As a professional "one-stop shop," we offer fully managed services, including real estate solutions.</p>
                    <p className="sec-text text-theme">Grand Home Builders has earned a reputation for excellence as a luxury custom home builder, founded on a commitment to professionalism, artisan craftsmanship, and unmatched customer service. This dedication has made them one of the most recognized and sought-after custom luxury home builders in the Calgary area.</p>
                  </div>
                  <div className="btn-wrap mt-5">
                    <Link to="about.html" className="th-btn style2 th-btn-icon">More About Grand Home</Link>
                  </div>
              </div>
            </div>
        </div>
      </div>
   </>
  )
}

export default AboutUsBox