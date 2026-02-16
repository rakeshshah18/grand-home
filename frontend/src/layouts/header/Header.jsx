import React, { useEffect, useRef, useState } from "react";
import CursorFollower from "../../commoncomponents/CursorFollower/CursorFollower";
import { Link } from "react-router-dom";

const Header = () => {
   const [isSticky, setSticky] = useState(false);
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

  

   useEffect(() => {
     const handleScroll = () => {
       setSticky(window.scrollY > 200); // Stick header after 100px scroll
     };
 
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
 


  return (
    <>
      {/* <!--============================== cursor follower cursor ==============================--> */}
      <CursorFollower />

      {/* <!--============================== Mobile Menu ============================== --> */}
      <div className="th-menu-wrapper onepage-nav">
         <div className="th-menu-area text-center">
            <button className="th-menu-toggle"><i className="fal fa-times"></i></button>
            <div className="mobile-logo">
               <Link to="/">
               <img src="assets/img/logo-white.svg" alt="Realar" />
               </Link>
            </div>
            <div className="th-mobile-menu">
               <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="aboutus"> About Us</Link></li>
                  <li className="menu-item-has-children">
                     <Link to="#">Communities</Link>
                     <ul className="sub-menu">
                        <li className="menu-item-has-children">
                           <Link to="">
                           Waterford Estates
                           </Link>
                           <ul className="sub-menu">
                              <li>
                                 <Link to="model.html">Model</Link>
                                 <ul className="sub-menu">
                                 <li><Link to="waterfordEstates">Waterford Estates</Link></li>
                                    <li><Link to="aqua">Aqua</Link></li>
                                    <li><Link to="daisy">Daisy</Link></li>
                                    <li><Link to="bruno">Bruno</Link></li>
                                    <li><Link to="contemporaryDaisy">Contemporary Daisy</Link></li>
                                    <li><Link to="charm">Charm</Link></li>
                                 </ul>
                              </li>
                              {/* <li><Link to="#">
                                 Model-2
                                 </Link>
                              </li> */}
                           </ul>
                        </li>
                        <li><Link to="bowness">Bowness</Link></li>
                        <li><Link to="skyview">Skyview</Link></li>
                        <li><Link to="killarney">Killarney</Link>
                        </li>
                     </ul>
                  </li>
                  <li><Link to="projects">Projects</Link></li>
                  <li><Link to="blog">Blog</Link></li>
                  <li><Link to="contactus">Contact Us</Link></li>
               </ul>
            </div>
         </div>
      </div>
      {/* <!--============================== Header Area ==============================--> */}
      <header className='th-header header-layout3'>
         <div className={`sticky-wrapper ${isSticky ? "sticky" : ""}`}>
            {/* <!-- Main Menu Area --> */}
            <div className="menu-area">
               <div className="container">
                  <div className="row align-items-center justify-content-between">
                     <div className="col-auto">
                           <div className="header-logo">
                              <Link to="/">
                              <img src="assets/img/logo-white.png" alt="Realar" />
                              </Link>
                           </div>
                     </div>
                     <div className="col-auto">
                        <nav className="main-menu d-none d-lg-inline-block">
                           <ul>
                              <li><Link to="/">Home</Link></li>
                              <li><Link to="aboutus"> About Us</Link></li>
                              <li className="menu-item-has-children">
                                 <Link to="#">Communities</Link>
                                 <ul className="sub-menu">
                                    <li className="menu-item-has-children">
                                       <Link to="">
                                       Waterford Estates
                                       </Link>
                                       <ul className="sub-menu">
                                          <li>
                                             <Link to="model.html">Model</Link>
                                             <ul className="sub-menu">
                                             <li><Link to="waterfordEstates">Waterford Estates</Link></li>
                                                <li><Link to="aqua">Aqua</Link></li>
                                                <li><Link to="daisy">Daisy</Link></li>
                                                <li><Link to="bruno">Bruno</Link></li>
                                                <li><Link to="contemporaryDaisy">Contemporary Daisy</Link></li>
                                                <li><Link to="charm">Charm</Link></li>
                                             </ul>
                                          </li>
                                          
                                       </ul>
                                    </li>
                                    <li><Link to="bowness">Bowness</Link></li>
                                    <li><Link to="skyview">Skyview</Link></li>
                                    <li><Link to="killarney">Killarney</Link>
                                    </li>
                                 </ul>
                              </li>
                              <li><Link to="projects">Projects</Link></li>
                              <li><Link to="blog">Blog</Link></li>
                              <li><Link to="contactus">Contact Us</Link></li>
                           </ul>
                        </nav>
                        <div className="header-button d-flex d-lg-none">
                           <button type="button" className="th-menu-toggle sidebar-btn">
                           <span className="line"></span>
                           <span className="line"></span>
                           <span className="line"></span>
                           </button>
                        </div>
                     </div>
                     <div className="col-auto d-none d-xl-block">
                        <div className="header-button">
                           <Link to="RequestAvisit" className="th-btn style-border th-btn-icon">Request A Visit</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>
    </>
  )
}

export default Header