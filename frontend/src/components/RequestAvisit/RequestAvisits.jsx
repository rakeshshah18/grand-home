import React from 'react'
const RequestAvisits = () => {
    const breadcumbStyle = {
        backgroundImage: `url("assets/img/bg/breadcumb-bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "150px 0",
        textAlign: "center",
        color: "#fff"
      };
  return (
    <>   
    <div className="breadcumb-wrapper" style={breadcumbStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Request A Visit </h1>
                <ul className="breadcumb-menu">
                  <li><a href="/" data-discover="true">Home</a></li>
                  <li>Request A Visit</li>
                </ul>
              </div>
            </div>
          </div> 
        </div>
      </div>
      {/* */} 
    {/* <!--============================== Contact Area ==============================--> */}
    <div className=" pb-5 pt-5"  >
            <div >
                <div >
                    <div className="container">
                        <div className="contact-wrap4">
                        <div className="row g-0">
                            <div className="col-lg-6">
                                <div className="appointment-wrap2 bg-white">
                                    <h2 className="form-title text-theme">Schedule a visit</h2>
                                    <form action="https://html.themeholy.com/realar/demo/mail.php" method="POST" className="appointment-form ajax-contact">
                                    <div className="row">
                                        <div className="form-group style-border style-radius col-12">
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Your Name*" />
                                            <i className="fal fa-user"></i>
                                        </div>
                                        <div className="form-group style-border style-radius col-12">
                                            <input type="number" className="form-control" name="number" id="number" placeholder="Your Phone Number*" />
                                            <i className="fal fa-user"></i>
                                        </div>
                                        <div className="form-group style-border style-radius col-12">
                                            <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" />
                                            <i className="fal fa-envelope"></i>
                                        </div>
                                        <div className="form-group style-border style-radius col-md-12">
                                            {/* <select name="subject" id="subject" className="form-select">
                                                <option value="" disabled selected hidden>Select Service Type</option>
                                                <option value="Real Estate">Real Estate</option>
                                                <option value="Apartment">Apartment</option>
                                                <option value="Residencial">Residencial</option>
                                                <option value="Deluxe">Deluxe</option>
                                            </select> */}
 
                                            <input type="text" className="form-control" name="Communities" id="Communities" placeholder="Your Communities" />
                                            {/* <i className="fal fa-angle-down"></i> */}
                                            <i className="fal fa-user"></i>
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
                            <div className="col-lg-6">
                                <div className="contact-thumb4-1">
                                    <img src="assets/img/normal/contact_thumb_4_1.png" alt="img" />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  ) 
}

export default RequestAvisits