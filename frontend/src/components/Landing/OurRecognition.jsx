

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderDragCursor from "../../commoncomponents/SliderDragCursor";
import { Link } from "react-router-dom";

const OurRecognition = () => {
    // 
      const [isHovered, setIsHovered] = useState(false);
        const properties = [
            {
                id: 1,
                img: "assets/img/property/chestermere.jpg",
                title: "Integrity",
                discription: "We conduct business with honesty, transparency, and ethical practices.",
               
            },
            {
                id: 2,
                img: "assets/img/property/chestermere.jpg",
                title: "Excellence",
                discription: "We strive for excellence in design, construction, and customer service.",
              
            },
            {
                id: 3,
                img: "assets/img/property/chestermere.jpg",
                title: "Collaboration",
                discription: "We foster a collaborative and inclusive environment.",
               
            },
            {
                id: 4,
                img: "assets/img/property/chestermere.jpg",
                title: "Customer Satisfaction",
                discription: "We prioritize delivering an exceptional customer experience at every stage.",
             
            },
            {
                id: 5,
                img: "assets/img/property/chestermere.jpg",
                title: "Quality Craftsmanship",
                discription: "We take pride in our meticulous attention to detail and use of the finest materials.",
                
            },
            {
                id: 6,
                img: "assets/img/property/chestermere.jpg",
                title: "Sustainability",
                discription: "We promote environmentally responsible practices and integrate sustainable.",
                
            },
        ];
    // 
     
        const sliderOptions = {
            breakpoints: {
              0: { slidesPerView: 1 },
              576: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              992: { slidesPerView: 2 },
              1200: { slidesPerView: 2.5 },
              1500: { slidesPerView: 2.5, spaceBetween: 64 },
            },
            spaceBetween: 20,
            grabCursor: true,
            slideToClickedSlide: true,
            centeredSlides: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            loop: true,
        };
        
        const slides = [
        {
            img: "assets/img/project/Bow-Cres-SW-Render-Upcoming.jpg",
            title: "CHESTERMERE",
            // location: "California",
        },
        {
            img: "assets/img/project/Bow-Cres-SW-Render.jpg",
            title: "INNER CITY",
            // location: "California",
        },
        {
            img: "assets/img/project/killarney-36-St-SW.jpg",
            title: "SKY VIEW",
            // location: "California",
        },
        {
            img: "assets/img/project/Prairie-Model.jpg",
            title: "INNER CITY",
            // location: "California",
        },
        {
            img: "assets/img/project/Skyview-Parade.jpg",
            title: "INNER CITY",
            // location: "California",
        },
        
        ];
    // const sliderOptions = {
    //     loop: true,
    //     autoplay: { delay: 3000 },
    //     spaceBetween: 10,
    //     breakpoints: {
    //       0: { slidesPerView: 2 },
    //       576: { slidesPerView: 3 },
    //       768: { slidesPerView: 4 },
    //       992: { slidesPerView: 5 },
    //       1200: { slidesPerView: 5 },
    //     },
    //     modules: [Autoplay],
    //     // navigation: true,
    //     // pagination: { clickable: true },
    // };
    
    // const images = [
    // "award1-1.png",
    // "award1-2.png",
    // "award1-3.png",
    // "award1-4.png",
    // "award1-5.png",
    // "award1-1.png",
    // "award1-2.png",
    // "award1-3.png",
    // "award1-4.png",
    // "award1-5.png",
    // ];
  return (
    <>
        {/* <!--============================== Award Area ==============================--> */}
        <section className="space overflow-hidden bg-theme position-relative award-area-1" style={{ backgroundImage: `url(assets/img/bg/award-bg-1-1.png)` }}>
            <div className="container">
                <div className="title-area text-center">
                {/* <span className="sub-title text-white">Awards</span> */}
                <h2 className="sec-title text-white">Our Values</h2>
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
                                        <div className="property-card-thumb img-shine home__about">
                                        <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11v1a10 10 0 1 1-9-10"></path><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line><path d="M16 5h6"></path><path d="M19 2v6"></path></svg></div>
                                        </div>
                                        <div className="property-card-details"> 
                                            <h4 className="property-card-title text-center"
                                            onMouseEnter={() => setIsHovered(false)}
                                            onMouseLeave={() => setIsHovered(true)}>
                                            <Link to="">{property.title}</Link>
                                            </h4>
                                            <p className="property-card-location text-center">
                                            {/* <i className="far fa-map-marker-alt me-2"></i> */}
                                            {property.discription}
                                            </p>
                                          
                                        </div>
                                        </div>
                                    </SwiperSlide>
                                    ))}
                                </Swiper>
                                </div>
            </div> 
        </section>
    </>
  )
}

export default OurRecognition