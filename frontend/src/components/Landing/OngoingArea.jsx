import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderDragCursor from "../../commoncomponents/SliderDragCursor";
import { Link } from "react-router-dom";

const OngoingArea = () => {
    const [isHovered, setIsHovered] = useState(false);
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
  return (
    <>
        {/* <!-- slider drag cursor --> */}
        <SliderDragCursor isVisible={isHovered} />
        {/* <!--============================== Ongoing Projects Area  ==============================--> */}
        <section className="space overflow-hidden" style={{position:"relative"}}>
            <div className="sec-bg-shape2-1 spin shape-mockup d-xl-block d-none" style={{left:'4%'}} data-top="6%" data-left="4%">
                <img src="assets/img/shape/section_shape_2_1.jpg" alt="img" />
            </div>
            <div className="sec-bg-shape2-2 wave-anim shape-mockup d-xl-block d-none"
              style={{ backgroundImage: `url(assets/img/shape/section_shape_2_2.jpg)`, right:'4%' }} 
            data-bg-src="assets/img/shape/section_shape_2_2.jpg" data-top="12%" data-right="4%">
            </div>
            <div className="sec-bg-shape2-3 jump shape-mockup d-xl-block d-none" style={{left:'3%', bottom:'0px'}}  data-bottom="0" data-left="3%">
                {/* <img src="assets/img/shape/home.jpg" alt="img" /> */}
                <img src="assets/img/shape/home.jpg" alt="img" style={{width:'100px', height:'100px'}}/>
            </div>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                <div className="col-xxl-6 col-lg-8">
                    <div className="title-area text-center">
                        <span className="sub-title">Best Proejct</span>
                        <h2 className="sec-title text-theme">Our Projects </h2>
                        {/* <p className="text-theme">Quis nulla blandit vulputate morbi adipiscing sem vestibulum. Nulla turpis integer dui sed posuere sem. Id molestie mi arcu gravida lorem potenti.</p> */}
                    </div>
                </div>
                </div>
            </div>
            <div className="container-fluid p-lg-0">
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
                            {/* <div className="property-card-meta">
                            <span>
                                <img src="/assets/img/icon/property-icon1-1.svg" alt="icon" />
                                Bed 4
                            </span>
                            <span>
                                <img src="/assets/img/icon/property-icon1-2.svg" alt="icon" />
                                Bath 2
                            </span>
                            <span>
                                <img src="/assets/img/icon/property-icon1-3.svg" alt="icon" />
                                1500 sqft
                            </span>
                            </div> */}
                            {/* <p className="portfolio-text">
                            Telescope kittens revision broomstick your cleansweep ipsum half-blood flourish poltergeist.
                            </p> */}
                        </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
                </div>

                <div className="btn-wrap justify-content-center mt-55">
                <Link to="property.html" className="th-btn style4 th-btn-icon">Browse All Projects</Link>
                </div>
            </div>
        </section>
    </>
  )
}

export default OngoingArea