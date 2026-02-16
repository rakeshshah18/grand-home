import React, { useEffect   } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "magnific-popup/dist/magnific-popup.css";
import "magnific-popup";
import { Link } from "react-router-dom";

 
const Projectses = () => {
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
      borderRadius: '10px',
  };
  const textCenter={
    textAlign:'center'
  }
  const darkcolor={
    color:'black',
    paddingLeft:'10px',
    paddingTop:'10px',
    margin:'20px',
    textDecoration:'none',
    fornSize:'18px'

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
                <h1 className="breadcumb-title">Projects</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/" data-discover="true">Home</a></li>
                  <li>Projects</li>
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
        <h2 className="sec-title text-theme mb-2" style={textCenter}>Projects</h2>
        </div>
        <div className="section-content">
        <div> </div> 
        <div> </div>
        <div>
        <div className="app-community-desc-container"> 
        <div className="app-projects type_communities">
        <Link to="/bowness" >
          <div className="item project-item">   
           <img alt="Bowness" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw"  src="assets\img\project\Bow-Cres-SW-Render-Upcoming.jpg"  />
        
           <h6 className="title" >Community - Bowness</h6>
        </div> 
        </Link>
        <Link to="/bowness" >
          <div className="item project-item">   
           <img alt="Bowness" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw"  src="assets\img\project\Bow-Cres-SW-Render.jpg"  />
        
           <h6 className="title" >Community - Panorama</h6>
        </div> 
        </Link>
        <Link to="/bowness" >
          <div className="item project-item">   
           <img alt="Bowness" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw"  src="assets\img\project\project_2_1.png"  />
        
           <h6 className="title" >Community - Killarney</h6>
        </div> 
        </Link>
        <Link to="/bowness" >
          <div className="item project-item">   
           <img alt="Bowness" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw"  src="assets\img\project\Skyview-Parade.jpg"  />
        
           <h6 className="title" >Community - Inner City Projects</h6>
        </div> 
        </Link>
       
          </div>
          <div>
            </div>
            <div>


        <div className="app-project-images project-imagess">
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-1.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-1.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-2.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-2.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-3.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-3.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-4.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-4.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-5.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-5.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-6.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-6.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-7.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-7.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-8.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-8.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-9.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-9.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-10.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-10.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-11.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-11.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-12.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-12.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-13.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-13.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-14.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-14.webp"  style={divStyle} /></a></div>
        <div className="item-image"> <a  href="assets\img\project\single-family\past-project-15.webp" className='popup-image'><img alt="single-family" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets\img\project\single-family\past-project-15.webp"  style={divStyle} /></a></div>
       </div>
       <br></br>
       <br></br>
   </div>
   </div>
   </div>
   </div> 
   </div>
   {/*  */}

       </section>
      {/*  */}
    </>
  ); 
};


export default Projectses;
