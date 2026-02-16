import React, { useEffect   } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "magnific-popup/dist/magnific-popup.css";
import "magnific-popup";
import { Link } from "react-router-dom";

const Bownesses = () => {
      // popup
      useEffect(() => {
        const checkElements = setInterval(() => {
          if ($(".popup-image").length > 0) {
            clearInterval(checkElements);
            
            $(".popup-image").magnificPopup({
              type: "image",
              mainClass: "mfp-zoom-in",
              removalDelay: 260,
              gallery: { enabled: true },
            });
          }
        }, 500);
      
        return () => clearInterval(checkElements);
      }, []);
    
    // 
    const divStyle = {
      position: 'absolute ',
      height: '100%' ,
       width: '100%' ,
        inset: '0px' ,
        color: 'transparent', 
    };
    const textCenter={
      textAlign:'center'
    }
    const breadcrumb = [
      { name: "Home", url: "/" },
      { name: "Projects" },
    ];
  
  
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
              <h1 className="breadcumb-title">Bowness</h1>
              <ul className="breadcumb-menu">
                <li><a href="/" data-discover="true">Home</a></li>
                <li>Bowness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* */}
    <section className="app-section">
      <div className="app-container with-width">
        <div className="section-title-holder">
          <br></br>
        <h2 className="sec-title text-theme mb-2" style={textCenter}>Bowness</h2>
        </div>

      <div>
      <div className="app-community-desc-container"> 
    


      <div className="app-project-images project-imagess">
      <div className="item-image"> <a  href="assets\img\bowness\img-1.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-1.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-2.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-2.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-3.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-3.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-4.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-4.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-5.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-5.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-6.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-6.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-7.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-7.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-8.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-8.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-9.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-9.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-10.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-10.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-11.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-11.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-12.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-12.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-13.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-13.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-14.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-14.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-15.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-15.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-16.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-16.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-17.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-17.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-18.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-18.webp"  style={divStyle} /></a></div>
      <div className="item-image"> <a  href="assets\img\bowness\img-19.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\bowness\img-19.webp"  style={divStyle} /></a></div>
     </div>
     <br></br>
     <br></br>
 </div>
 </div>
      </div>
 
 {/*  */}

     </section>
    {/*  */}
  </>
  )
} 

export default Bownesses