import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderDragCursor from "../../commoncomponents/SliderDragCursor";
import { Link } from "react-router-dom";

const WaterfordEstatess = () => {
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
  // slider
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
  // slider
  // testmoneal
    // 
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
                <h1 className="breadcumb-title">Waterford Estatess</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/" data-discover="true">Home</a></li>
                  <li>Waterford Estatess</li>
                </ul>
              </div>
            </div>
          </div> 
        </div>
      </div>
      {/*  */}
      <section className="app-section">
        <div className="app-container with-width">
        <div className="section-title-holder">
          <br></br>
        <h2 className="sec-title text-theme mb-2" style={textCenter}>Waterford Estates</h2>
        </div>
        <div className="app-container with-width"><div className="app-community-desc-container">
          <p>Welcome to Waterford Estates, an exclusive neighborhood that epitomizes luxurious living. As a resident of Waterford Estates, you'll discover a truly exquisite lifestyle that blends elegance with natural beauty. Located by the serene Chestermere Lake, residents of Waterford Estates enjoy breathtaking views and a wealth of recreational opportunities at the Lakeside Golf Club.</p>
          <p>For families, the neighborhood offers the advantage of being close to highly regarded schools, ensuring a top-notch education for your children. Embrace the convenience of having the East Hills Shopping Centre just moments away, providing a diverse array of retail, dining, and entertainment options to suit your every desire.</p>
          <p>With quick and easy connectivity to downtown Calgary, residents will have effortless access to the city's vibrant cultural scene and urban amenities. Additionally, the neighborhood's proximity to the airport ensures that your travel experiences are smooth and hassle-free.</p>
          <p>At Waterford Estates, we understand the importance of personalized luxury, and our esteemed team at Grand Home Builders is committed to crafting homes that reflect your unique vision and preferences. Experience refined living like never before, where luxury, convenience, and the splendor of natural surroundings converge to create an unparalleled living experience in Calgary.</p>
          </div>
          </div>
          {/*  */}
          <div className="app-container with-width">
            <div className="app-community-lot-map-container">
              <div className="lot-map-image">
                <img alt="Waterford Estates" loading="lazy" width="1600" height="1067" decoding="async" data-nimg="1"   src="assets/img/waterford-estates/grand-home-builders.webp" /></div>
                <div className="lot-map-content">
                  <div className="section-title-holder centered py-8">
                    <h3 className="subtitle">Phase II</h3><h2 className="section-title">Lot Map</h2>
                    </div><div className="app-button flex justify-center items-center">
                      <a  className="app-btn app-btn-medium app-btn-filled app-icon-holder" ><span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Zm260-153L287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193Z"></path></svg>
                        </span>Download</a></div></div></div></div>
        </div> 
   {/*  */}
            <div className="app-section bg-alt">
              <div className="app-container with-width">
                <div className="section-title-holder py-8">
                  <h2 className="section-title">Amenities</h2></div><div className="amenities-list app-grid gap-twelve be-responsive with-three-columns">
                    <div className="amenity-item"><div className="section-title-holder"><div className="icon-wrapper">
                      <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 8-4 8 4"></path><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"></path><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"></path><path d="M18 5v17"></path><path d="M6 5v17"></path><circle cx="12" cy="9" r="2"></circle></svg></span>
                      </div>
                      <h5 className="section-subtitle">Schools</h5>
                      </div>
                      <div className="item"><p>OUR LADY OF WISDOM</p></div>
                      <div className="item"><p>RAINBOW CREEK ELEMENTARY SCHOOL</p></div>
                      <div className="item"><p>CHESTERMERE LAKE MIDDLE SCHOOL</p></div>
                      <div className="item"><p>CHESTERMERE HIGH SCHOOL</p></div></div>
                      <div className="amenity-item"><div className="section-title-holder">
                        <div className="icon-wrapper"><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 13V2l8 4-8 4"></path><path d="M20.55 10.23A9 9 0 1 1 8 4.94"></path><path d="M8 10a5 5 0 1 0 8.9 2.02"></path></svg></span></div>
                        <h5 className="section-subtitle">Golf Courses</h5></div>
                        <div className="item"><p>LAKESIDE GOLF COURSE</p></div></div>
                        <div className="amenity-item"><div className="section-title-holder">
                          <div className="icon-wrapper"><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"></path><path d="M7 16v6"></path><path d="M13 19v3"></path><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"></path></svg></span></div>
                          <h5 className="section-subtitle">Parks</h5></div><div className="item"><p>RAINBOW FALLS PARK</p></div>
                          <div className="item"><p>TRENNEN PARK</p></div><div className="item"><p>WESTECREEK PLAYGROUND</p></div>
                          <div className="item"><p>LAKEVIEW PLAYGROUND</p></div></div><div className="amenity-item">
                            <div className="section-title-holder">
                              <div className="icon-wrapper"><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"></path><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"></path></svg></span>
                              </div>
                              <h5 className="section-subtitle">Airports</h5></div>
                              <div className="item"><p>YYC AIRPORT - 25 MINUTE DRIVE</p></div></div>
                              <div className="amenity-item">
                                <div className="section-title-holder"><div className="icon-wrapper"><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></span></div>
                                <h5 className="section-subtitle">Locations</h5></div><div className="item"><p>17TH AVE &amp; HWY 1 - 10 MINUTE DRIVE</p></div></div></div></div></div>
       </section>
       {/* slider */}
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
                              <p>{slide.title}</p>
                              </h3>
                              <p className="portfolio-location">{slide.location}</p>
                            
                          </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
              </div>
        </div>
       {/* slider */}
    
        {/* testmoneal */}
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

        {/*testmoneal  */}
    </>
  )
}

export default WaterfordEstatess