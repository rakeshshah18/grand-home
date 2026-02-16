import React from 'react'
import BackToTop from '../../commoncomponents/BackToTop/BackToTop'
import { Link } from 'react-router-dom';

const Footer = () => {
   const currentYear = new Date().getFullYear();

  return (
    <>
          {/* <!--============================== Footer Area ==============================--> */}
          <footer className="footer-wrapper footer-default bg-theme">
            <div className="widget-area">
                <div className="container">
                  <div className="row justify-content-between">
                      <div className="col-md-6 col-xl-auto">
                        <div className="widget footer-widget">
                            <div className="th-widget-about">
                              <div className="about-logo">
                                  <Link to="/"><img src="assets/img/logo-white-footer.png" alt="Grand Home" /></Link>
                              </div>
                              <p className="about-text">Grand Home Builders' reputation for excellence as a luxury custom home builder is founded on a steadfast commitment to professionalism, artisan craftsmanship, and exceptional customer service.</p>
                            </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-auto">
                        <div className="widget widget_nav_menu footer-widget">
                            <h3 className="widget_title">Useful Link</h3>
                            <div className="menu-all-pages-container">
                              <ul className="menu">
                                  <li><Link to="aboutus">About us</Link></li>
                                  <li><Link to="home_models.html">Blog</Link></li>
                                  <li><Link to="our_process.html">Our Process</Link></li>
                                  <li><Link to="careers">Careers</Link></li>
                              </ul>
                            </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-auto">
                        <div className="widget widget_nav_menu footer-widget">
                            <h3 className="widget_title">Communities</h3>
                            <div className="menu-all-pages-container"> 
                              <ul className="menu">
                                  <li><Link to="bowness">Bowness</Link></li>
                                  <li><Link to="skyview">Skyview</Link></li>
                                  <li><Link to="killarney">Killarney</Link></li>
                              </ul>
                            </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-auto">
                        <div className="widget footer-widget">
                            <h3 className="widget_title">Get In Touch</h3>
                            <div className="th-widget-contact">
                              <div className="info-box_text">
                                  <div className="icon"><img src="assets/img/icon/location-dot.svg" alt="img" /></div>
                                  <div className="details">
                                    <p>Unit 201, 4216 12 Street NE Calgary, T2E 6K9</p>
                                  </div>
                              </div>
                              <div className="info-box_text">
                                  <div className="icon">
                                    <img src="assets/img/icon/phone.svg" alt="img" />
                                  </div>
                                  <div className="details">
                                    <p><Link to="tel:+14038702770" className="info-box_link">+1 403 870 2770</Link></p>
                                    <p><Link to="tel:+14034972220" className="info-box_link">+1 403 497 2220</Link></p>
                                  </div>
                              </div>
                              <div className="info-box_text">
                                  <div className="icon">
                                    <img src="assets/img/icon/envelope.svg" alt="img" />
                                  </div>
                                  <div className="details">
                                    <p><Link to="mailto:sales@grandhomebuilder.ca" className="info-box_link">sales@grandhomebuilder.ca</Link></p>
                                    <p><Link to="mailto:info@grandhomebuilder.ca" className="info-box_link">info@grandhomebuilder.ca</Link></p>
                                  </div>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            <div className="copyright-wrap bg-light">
                <div className="container">
                  <div className="row gy-3 align-items-center">
                      <div className="col-lg-6">
                        <p className="copyright-text">
                            Copyright <i className="fal fa-copyright"></i> {currentYear} Grand Home Builders. All rights reserved.
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <div className="th-social justify-content-lg-end justify-content-center">
                            <Link to="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="https://www.twitter.com/"><i className="fab fa-twitter"></i></Link>
                            <Link to="https://www.instagram.com/"><i className="fab fa-youtube"></i></Link>
                            <Link to="https://www.instagram.com/"><i className="fab fa-instagram"></i></Link>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </footer>

      <BackToTop />
    </>
  )
}

export default Footer