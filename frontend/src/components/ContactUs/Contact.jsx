import React from 'react'
import Breadcrumb from '../../commoncomponents/Breadcrumb/Breadcrumb'
import { Link } from 'react-router-dom'

const Contact = () => { 
    const breadcrumb =[
        { name: "Home", url: "/" },
        { name: "Contact Us" },
    ]
  return (
    <>
        {/* <!--============================== Breadcumb ============================== --> */}
        <Breadcrumb title="Contact Us" links={breadcrumb} />
        {/* <!--============================== Contact Area  ==============================--> */}
        <div className="space">
            <div className="container">
                <div className="title-area text-center">
                    <span className="sub-title">Get In Touch</span>
                    <h2 className="sec-title text-theme">Our Contact Information</h2>
                </div>
                <div className="row gy-4 justify-content-center">
                    <div className="col-xl-4 col-lg-6">
                        <div className="about-contact-grid style2">
                            <div className="about-contact-icon">
                                <i className="fal fa-location-dot"></i>
                            </div>
                            <div className="about-contact-details">
                                <h6 className="about-contact-details-title">Our Address</h6>
                                <p className="about-contact-details-text">Unit 201, 4216 12 Street, NE,</p>
                                <p className="about-contact-details-text">Calgary, T2E 6K9 Canada</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                        <div className="about-contact-grid style2">
                            <div className="about-contact-icon">
                                <i className="fal fa-phone"></i>
                            </div>
                            <div className="about-contact-details">
                                <h6 className="about-contact-details-title">Phone Number</h6>
                                <p className="about-contact-details-text"><Link to="tel:01234567890"> +1 403 870 2770</Link></p>
                                <p className="about-contact-details-text"><Link to="tel:01234567890">+1 403 497 2220</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                        <div className="about-contact-grid style2">
                            <div className="about-contact-icon">
                                <i className="fal fa-envelope"></i>
                            </div>
                            <div className="about-contact-details">
                                <h6 className="about-contact-details-title">Email Address</h6>
                                <p className="about-contact-details-text"><Link to="mailto:sales@grandhomebuilder.ca">sales@grandhomebuilder.ca</Link></p>
                                <p className="about-contact-details-text"><Link to="mailto:info@grandhomebuilder.ca">info@grandhomebuilder.ca</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!--============================== Contact Area ==============================--> */}
        <div className="space contact-area-3 z-index-common" style={{position:"relative"}} data-bg-src="assets/img/bg/contact-bg-1-1.png" data-overlay="title" data-opacity="3" id="contact-sec">
            <div className="contact-bg-shape3-1 spin shape-mockup " style={{left:'12%', bottom:'5%'}} data-bottom="5%" data-left="12%">
                <img src="assets/img/shape/section_shape_2_1.jpg" alt="img" />
            </div>
            <div className="container">
                <div className="row gx-35">
                    <div className="col-lg-6">
                        <div className="appointment-wrap2 bg-white me-xxl-5">
                            <h2 className="form-title text-theme">Schedule a visit</h2>
                            <form action="https://html.themeholy.com/realar/demo/mail.php" method="POST" className="appointment-form ajax-contact">
                                <div className="row">
                                    <div className="form-group style-border style-radius col-12">
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Your Name*" />
                                        <i className="fal fa-user"></i>
                                    </div>
                                    <div className="form-group style-border style-radius col-12">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email*" />
                                        <i className="fal fa-envelope"></i>
                                    </div>
                                    <div className="form-group style-border style-radius col-md-12">
                                        <select name="subject" id="subject" className="form-select">
                                            <option value="" disabled selected hidden>Select Service Type</option>
                                            <option value="Real Estate">Real Estate</option>
                                            <option value="Apartment">Apartment</option>
                                            <option value="Residencial">Residencial</option>
                                            <option value="Deluxe">Deluxe</option>
                                        </select>
                                        <i className="fal fa-angle-down"></i>
                                    </div>
                                    <div className="col-12 form-group style-border style-radius">
                                        <i className="far fa-comments"></i>
                                        <textarea placeholder="Type Your Message" className="form-control"></textarea>
                                    </div>
                                    <div className="col-12 form-btn mt-4">
                                        <button className="th-btn">Submit Message <span className="btn-icon"><img src="assets/img/icon/paper-plane.svg" alt="img" /></span></button>
                                    </div>
                                </div>
                                <p className="form-messages mb-0 mt-3"></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="location-map contact-sec-map z-index-common">
                <div className="contact-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.7310056272386!2d89.2286059153658!3d24.00527418490799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b97badc6151%3A0x30b048c9fb2129bc!2sAngfuztheme!5e0!3m2!1sen!2sbd!4v1651028958211!5m2!1sen!2sbd" allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div className="location-map-address bg-theme">
                    <div className="thumb">
                        <img src="assets/img/property/property_inner_1.jpg" alt="img" />
                    </div>
                    <div className="media-body">
                        <h4 className="title">Site Location</h4>
                        <p className="text">Unit 201, 4216 12 Street NE Calgary</p>
                        <h4 className="title">Post Code:</h4>
                        <p className="text">T2E 6K9</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Contact