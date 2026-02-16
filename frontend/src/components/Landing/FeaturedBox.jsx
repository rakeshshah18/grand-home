import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderDragCursor from "../../commoncomponents/SliderDragCursor";
import { Link } from "react-router-dom";

const FeaturedBox = () => {
    const [isHovered, setIsHovered] = useState(false);
    const properties = [
        {
            id: 1,
            img: "assets/img/property/chestermere.jpg",
            title: "Chestermere",
            location: "Inner Circular Lamar Street, Houston, Texas",
            bed: 4,
            bath: 2,
            sqft: 1500,
        },
        {
            id: 2,
            img: "assets/img/property/property3-2.png",
            title: "Inner City",
            location: "Inner Circular Lamar Street, Houston, Texas",
            bed: 4,
            bath: 2,
            sqft: 1500,
        },
        {
            id: 3,
            img: "assets/img/property/property3-3.png",
            title: "Apartments Auckland",
            location: "Inner Circular Lamar Street, Houston, Texas",
            bed: 4,
            bath: 2,
            sqft: 1500,
        },
        {
            id: 4,
            img: "assets/img/property/property3-4.png",
            title: "Kledokan Residence",
            location: "Inner Circular Lamar Street, Houston, Texas",
            bed: 4,
            bath: 2,
            sqft: 1500,
        },
        {
            id: 5,
            img: "assets/img/property/property3-5.png",
            title: "Permai Residence",
            location: "Inner Circular Lamar Street, Houston, Texas",
            bed: 4,
            bath: 2,
            sqft: 1500,
        },
        {
            id: 6,
            img: "assets/img/property/property3-6.png",
            title: "Taman Serenity",
            location: "Inner Circular Lamar Street, Houston, Texas",
            bed: 4,
            bath: 2,
            sqft: 1500,
        },
    ];

  return (
    <>
        {/* <!-- slider drag cursor --> */}
        <SliderDragCursor isVisible={isHovered} />
        {/* <div className="slider-drag-cursor"><i className="fas fa-angle-left me-2"></i>Grand Home<i className="fas fa-angle-right ms-2"></i></div> */}
        {/* <!--============================== Property Area 2 ==============================--> */}
        <section className="space" id="property-sec">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                <div className="col-xxl-6 col-lg-8">
                    <div className="title-area">
                        <span className="sub-title">Featured Listing</span>
                        <h2 className="sec-title text-theme">Experience Luxury Living at Waterford Estates </h2>
                        <p className="text-theme">Quis nulla blandit vulputate morbi adipiscing sem vestibulum. Nulla turpis integer dui sed posuere sem. Id molestie mi arcu gravida lorem potenti.</p>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="sec-btn">
                        <Link to="property.html" className="th-btn style4 th-btn-icon">View All Properties</Link>
                    </div>
                </div>
                </div>
                {/* <div className="slider-area property-slider2 slider-drag-wrap z-index-common">
                <div className="swiper th-slider" data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"2"},"1200":{"slidesPerView":"3"},"1500":{"slidesPerView":"3"}},"spaceBetween":"24","grabCursor":"true","slideToClickedSlide":"true"}'>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="property-card3 style-border">
                            <div className="property-card-thumb img-shine">
                                <img src="assets/img/property/chestermere.jpg" alt="img" />
                            </div>
                            <div className="property-card-details">
                                <h4 className="property-card-title"><Link to="property-details.html">
                                    Chestermere</Link>
                                </h4>
                                <p className="property-card-location"><i className="far fa-map-marker-alt me-2"></i>Inner Circular Lamar Street, Houston, Texas</p>
                                
                                <div className="property-card-meta">
                                    <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                            
                            </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-card3 style-border">
                            <div className="property-card-thumb img-shine">
                                <img src="assets/img/property/property3-2.png" alt="img" />
                            </div>
                            <div className="property-card-details">
                                <h4 className="property-card-title"><Link to="property-details.html">Inner City</Link></h4>
                                <p className="property-card-location"><i className="far fa-map-marker-alt me-2"></i>Inner Circular Lamar Street, Houston, Texas</p>
                                
                                <div className="property-card-meta">
                                    <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-card3 style-border">
                            <div className="property-card-thumb img-shine">
                                <img src="assets/img/property/property3-3.png" alt="img" />
                            </div>
                            <div className="property-card-details">
                                <h4 className="property-card-title"><Link to="property-details.html">Apartments Auckland</Link></h4>
                                <p className="property-card-location"><i className="far fa-map-marker-alt me-2"></i>Inner Circular Lamar Street, Houston, Texas</p>
                                
                                <div className="property-card-meta">
                                    <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-card3 style-border">
                            <div className="property-card-thumb img-shine">
                                <img src="assets/img/property/property3-4.png" alt="img" />
                            </div>
                            <div className="property-card-details">
                                <h4 className="property-card-title"><Link to="property-details.html">Kledokan Residence</Link></h4>
                                <p className="property-card-location"><i className="far fa-map-marker-alt me-2"></i>Inner Circular Lamar Street, Houston, Texas</p>
                                <p className="property-card-text">Egestas fringilla phasellus faucibus scelerisque eleifend donec. Porta nibh venenatis.</p>
                                <div className="property-card-meta">
                                    <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-card3 style-border">
                            <div className="property-card-thumb img-shine">
                                <img src="assets/img/property/property3-5.png" alt="img" />
                            </div>
                            <div className="property-card-details">
                                <h4 className="property-card-title"><Link to="property-details.html">Permai Resience</Link></h4>
                                <p className="property-card-location"><i className="far fa-map-marker-alt me-2"></i>Inner Circular Lamar Street, Houston, Texas</p>
                                <p className="property-card-text">Egestas fringilla phasellus faucibus scelerisque eleifend donec. Porta nibh venenatis.</p>
                                <div className="property-card-meta">
                                    <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="property-card3 style-border">
                            <div className="property-card-thumb img-shine">
                                <img src="assets/img/property/property3-6.png" alt="img" />
                            </div>
                            <div className="property-card-details">
                                <h4 className="property-card-title"><Link to="property-details.html">Taman Serenity</Link></h4>
                                <p className="property-card-location"><i className="far fa-map-marker-alt me-2"></i>Inner Circular Lamar Street, Houston, Texas</p>
                                <p className="property-card-text">Egestas fringilla phasellus faucibus scelerisque eleifend donec. Porta nibh venenatis.</p>
                                <div className="property-card-meta">
                                    <span><img src="assets/img/icon/property-icon1-1.svg" alt="img" />Bed 4</span>
                                    <span><img src="assets/img/icon/property-icon1-2.svg" alt="img" />Bath 2</span>
                                    <span><img src="assets/img/icon/property-icon1-3.svg" alt="img" />1500 sqft</span>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                        <div className="property-card3 style-border">
                        <div className="property-card-thumb img-shine">
                            <img src={property.img} alt={property.title} />
                        </div>
                        <div className="property-card-details">
                            <h4 className="property-card-title"
                            onMouseEnter={() => setIsHovered(false)}
                            onMouseLeave={() => setIsHovered(true)}>
                            <Link to="property-details.html">{property.title}</Link>
                            </h4>
                            <p className="property-card-location">
                            <i className="far fa-map-marker-alt me-2"></i>
                            {property.location}
                            </p>
                            <div className="property-card-meta">
                            <span>
                                <img src="assets/img/icon/property-icon1-1.svg" alt="bed" />
                                Bed {property.bed}
                            </span>
                            <span>
                                <img src="assets/img/icon/property-icon1-2.svg" alt="bath" />
                                Bath {property.bath}
                            </span>
                            <span> 
                                <img src="assets/img/icon/property-icon1-3.svg" alt="sqft" />
                                {property.sqft} sqft
                            </span>
                            </div>
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

export default FeaturedBox