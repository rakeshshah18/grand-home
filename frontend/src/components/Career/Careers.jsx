import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderDragCursor from "../../commoncomponents/SliderDragCursor";
import { Link } from "react-router-dom";

const Careers = () => {
    const breadcumbStyle = {
        backgroundImage: `url("assets/img/bg/breadcumb-bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "150px 0",
        textAlign: "center",
        color: "#fff"
      };
        const textCenter={
    textAlign:'center'
  }
  const testimonialsStyle ={
      width:'459.667px',
      marginRight: '30px'
  }
   // testmoneal
    // 
      const [isHovered, setIsHovered] = useState(false);
    const properties = [
      {
          id: 1,
          img: "assets/img/property/chestermere.jpg",
          title: "P.kaur",
          discription: "We have worked with Sarbdeep Baidwan and his team in the past and once again they have exceeded our expectations.He himself was at the site every single day to make sure all the work is done properly. There were very transparent and finished the work on time which is the rarest .Will be definitely using them for our next project and highly recommend them.",
         
      },
      {
          id: 2,
          img: "assets/img/property/chestermere.jpg",
          title: "R. Sidhu",
          discription: "High quality work, reasonable pricing and individual approach in every project. They discuss every detail  and do what is best for the  client without trying to impose the solution that was simplest for them.Highly recommend.",
        
      },
      {
          id: 3,
          img: "assets/img/property/chestermere.jpg",
          title: "M. Sidhu",
          discription: "Great Service and variety of custom plans",
         
      },
     
  ];
// 
// testmoneal
  return (  
    <>
     <div className="breadcumb-wrapper" style={breadcumbStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Careers</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/" data-discover="true">Home</a></li>
                  <li>Careers</li>
                </ul>
              </div>
            </div>
          </div> 
        </div>
      </div>
      {/*  */}
      <section className="pricing section-space__top section-space__bottom-80 overflow-hidden">
            <div className="container rr-shape-p-c_1">
              
               <div className="row mb-60 mb-sm-40 mb-xs-35 align-items-lg-end align-items-center">
               <div className="section-title-holder centered"><h2 className="section-title">Current Openings</h2></div>
               </div>
               <div className="row mb-minus-30">
                 
                  <div className="col-xl-4 col-md-6">
                     <div className="pricing__card overflow-hidden mb-30 wow clip-t-b" data-background="assets/imgs/pricing/bottom-shape.png" style={{backgroundImage: 'url(&quot;assets/imgs/pricing/bottom-shape.png&quot;)',visibility: 'visible', animationName: 'clip-t-b'}}>
                        <div className="pricing__card-price mb-30 pb-30">
                           <h2 data-yearly="<span className=&quot;price&quot;>$199.<span>00</span></span>
                              <span className=&quot;month-year&quot;>PER YEARLY</span>" data-monthly="<span className=&quot;price&quot;>$99.<span>00</span></span>
                              <span className=&quot;month-year&quot;>PER MONTH</span>" className="d-flex flex-column">
                              <span className="price">Construction Worker</span>
                              <span className="month-year">Total Position : 4</span>
                              <span className="month-year">Experience : 2-3 Year</span>
                           </h2>
                        </div>
                        <div className="pricing__card-body mb-40">
                           <ul>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Detail-oriented
                              </li>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Accounting software skills
                              </li>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Strong organization
                              </li>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Knowledge of accounting
                              </li>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Account reconciliation
                              </li>
                           </ul>
                        </div>
                        <a href="index.html" className="rr-btn rr-btn__transparent">
                        <span className="btn-wrap">
                        <span className="text-one">Apply Now</span>
                        <span className="text-two">Apply Now</span>
                        </span>
                        </a>
                     </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                     <div className="pricing__card overflow-hidden mb-30 wow clip-t-b" data-background="assets/imgs/pricing/bottom-shape.png" style={{backgroundImage: 'url(&quot;assets/imgs/pricing/bottom-shape.png&quot;)', visibility: 'visible', animationName: 'clip-t-b'}}>
                        <div className="pricing__card-price mb-30 pb-30">
                           <h2 data-yearly="<span className=&quot;price&quot;>$199.<span>00</span></span>
                              <span className=&quot;month-year&quot;>PER YEARLY</span>" data-monthly="<span className=&quot;price&quot;>$99.<span>00</span></span>
                              <span className=&quot;month-year&quot;>PER MONTH</span>" className="d-flex flex-column">
                              <span className="price">Concrete Finishers </span>
                              <span className="month-year">Total Position : 4</span>
                              <span className="month-year">Experience : 2-3 Year</span>
                           </h2>
                        </div>
                        <div className="pricing__card-body mb-40">
                           <ul>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Detail-oriented
                              </li>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Accounting software skills
                              </li>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Strong organization
                              </li>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Knowledge of accounting
                              </li>
                              <li>
                                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#F44E19"></circle>
                                    <path d="M15 7L8.125 13L5 10.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>
                                 Account reconciliation
                              </li>
                           </ul>
                        </div>
                        <a href="index.html" className="rr-btn rr-btn__transparent">
                        <span className="btn-wrap">
                        <span className="text-one">Apply Now</span>
                        <span className="text-two">Apply Now</span>
                        </span>
                        </a>
                     </div>
                  </div>
               </div>
               
            </div>
         </section> 
      {/* */}
      
                
                  <section className="section-space pb-5">
            <div className="container">
               <div className="row">
               <div className="section-title-holder centered"><h2 className="section-title">Life at GSquare</h2></div>
                    {/* Popup Gallery */}
                    <div className="row gy-4">
                    <div className="col-xl-4">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100 h-100" src="assets/img/property/property_inner_6.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_6.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100 h-100" src="assets/img/property/property_inner_7.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_7.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100 h-100" src="assets/img/property/property_inner_8.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_8.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100 h-100" src="assets/img/property/property_inner_9.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_9.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100 h-100" src="assets/img/property/property_inner_9.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_9.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100 h-100" src="assets/img/property/property_inner_7.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_7.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div> 
                  </div>
                  {/*  */}
                   
               </div>
             
            </div>
         </section>
           {/* testmonial */}
           <section className="space overflow-hidden bg-theme position-relative award-area-1 pb-3" style={{ backgroundImage: `url(assets/img/bg/award-bg-1-1.png)` }}>
            <div className="container pb-3">
                <div className="title-area text-center">
                {/* <span className="sub-title text-white">Awards</span> */}
                <h2 className="sec-title text-white">Testimonials</h2>
                </div>
                {/* <div className="swiper th-slider has-shadow" id="awardSlider1" data-slider-options='{"breakpoints":{"0":{"slidesPerView":2},"576":{"slidesPerView":"3"},"768":{"slidesPerView":"4"},"992":{"slidesPerView":"5"},"1200":{"slidesPerView":"5"}}}'>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-1.png" alt="Image" />
                        </Link>
                    </div>
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-2.png" alt="Image" />
                        </Link>
                    </div>
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-3.png" alt="Image" />
                        </Link>
                    </div>
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-4.png" alt="Image" />
                        </Link>
                    </div>
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-5.png" alt="Image" />
                        </Link>
                    </div>
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-1.png" alt="Image" />
                        </Link>
                    </div>
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-2.png" alt="Image" />
                        </Link>
                    </div>
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-3.png" alt="Image" />
                        </Link>
                    </div>
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-4.png" alt="Image" />
                        </Link>
                    </div>
                    <div className="swiper-slide">
                        <Link to="#" className="client-card">
                        <img src="assets/img/award/award1-5.png" alt="Image" />
                        </Link>
                    </div>
                </div>
                </div>  */}
   {/* <div className="container-fluid p-lg-0">
                <div className="slider-area project-slider4-1 slider-drag-wrap"
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}>
                <Swiper modules={[Navigation, Pagination, Autoplay]} {...sliderOptions}>
                    {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="portfolio-card style4">
                        <div className="portfolio-img">
                            <img src={slide.img} alt="project image" />
                        </div>
                        <div className="portfolio-content">
                            <h3 className="portfolio-title"
                            onMouseEnter={() => setIsHovered(false)}
                            onMouseLeave={() => setIsHovered(true)}>
                            <Link to="property-details.html">{slide.title}</Link>
                            </h3>
                            <p className="portfolio-location">{slide.location}</p>
                           
                           
                        </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
                </div>
  </div> */}
                {/* <div className="swiper-container">
                    <Swiper {...sliderOptions}>
                        {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <Link to="#" className="client-card">
                            <img src={`/assets/img/award/${image}`} alt={`Award ${index + 1}`} />
                            
                            </Link>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                </div> */}
                    <div className="slider-area property-slider2 slider-drag-wrap z-index-common"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}>
                                <Swiper
                                    modules={[Autoplay]}
                                    spaceBetween={24}
                                    slidesPerView={1}
                                    breakpoints={{
                                    576: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    992: { slidesPerView: 2 },
                                    1200: { slidesPerView: 3 },
                                    1500: { slidesPerView: 3 },
                                    }}
                                    // navigation
                                    // pagination={{ clickable: false }}
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    grabCursor={false}
                                >
                                    {properties.map((property) => (
                                    <SwiperSlide key={property.id}>
                                        <div className="property-card3 style-border home-about-box">
                                        <div className="property-card-thumb img-shine ">
                                        
                                        </div>
                                        <div className="property-card-details teastmoneal-card"> 
                                          <div className="testmonial-icon">
                                        <div className="  rating">
                                        <span className="icon" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m263.002-121.542 57.307-246.766L128.85-534.23l252.613-21.922L480-788.842l98.537 232.69L831.15-534.23 639.691-368.308l57.307 246.766L480-252.463 263.002-121.542Z"></path></svg></span>
                                        <span className="icon" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m263.002-121.542 57.307-246.766L128.85-534.23l252.613-21.922L480-788.842l98.537 232.69L831.15-534.23 639.691-368.308l57.307 246.766L480-252.463 263.002-121.542Z"></path></svg></span>
                                        <span className="icon" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m263.002-121.542 57.307-246.766L128.85-534.23l252.613-21.922L480-788.842l98.537 232.69L831.15-534.23 639.691-368.308l57.307 246.766L480-252.463 263.002-121.542Z"></path></svg></span>
                                        <span className="icon" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m263.002-121.542 57.307-246.766L128.85-534.23l252.613-21.922L480-788.842l98.537 232.69L831.15-534.23 639.691-368.308l57.307 246.766L480-252.463 263.002-121.542Z"></path></svg></span>
                                          </div>
                                          </div>
                                            <p className="property-card-location text-center">
                                            {/* <i className="far fa-map-marker-alt me-2"></i> */}
                                            {property.discription}
                                            </p>
                                          <h5>{property.title}</h5>
                                        </div>
                                        </div>
                                    </SwiperSlide>
                                    ))}
                                </Swiper>
                                </div>
            </div> 
        </section>
        <br></br>
       {/* testmonial */}
    </>
  )
}

export default Careers