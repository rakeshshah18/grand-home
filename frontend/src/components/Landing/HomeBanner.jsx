import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import CursorFollower from "../../commoncomponents/CursorFollower/CursorFollower";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const paginationRef = useRef(null);
  const swiperRef = useRef(null); // Store Swiper instance
  const [activeIndex, setActiveIndex] = useState(0);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    if (swiperRef.current && paginationRef.current) {
      swiperRef.current.params.pagination.el = paginationRef.current;
      swiperRef.current.pagination.init();
      swiperRef.current.pagination.render();
      swiperRef.current.pagination.update();
    }
  }, []);


  useEffect(() => {
    // Reset animation by toggling state
    setTriggerAnimation(false);
    setTimeout(() => {
      setTriggerAnimation(true);
    }, 10); // Small delay to force reflow
  }, [activeIndex]);

  return (
    <>
      {/* <!--============================== Hero Area ==============================--> */}
      <div className="hero-5" id="hero">
            <Swiper
            modules={[EffectFade, Autoplay, Pagination]}
            effect="fade"
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
               el: paginationRef.current, // Attach custom pagination div
               clickable: true,
               // renderBullet: (index, className) => {
               // return `<span className="${className} custom-bullet">${index + 1}</span>`;
               // },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="swiper th-slider hero-slider5"
            id="heroSlide5"
            >
            <SwiperSlide>
               <div className="hero-inner">
                  <div className="th-hero-bg"
                  // style={{ backgroundImage: `url(assets/img/hero/hero_bg_5_1.jpg)` }}
                  >
                 
         <video 
            className="video-bg" 
            autoPlay 
            loop 
            muted 
            playsInline
         >
            <source src="assets/video/grand-home-builders-house-built-video-walk-through_ci4r0y.mp4" type="video/mp4" />
            
         </video>  
                  </div>
                  <div className="container">
                  <div className="row align-items-center justify-content-center">
                     <div className="col-lg-10">
                        <div className="hero-style5 text-center">
                        <h1 className="hero-title text-white">
                           {/* <span className="title1" data-ani="slideindown" data-ani-delay="0.3s">
                              Crafting beautiful family homes
                           </span>
                           <span className="title2" data-ani="slideindown" data-ani-delay="0.4s">
                              with care and quality
                           </span> */}
                        <span
                           className={`title1 ${triggerAnimation ? "slideindown" : ""}`}
                           style={{ animationDelay: "0.3s", minWidth:'max-content' }}
                        >
                        Crafting beautiful family homes
                        </span>
                        <span
                           className={`title2 ${triggerAnimation ? "slideindown" : ""}`}
                           style={{ animationDelay: "0.4s" }}
                        >
                           with care and quality
                        </span>
                        </h1> 
                        <Link to="property.html" className={`th-btn style4 th-btn-icon ${triggerAnimation ? "slideinup" : ""}`} style={{ animationDelay: "0.6s" }}>
                           Request A Visit
                        </Link>
                        </div>
                     </div>
                  </div>
                  </div>
               </div>
            </SwiperSlide>

            <SwiperSlide>
               <div className="hero-inner">
                  <div
                  className="th-hero-bg"
                  // style={{ backgroundImage: `url(assets/img/hero/hero_bg_5_2.jpg)` }}
                  >
                        <video 
            className="video-bg" 
            autoPlay 
            loop 
            muted 
            playsInline
         >
            <source src="assets/video/grand-home-builders-house-built-video-walk-through_ci4r0y.mp4" type="video/mp4" />
            
         </video>
                  </div>
                  <div className="container">
                  <div className="row align-items-center justify-content-center">
                     <div className="col-lg-10">
                        <div className="hero-style5 text-center">
                        <h1 className="hero-title text-white">
                           <span className={`title1 ${triggerAnimation ? "slideindown" : ""}`} style={{ animationDelay: "0.3s" }}>
                              Where lasting memories meet
                           </span>
                           <span className={`title2 ${triggerAnimation ? "slideindown" : ""}`}  style={{ animationDelay: "0.4s" }}>
                              enduring design
                           </span>
                        </h1>
                        <Link to="property.html" className={`th-btn style4 th-btn-icon ${triggerAnimation ? "slideinup" : ""}`} style={{ animationDelay: "0.6s" }}>
                           Request A Visit
                        </Link>
                        </div>
                     </div>
                  </div>
                  </div>
               </div>
            </SwiperSlide>

            <SwiperSlide>
               <div className="hero-inner">
                  <div
                  className="th-hero-bg"
                  // style={{ backgroundImage: `url(assets/img/hero/hero_bg_5_3.jpg)` }}
                  >
                       <video 
            className="video-bg" 
            autoPlay 
            loop 
            muted 
            playsInline
         >
            <source src="assets/video/grand-home-builders-house-built-video-walk-through_ci4r0y.mp4" type="video/mp4" />
            
         </video>  
                  </div>
                  <div className="container">
                  <div className="row align-items-center justify-content-center">
                     <div className="col-lg-10">
                        <div className="hero-style5 text-center">
                        <h1 className="hero-title text-white">
                           <span className={`title1 ${triggerAnimation ? "slideindown" : ""}`} style={{ animationDelay: "0.3s" }}>
                              Discover Your Comfortable
                           </span>
                           <span className={`title2 ${triggerAnimation ? "slideindown" : ""}`} style={{ animationDelay: "0.4s" }}>
                              & Flexible Living House
                           </span>
                        </h1>
                        <Link to="property.html" className={`th-btn style4 th-btn-icon ${triggerAnimation ? "slideinup" : ""}`} style={{ animationDelay: "0.6s" }}>
                           Request A Visit
                        </Link>
                        </div>
                     </div>
                  </div>
                  </div>
               </div>
            </SwiperSlide>
            </Swiper>

            {/* Custom Pagination */}
            <div ref={paginationRef} className="slider-pagination style4" ></div>

            {/* Social Links */}
            {/* <div className="hero-social-link">
            <div className="social-wrap">
               <Link to="https://facebook.com/">FACEBOOK</Link>
               <Link to="https://instagram.com/">INSTAGRAM</Link>
               <Link to="https://twitter.com/">TWITTER</Link>
            </div>
            </div> */}

            {/* Scroll Down */}
            <div className="scroll-down">
            <Link to="#property-sec" className="hero-scroll-wrap"></Link>
            </div>
      </div>
    </>
  )
}

export default HomeBanner