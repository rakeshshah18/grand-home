import React, { useEffect } from 'react'
import Breadcrumb from '../../commoncomponents/Breadcrumb/Breadcrumb'
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "magnific-popup";
import "magnific-popup/dist/magnific-popup.css";

const Aquae = () => {
    const breadcrumb =[
        { name: "Home", url: "/" },
        { name: "Toronto Townhouse" },
    ]

    useEffect(() => {
        const initImagePopup = () => {
          $('.popup-image').magnificPopup({
            type: 'image',
            mainClass: 'mfp-zoom-in',
            removalDelay: 260,
            gallery: { enabled: true },
          });
        };
    
        const initVideoPopup = () => {
          $('.popup-video').magnificPopup({
            type: 'iframe',
            removalDelay: 260,
            mainClass: 'mfp-zoom-in',
          });
        };
    
        initImagePopup();
        initVideoPopup();
    
        $('button[data-bs-toggle="tab"]').on('shown.bs.tab', () => {
          initImagePopup();
          initVideoPopup();
        });
    
        return () => {
          $('button[data-bs-toggle="tab"]').off('shown.bs.tab');
        };
    }, []);
  return (
    <>
        {/* <!--============================== Breadcumb ============================== --> */}
        <Breadcrumb title="Toronto Townhouse" links={breadcrumb} />
        {/* <!--============================== Property Page Area ==============================--> */}
        {/* <section className="space-top space-extra-bottom">
            <div className="container">
            
                <div className="row gx-30">
                    <div className="col-xl-12">
                        <div className="property-page-single">
                            <div className="page-content">
                        
                                <h2 className="page-title">The Aqua</h2>
                        <p className="mb-30">Our Modern Model house at Waterford Estates, brings together architectural innovation and contemporary design.</p>
                    
                                <h2 className="page-title mb-20">Property Overview</h2>
                                <ul className="property-grid-list">
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-1.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">ID NO.</h4>
                                            <p className="property-grid-list-text">#1234</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-2.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">Type</h4>
                                            <p className="property-grid-list-text">Residencial</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-3.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">Room</h4>
                                            <p className="property-grid-list-text">6</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-4.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">Bedroom</h4>
                                            <p className="property-grid-list-text">4</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-5.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">Bath</h4>
                                            <p className="property-grid-list-text">2</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-6.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">Purpose</h4>
                                            <p className="property-grid-list-text">For Rent</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-7.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">Sqft</h4>
                                            <p className="property-grid-list-text">4000</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-8.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">Parking</h4>
                                            <p className="property-grid-list-text">Yes</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-9.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">Elevator</h4>
                                            <p className="property-grid-list-text">Yes</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="property-grid-list-icon">
                                            <img src="assets/img/icon/property-single-icon1-10.svg" alt="img" />
                                        </div>
                                        <div className="property-grid-list-details">
                                            <h4 className="property-grid-list-title">Wifi</h4>
                                            <p className="property-grid-list-text">Yes</p>
                                        </div>
                                    </li>
                                </ul>
                                <h3 className="page-title mt-50 mb-30">From Our Gallery</h3>
                                <div className="row gy-4">
                                    <div className="col-xl-5">
                                        <div className="property-gallery-card">
                                            <div className="property-gallery-card-img">
                                                <img className="w-100" src="assets/img/property/property_inner_6.jpg" alt="img" />
                                            </div>
                                            <Link className="icon-btn popup-image" to="assets/img/property/property_inner_6.jpg"><i className="fal fa-magnifying-glass-plus"></i></Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-7">
                                        <div className="property-gallery-card">
                                            <div className="property-gallery-card-img">
                                                <img className="w-100" src="assets/img/property/property_inner_7.jpg" alt="img" />
                                            </div>
                                            <Link className="icon-btn popup-image" to="assets/img/property/property_inner_7.jpg"><i className="fal fa-magnifying-glass-plus"></i></Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-7">
                                        <div className="property-gallery-card">
                                            <div className="property-gallery-card-img">
                                                <img className="w-100" src="assets/img/property/property_inner_8.jpg" alt="img" />
                                            </div>
                                            <Link className="icon-btn popup-image" to="assets/img/property/property_inner_8.jpg"><i className="fal fa-magnifying-glass-plus"></i></Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-5">
                                        <div className="property-gallery-card">
                                            <div className="property-gallery-card-img">
                                                <img className="w-100" src="assets/img/property/property_inner_9.jpg" alt="img" />
                                            </div>
                                            <Link className="icon-btn popup-image" to="assets/img/property/property_inner_9.jpg"><i className="fal fa-magnifying-glass-plus"></i></Link>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="page-title mt-50 mb-25">Features & amenities</h3>
                                <div className="row gy-3">
                                    <div className="col-xxl-3 col-sm-6">
                                        <div className="checklist">
                                            <ul>
                                                <li><i className="far fa-square-check"></i>Airconditioning</li>
                                                <li><i className="far fa-square-check"></i>Balcony</li>
                                                <li><i className="far fa-square-check"></i>Garage</li>
                                                <li><i className="far fa-square-check"></i>Landscaping</li>
                                                <li><i className="far fa-square-check"></i>Outdoor Kitchen</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-sm-6">
                                        <div className="checklist">
                                            <ul>
                                                <li><i className="far fa-square-check"></i>Barbeque</li>
                                                <li><i className="far fa-square-check"></i>Recreation</li>
                                                <li><i className="far fa-square-check"></i>Microwave</li>
                                                <li><i className="far fa-square-check"></i>Basketball</li>
                                                <li><i className="far fa-square-check"></i>Fireplace</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-sm-6">
                                        <div className="checklist">
                                            <ul>
                                                <li><i className="far fa-square-check"></i>24x7 Seccurity</li>
                                                <li><i className="far fa-square-check"></i>Indoor Game</li>
                                                <li><i className="far fa-square-check"></i>Pool</li>
                                                <li><i className="far fa-square-check"></i>Tanis Courts</li>
                                                <li><i className="far fa-square-check"></i>Internet</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-sm-6">
                                        <div className="checklist">
                                            <ul>
                                                <li><i className="far fa-square-check"></i>Jaguzzi</li>
                                                <li><i className="far fa-square-check"></i>Modern Kitchen</li>
                                                <li><i className="far fa-square-check"></i>Refrigerator</li>
                                                <li><i className="far fa-square-check"></i>Window Coverings</li>
                                                <li><i className="far fa-square-check"></i>Washer</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-lg-auto">
                                        <h3 className="page-title mt-50 mb-30">Floor Plan</h3>
                                    </div>
                                    <div className="col-lg-auto">
                                        <ul className="nav nav-tabs property-tab mt-50" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="floor-tab1" data-bs-toggle="tab" data-bs-target="#floor-tab1-pane" type="button" role="tab" aria-controls="floor-tab1-pane" aria-selected="true">First Floor</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="floor-tab2" data-bs-toggle="tab" data-bs-target="#floor-tab2-pane" type="button" role="tab" aria-controls="floor-tab2-pane" aria-selected="false">Second Floor</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="floor-tab3" data-bs-toggle="tab" data-bs-target="#floor-tab3-pane" type="button" role="tab" aria-controls="floor-tab3-pane" aria-selected="false">Third Floor</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="floor-tab4" data-bs-toggle="tab" data-bs-target="#floor-tab4-pane" type="button" role="tab" aria-controls="floor-tab4-pane" aria-selected="false">Top Garden </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="floor-tab1-pane" role="tabpanel" aria-labelledby="floor-tab1" tabindex="0">
                                        <div className="property-grid-plan">
                                        <div className="property-gallery-card">
                                            <div className="property-gallery-card-img">
                                                <img className="w-100" src="assets/img/property/property_inner_9.jpg" alt="img" />
                                            </div>
                                            <Link className="icon-btn popup-image" to="assets/img/property/property_inner_9.jpg"><i className="fal fa-magnifying-glass-plus"></i></Link>
                                        </div>
                                            <div className="property-grid-details">
                                                <h4 className="property-grid-title">First Floor </h4>
                                                <p className="property-grid-text">doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="floor-tab2-pane" role="tabpanel" aria-labelledby="floor-tab2" tabindex="0">
                                        <div className="property-grid-plan">
                                        <div className="property-gallery-card">
                                            <div className="property-gallery-card-img">
                                                <img className="w-100" src="assets/img/property/property_inner_9.jpg" alt="img" />
                                            </div>
                                            <Link className="icon-btn popup-image" to="assets/img/property/property_inner_9.jpg"><i className="fal fa-magnifying-glass-plus"></i></Link>
                                        </div>
                                            <div className="property-grid-details">
                                                <h4 className="property-grid-title">Second Floor </h4>
                                                <p className="property-grid-text">doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="floor-tab3-pane" role="tabpanel" aria-labelledby="floor-tab3" tabindex="0">
                                        <div className="property-grid-plan">
                                        <div className="property-gallery-card">
                                            <div className="property-gallery-card-img">
                                                <img className="w-100" src="assets/img/property/property_inner_9.jpg" alt="img" />
                                            </div>
                                            <Link className="icon-btn popup-image" to="assets/img/property/property_inner_9.jpg"><i className="fal fa-magnifying-glass-plus"></i></Link>
                                        </div>
                                            <div className="property-grid-details">
                                                <h4 className="property-grid-title">Third Floor </h4>
                                                <p className="property-grid-text">doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="floor-tab4-pane" role="tabpanel" aria-labelledby="floor-tab4" tabindex="0">
                                        <div className="property-grid-plan">
                                        <div className="property-gallery-card">
                                            <div className="property-gallery-card-img">
                                                <img className="w-100" src="assets/img/property/property_inner_10.jpg" alt="img" />
                                            </div>
                                            <Link className="icon-btn popup-image" to="assets/img/property/property_inner_10.jpg"><i className="fal fa-magnifying-glass-plus"></i></Link>
                                        </div>
                                            <div className="property-grid-details">
                                                <h4 className="property-grid-title">Top Garden </h4>
                                                <p className="property-grid-text">doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="page-title mt-50 mb-30">Property Video</h3>
                                <div className="video-box2 mb-30">
                                    <img src="assets/img/property/property_inner_3.jpg" alt="img" />
                                    <Link to="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn style4 popup-video"><i className="fa-sharp fa-solid fa-play"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </section> */}
        
        {/* <div className="space contact-area-3 z-index-common" style={{position:"relative"}} data-bg-src="assets/img/bg/contact-bg-1-1.png" data-overlay="title" data-opacity="3" id="contact-sec">
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
        </div> */}

              {/* Property Page Area */}
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="row gx-30">
            <div className="col-xl-12">
              <div className="property-page-single">
                <div className="page-content">
                  <h2 className="page-title">The Aqua</h2>
                  <p className="mb-30">
                    Our Modern Model house at Waterford Estates, brings together architectural innovation and contemporary design.
                  </p>

                  <h2 className="page-title mb-20">Property Overview</h2>
                  <ul className="property-grid-list">
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-1.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">ID NO.</h4>
                        <p className="property-grid-list-text">#1234</p>
                      </div>
                    </li>
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-2.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">Type</h4>
                        <p className="property-grid-list-text">Residencial</p>
                      </div>
                    </li>
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-3.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">Room</h4>
                        <p className="property-grid-list-text">6</p>
                      </div>
                    </li>
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-4.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">Bedroom</h4>
                        <p className="property-grid-list-text">4</p>
                      </div>
                    </li>
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-5.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">Bath</h4>
                        <p className="property-grid-list-text">2</p>
                      </div>
                    </li>
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-6.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">Purpose</h4>
                        <p className="property-grid-list-text">For Rent</p>
                      </div>
                    </li>
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-7.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">Sqft</h4>
                        <p className="property-grid-list-text">4000</p>
                      </div>
                    </li>
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-8.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">Parking</h4>
                        <p className="property-grid-list-text">Yes</p>
                      </div>
                    </li>
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-9.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">Elevator</h4>
                        <p className="property-grid-list-text">Yes</p>
                      </div>
                    </li>
                    <li>
                      <div className="property-grid-list-icon">
                        <img src="assets/img/icon/property-single-icon1-10.svg" alt="img" />
                      </div>
                      <div className="property-grid-list-details">
                        <h4 className="property-grid-list-title">Wifi</h4>
                        <p className="property-grid-list-text">Yes</p>
                      </div>
                    </li>
                  </ul>

                  <h3 className="page-title mt-50 mb-30">From Our Gallery</h3>
                  {/* Popup Gallery */}
                  <div className="row gy-4">
                    <div className="col-xl-5">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100" src="assets/img/property/property_inner_6.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_6.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-7">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100" src="assets/img/property/property_inner_7.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_7.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-7">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100" src="assets/img/property/property_inner_8.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_8.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-5">
                      <div className="property-gallery-card">
                        <div className="property-gallery-card-img">
                          <img className="w-100" src="assets/img/property/property_inner_9.jpg" alt="img" />
                        </div>
                        <a className="icon-btn popup-image" href="assets/img/property/property_inner_9.jpg">
                          <i className="fal fa-magnifying-glass-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Features & Amenities */}
                  <h3 className="page-title mt-50 mb-25">Features & amenities</h3>
                  <div className="row gy-3">
                    <div className="col-xxl-3 col-sm-6">
                      <div className="checklist">
                        <ul>
                          <li>
                            <i className="far fa-square-check"></i>Airconditioning
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Balcony
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Garage
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Landscaping
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Outdoor Kitchen
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-sm-6">
                      <div className="checklist">
                        <ul>
                          <li>
                            <i className="far fa-square-check"></i>Barbeque
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Recreation
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Microwave
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Basketball
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Fireplace
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-sm-6">
                      <div className="checklist">
                        <ul>
                          <li>
                            <i className="far fa-square-check"></i>24x7 Seccurity
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Indoor Game
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Pool
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Tanis Courts
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Internet
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-sm-6">
                      <div className="checklist">
                        <ul>
                          <li>
                            <i className="far fa-square-check"></i>Jaguzzi
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Modern Kitchen
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Refrigerator
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Window Coverings
                          </li>
                          <li>
                            <i className="far fa-square-check"></i>Washer
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="row align-items-center justify-content-between mt-50">
                    <div className="col-lg-auto">
                      <h3 className="page-title mb-30">Floor Plan</h3>
                    </div>
                    <div className="col-lg-auto">
                      <ul className="nav nav-tabs property-tab mt-50" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="floor-tab1"
                            data-bs-toggle="tab"
                            data-bs-target="#floor-tab1-pane"
                            type="button"
                            role="tab"
                            aria-controls="floor-tab1-pane"
                            aria-selected="true"
                          >
                            First Floor
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="floor-tab2"
                            data-bs-toggle="tab"
                            data-bs-target="#floor-tab2-pane"
                            type="button"
                            role="tab"
                            aria-controls="floor-tab2-pane"
                            aria-selected="false"
                          >
                            Second Floor
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="floor-tab3"
                            data-bs-toggle="tab"
                            data-bs-target="#floor-tab3-pane"
                            type="button"
                            role="tab"
                            aria-controls="floor-tab3-pane"
                            aria-selected="false"
                          >
                            Third Floor
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="floor-tab4"
                            data-bs-toggle="tab"
                            data-bs-target="#floor-tab4-pane"
                            type="button"
                            role="tab"
                            aria-controls="floor-tab4-pane"
                            aria-selected="false"
                          >
                            Top Garden
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="floor-tab1-pane"
                      role="tabpanel"
                      aria-labelledby="floor-tab1"
                      tabIndex="0"
                    >
                      <div className="property-grid-plan">
                        <div className="property-gallery-card">
                          <div className="property-gallery-card-img">
                            <img
                              className="w-100"
                              src="assets/img/property/property_inner_9.jpg"
                              alt="img"
                            />
                          </div>
                          <a
                            className="icon-btn popup-image"
                            href="assets/img/property/property_inner_9.jpg"
                          >
                            <i className="fal fa-magnifying-glass-plus"></i>
                          </a>
                        </div>
                        <div className="property-grid-details">
                          <h4 className="property-grid-title">First Floor</h4>
                          <p className="property-grid-text">
                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="floor-tab2-pane"
                      role="tabpanel"
                      aria-labelledby="floor-tab2"
                      tabIndex="0"
                    >
                      <div className="property-grid-plan">
                        <div className="property-gallery-card">
                          <div className="property-gallery-card-img">
                            <img
                              className="w-100"
                              src="assets/img/property/property_inner_9.jpg"
                              alt="img"
                            />
                          </div>
                          <a
                            className="icon-btn popup-image"
                            href="assets/img/property/property_inner_9.jpg"
                          >
                            <i className="fal fa-magnifying-glass-plus"></i>
                          </a>
                        </div>
                        <div className="property-grid-details">
                          <h4 className="property-grid-title">Second Floor</h4>
                          <p className="property-grid-text">
                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="floor-tab3-pane"
                      role="tabpanel"
                      aria-labelledby="floor-tab3"
                      tabIndex="0"
                    >
                      <div className="property-grid-plan">
                        <div className="property-gallery-card">
                          <div className="property-gallery-card-img">
                            <img
                              className="w-100"
                              src="assets/img/property/property_inner_9.jpg"
                              alt="img"
                            />
                          </div>
                          <a
                            className="icon-btn popup-image"
                            href="assets/img/property/property_inner_9.jpg"
                          >
                            <i className="fal fa-magnifying-glass-plus"></i>
                          </a>
                        </div>
                        <div className="property-grid-details">
                          <h4 className="property-grid-title">Third Floor</h4>
                          <p className="property-grid-text">
                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="floor-tab4-pane"
                      role="tabpanel"
                      aria-labelledby="floor-tab4"
                      tabIndex="0"
                    >
                      <div className="property-grid-plan">
                        <div className="property-gallery-card">
                          <div className="property-gallery-card-img">
                            <img
                              className="w-100"
                              src="assets/img/property/property_inner_10.jpg"
                              alt="img"
                            />
                          </div>
                          <a
                            className="icon-btn popup-image"
                            href="assets/img/property/property_inner_10.jpg"
                          >
                            <i className="fal fa-magnifying-glass-plus"></i>
                          </a>
                        </div>
                        <div className="property-grid-details">
                          <h4 className="property-grid-title">Top Garden</h4>
                          <p className="property-grid-text">
                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property Video */}
                  <h3 className="page-title mt-50 mb-30">Property Video</h3>
                  <div className="video-box2 mb-30">
                    <img src="assets/img/property/property_inner_3.jpg" alt="img" />
                    <a href="https://www.youtube.com/watch?v=_sI_Ps7JSEk" className="play-btn style4 popup-video">
                      <i className="fa-sharp fa-solid fa-play"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Area */}
      <div
        className="space contact-area-3 z-index-common"
        data-bg-src="assets/img/bg/contact-bg-1-1.png"
        data-overlay="title"
        data-opacity="3"
        id="contact-sec"
        style={{position:"relative"}}
      >
        <div className="contact-bg-shape3-1 spin shape-mockup" style={{left:'12%', bottom:'5%'}} data-bottom="5%" data-left="12%">
          <img src="assets/img/shape/section_shape_2_1.jpg" alt="img" />
        </div>
        <div className="container">
          <div className="row gx-35">
            <div className="col-lg-6">
              <div className="appointment-wrap2 bg-white me-xxl-5">
                <h2 className="form-title text-theme">Schedule a visit</h2>
                <form
                  action="https://html.themeholy.com/realar/demo/mail.php"
                  method="POST"
                  className="appointment-form ajax-contact">
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
                        <option value="" disabled selected hidden>
                          Select Service Type
                        </option>
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
                      <button className="th-btn">
                        Submit Message{' '}
                        <span className="btn-icon">
                          <img src="assets/img/icon/paper-plane.svg" alt="img" />
                        </span>
                      </button>
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.7310056272386!2d89.2286059153658!3d24.00527418490799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b97badc6151%3A0x30b048c9fb2129bc!2sAngfuztheme!5e0!3m2!1sen!2sbd!4v1651028958211!5m2!1sen!2sbd"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
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

export default Aquae