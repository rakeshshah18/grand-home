import React, { useRef } from 'react'
import Breadcrumb from '../../commoncomponents/Breadcrumb/Breadcrumb'
import AboutUsBox from '../SharedSection/AboutUsBox'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';

const Aboutus = () => {
    const swiperRef = useRef(null);
    const breadcrumb =[
        { name: "Home", url: "/" },
        { name: "About Us" },
    ]


    const teamMembers = [
        { id: 1, name: "Janny Wilson", role: "Property Expert", image: "assets/img/team/team_2_1.png" },
        { id: 2, name: "Andrew Richard", role: "Property Expert", image: "assets/img/team/team_2_2.png" },
        { id: 3, name: "Zarin Wilson", role: "Property Expert", image: "assets/img/team/team_2_3.png" },
        { id: 4, name: "Michel Smith", role: "Property Expert", image: "assets/img/team/team_2_4.png" }
    ];

  return (
    <>
        {/* <!--============================== Breadcumb ============================== --> */}
        <Breadcrumb title="About Us" links={breadcrumb} />
    
    {/* <!--============================== About Area ==============================--> */}
        <AboutUsBox />
      
    <div className="overflow-hidden space" id="about-sec" style={{position:"relative"}}>
        {/* <div className="sec-bg-shape2-1 spin shape-mockup d-xl-block d-none" data-bottom="25%" data-right="12%">
            <img src="assets/img/shape/section_shape_2_1.jpg" alt="img" />
        </div> */}
        <div className="sec-bg-shape2-1 jump shape-mockup d-xl-block d-none" style={{left:'5%', bottom:'0px'}} data-bottom="0%" data-left="5%">
        <img src="assets/img/shape/home.jpg" alt="img" style={{width:'100px', height:'100px'}}/>
        </div>
        <div className="container">
            <div className="about-page-wrap">
                <div className="row gy-40 justify-content-between align-items-center">
                    <div className="col-lg-6">
                        <div className="title-area mb-0">
                            <h2 className="sec-title text-theme mb-2">Mission</h2>
                            <p className="mb-0 text-theme">Grand Home Builders is committed to creating outstanding luxury custom homes by blending expert craftsmanship, professional dedication, and an unwavering focus on exceptional customer service. Our collaborative approach ensures every home is a true reflection of your vision and quality. </p>
                            
                           
                              <h2 className="sec-title text-theme mb-2 mt-2">Vission</h2>
                            <p className="text-theme">To be the premier choice in luxury custom home construction, recognized for our innovative designs, exceptional craftsmanship, and unwavering commitment to creating homes that inspire and enrich the lives of our clients. We strive to set new standards of quality and sophistication, building not just homes, but legacies that stand the test of time.</p>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="img-box3">
                            <div className="img1">
                                <img src="assets/img/normal/about_3_1.png" alt="About" />
                            </div>
                            <div className="about-tag">
                                <div className="about-experience-tag">
                                    {/* <span className="circle-title-anime">Realar Living Solutions</span> */}
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
                                            Realar Living Solutions
                                            </textPath>
                                            </text>
                                        </svg>
                                    </div>
                                </div>
                                <Link to="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn popup-video"><i className="fa-sharp fa-solid fa-play"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="img-box3">
                            <div className="img1">
                                <img src="assets/img/normal/about_3_2.png" alt="About" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                    <h2 className="sec-title text-theme mb-2">Build Services</h2>
                        <p className="text-theme">Grand Home Builders boasts a vast network of skilled tradespeople dedicated to delivering your new home on time and within budget. As the affordable choice in today’s booming real estate market, we prioritize efficiency without compromising quality. While many builders take over a year to complete a home after securing permits, we at Grand Home Builders are committed to ensuring your home is ready for occupancy in 6 months or less. We believe in delivering results quickly, so you can move into your dream home sooner.</p>
                    </div>
                    
                    <div className="col-lg-6">
                        <br></br>
                    <h2 className="sec-title text-theme mb-2">Design Services</h2>
                        <p className="text-theme">With a team of skilled architects, engineers, and a certified urban planner, Grand Home Builders is fully equipped to help you design your dream home, navigate the Committee of Adjustments, and secure permits from the City of Calgary. Whether you're envisioning a modern masterpiece or a timeless classic, we'll work closely with you to bring your perfect luxury custom home to life. As an experienced home builder in Calgary, we’re here to answer any questions you have—feel free to reach out to us by phone or email!</p>
                        <div className="about-wrap2 style-theme mt-50">
                            <div className="checklist style4">
                                <ul>
                                    <li><img src="assets/img/icon/checkmark.svg" alt="img" />Excellence in Craftsmanship</li>
                                    <li><img src="assets/img/icon/checkmark.svg" alt="img" />Client-Focused Satisfaction Guarantee</li>
                                    <li><img src="assets/img/icon/checkmark.svg" alt="img" />Experienced & Dedicated Team</li>
                                    <li><img src="assets/img/icon/checkmark.svg" alt="img" />Timely and Efficient Execution</li>
                                </ul>
                            </div>
                            <div className="call-btn">
                                <div className="d-flex ">
                                <div className="icon-btn bg-theme">
                                    <img src="assets/img/icon/phone.svg" alt="img" />
                                </div>
                                <div className="btn-content">
                                    <h6 className="btn-title text-theme  call-us">Call Us</h6>
                                </div>
                                </div>
                               
                                <div className="btn-content">
                                    <span className="btn-text"><Link className="text-theme" to="tel:4038702770">403 870 2770</Link></span>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="col-lg-6"> 
                        <div className="img-box3">
                            <div className="img1">
                                <img src="assets/img/aboutus-img/img.png" alt="About" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    {/* <!--============================== Team Area ==============================--> */}
    <section className="space bg-theme">
        {/* <div className="sec-bg-shape2-3 jump shape-mockup d-xxl-block d-none text-white" data-bottom="5%" data-right="8%">
            <img src="assets/img/shape/about-shap.png" alt="img" />
        </div> */}
        <div className="container">
            <div className="row justify-content-lg-between align-items-center">
                <div className="col-lg-6">
                    <div className="title-area">
                        <h2 className="sec-title text-white">Meet The Awesome Team</h2>
                        <p className="text-light">Realar help you easily create a real estate trading website. With the function Register, Login, Post real estate news.</p>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="sec-btn">
                        <Link to="team.html" className="th-btn style-border th-btn-icon">View All Team</Link>
                    </div>
                </div>
            </div>

            <div className="slider-area team-slider3">
                {/* Custom Navigation Buttons */}
                <button className="slider-arrow style6 slider-prev" onClick={() => swiperRef.current?.slidePrev()} >
                    <img src="assets/img/icon/arrow-left.svg" alt="Previous" />
                </button>
                
                <button className="slider-arrow style6 slider-next" onClick={() => swiperRef.current?.slideNext()} >
                    <img src="assets/img/icon/arrow-right.svg" alt="Next" />
                </button>

            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                576: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1400: { slidesPerView: 3 },
                }}
                // navigation
                // pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {teamMembers.map((member) => (
                <SwiperSlide key={member.id}>
                    <div className="th-team team-card style3">
                    <div className="img-wrap">
                        <div className="team-img">
                        <img src={member.image} alt={member.name} />
                        </div>
                        <div className="th-social-wrap">
                        <div className="th-social">
                            <Link target="_blank" rel="noopener noreferrer" to="https://facebook.com/">
                            <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link target="_blank" rel="noopener noreferrer" to="https://twitter.com/">
                            <i className="fab fa-twitter"></i>
                            </Link>
                            <Link target="_blank" rel="noopener noreferrer" to="https://linkedin.com/">
                            <i className="fab fa-linkedin-in"></i>
                            </Link>
                            <Link target="_blank" rel="noopener noreferrer" to="https://youtube.com/">
                            <i className="fab fa-youtube"></i>
                            </Link>
                            <Link target="_blank" rel="noopener noreferrer" to="https://instagram.com/">
                            <i className="fab fa-instagram"></i>
                            </Link>
                        </div>
                        <Link className="icon-btn" to="team-details.html">
                            <img src="assets/img/icon/arrow-right.svg" alt="arrow" />
                        </Link>
                        </div>
                    </div>
                    <div className="team-card-content">
                        <div className="media-left">
                        <h3 className="box-title">
                            <Link to="team-details.html">{member.name}</Link>
                        </h3>
                        <span className="team-desig">{member.role}</span>
                        </div>
                        <Link className="icon-btn" to="tel:09876543210">
                        <img src="assets/img/icon/phone.svg" alt="phone" />
                        </Link>
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

export default Aboutus