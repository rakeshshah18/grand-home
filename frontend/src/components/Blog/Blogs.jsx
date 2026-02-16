
import React, { useEffect   } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "magnific-popup/dist/magnific-popup.css";
import "magnific-popup";
import { Link } from "react-router-dom";


const Blogs = () => {
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
      { name: "Blog" },
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
              <h1 className="breadcumb-title">Blog</h1>
              <ul className="breadcumb-menu">
                <li><a href="/" data-discover="true">Home</a></li>
                <li>Blog</li>
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
      {/* <h2 className="sec-title text-theme mb-2" style={textCenter}>Blog</h2> */}
      </div>
      <div className="section-content">
      <div> </div> 
      <div> </div>
      <div>
      <div className="app-community-desc-container"> 
      <div className="app-projects type_communities post-width">
        <div className="item">   
      <img alt="Bowness" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw"  src="assets/img/blog/blog-1.jpg"  />
      <h4 className="title-blog text-start">What is the difference between a custom home builder and a production home builder?</h4>
        <div className="post-excerpt">
        <p>Building a home is a significant investment, both financially and emotionally. It's essential to choose the right builder who can bring your vision to life while meeting your specific needs and expectations. Custom home builders and production home builders offer distinct approaches to home construction, each with its own set of benefits and considerations. 
        </p>
        </div>
      </div> 
      <div className="item">
      <img alt="Panorama" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw"  src="assets/img/blog/blog-2.png"  />
      <h4 className="title-blog">What is Grand Home Builders design philosophy? </h4>
      <div className="post-excerpt">
        <p>
        In addition to our emphasis on creating luxury homes, at Grand Home Builders, we recognize the importance of personalized design. We believe that each home should reflect the unique tastes and lifestyles of its occupants.
        </p>
        </div>
      </div>

      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/project/single-family/past-project-1.webp"   />
      <h4 className="title-blog">Community - Killarney</h4>
      <div className="post-excerpt">
      <p>
        If you're planning to build your custom home, then you should know that planning your design in advance is not just a preliminary step; it's the cornerstone of a successful and satisfying home-building journey.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-3.jpg"   />
      <h4 className="title-blog">Why planning your design is crucial before building?
      </h4>
      <div className="post-excerpt">
        <p>
        If you're planning to build your custom home, then you should know that planning your design in advance is not just a preliminary step; it's the cornerstone of a successful and satisfying home-building journey.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-4.png"   />
      <h4 className="title-blog">What does a luxury kitchen look like?</h4>
      <div className="post-excerpt">
        <p>
        Your kitchen is the heart of your home, where culinary delights are crafted and shared, and memories are made around the dinner table.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-5.png"   />
      <h4 className="title-blog">What are the benefits of custom home building?</h4>
      <div className="post-excerpt">
        <p>
        Building a home is a significant milestone, and opting for a custom-built residence can be a game-changer in achieving your dream living space. Unlike pre-existing structures, custom home building empowers you to tailor every aspect of your home to suit your unique lifestyle, preferences, and future needs. From the layout and architectural design to the choice of materials and finishes, the possibilities are endless.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-6.jpg"   />
      <h4 className="title-blog">What to consider when designing a new house?</h4>
      <div className="post-excerpt">
        <p>
        Designing a new house is an exciting venture that allows you to shape your living space according to your preferences and lifestyle. At Grand Home Builders, we understand the importance of thoughtful and strategic planning in the home design process. In this blog, we will explore key considerations to keep in mind when embarking on the journey of designing a new house, ensuring that your dream home becomes a reality.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-7.jpg"   />
      <h4 className="title-blog">What are 5 things you need to consider regarding location when building a new home?</h4>
      <div className="post-excerpt">
        <p>
        Choosing the right location for your new home is a decision that goes beyond the physical structure; it's about the community, amenities, and overall lifestyle. At Grand Home Builders, we understand the significance of selecting the perfect location for your dream home.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-8.jpg"   />
      <h4 className="title-blog">Why should I choose Grand Home Builders in Calgary?</h4>
      <div className="post-excerpt">
        <p>
        With a track record of over 9 years in the industry, Grand Home Builders is a distinguished choice for those seeking excellence in luxury custom home construction. Our unwavering commitment to crafting exceptional homes has solidified our reputation as one of Calgary's premier luxury home builders.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-7.jpg"   />
      <h4 className="title-blog">Why should you choose to live in Waterford Estates in Calgary?</h4>
      <div className="post-excerpt">
        <p>
        Have you been considering exploring the exquisite lifestyle that Waterford Estates in Calgary has to offer? This exclusive neighbourhood blends elegance with natural beauty and offers a wide range of amenities
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-9.png"   />
      <h4 className="title-blog">Why choose Grand Home Builders for your luxury house project?</h4>
      <div className="post-excerpt">
        <p>
        Are you planning to build a custom home in Calgary and the surrounding area? If yes, then you are reading the right blog. At Grand Home Builders, we recognize that your dream home is a manifestation of your unique vision, and our mission is to turn that vision into a reality. With over 9 years of unwavering dedication to crafting custom luxury homes, we stand as more than builders; we are artisans of dreams.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-10.png"   />
      <h4 className="title-blog">What is green architecture design?</h4>
      <div className="post-excerpt">
        <p>
        We believe that luxury is not just a statement, but a lifestyle curated with meticulous care for the environment. With that being said, let’s delve deep into the essence of eco-conscious opulence, unveiling the fusion of sustainable practices and lavish design. From the meticulous selection of eco-friendly materials to the seamless integration of biophilic elements, we invite you to embark on a journey where the harmony between luxury and sustainability is not just a possibility but a captivating reality.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-11.jpg"   />
      <h4 className="title-blog">Why do custom homes cost more?</h4>
      <div className="post-excerpt">
        <p>
        When it comes to building your dream home, opting for a custom-built residence offers the opportunity to create a space that truly reflects your lifestyle, preferences, and unique needs. However, one common misconception about custom homes is their higher price tag compared to standard builds.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-12.png"   />
      <h4 className="title-blog">Why should you renovate your home?</h4>
      <div className="post-excerpt">
        <p>
        Renovations are a crucial part of boosting a home's value. They go beyond mere aesthetics, addressing both visual appeal and practicality. Whether it's updating key areas or incorporating smart technologies, each renovation contributes to a property's long-term worth. Luxury renovations take this a step further, embracing high-end materials and finishes for an elevated living experience.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-13.jpg"   />
      <h4 className="title-blog">How does home automation enhance comfort?
      </h4>
      <div className="post-excerpt">
        <p>
        Home automation brings comfort to new heights by putting control at your fingertips. Imagine adjusting the lighting, thermostat, and entertainment systems with a simple tap on your smartphone or voice command. Smart home technology ensures that your living space caters to your preferences, creating a personalized and comfortable atmosphere.
        </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-14.jpg"   />
      <h4 className="title-blog">How does home automation enhance comfort?
      </h4>
      <div className="post-excerpt">
     <p>
     Renovations are a crucial part of boosting a home's value. They go beyond mere aesthetics, addressing both visual appeal and practicality. Whether it's updating key areas or incorporating smart technologies, each renovation contributes to a property's long-term worth. Luxury renovations take this a step further, embracing high-end materials and finishes for an elevated living experience.
     </p>
        </div>
      
      </div>
      <div className="item">
      <img alt="Killarney" loading="lazy" decoding="async" data-nimg="fill" sizes="100vw" src="assets/img/blog/blog-15.png"   />
      <h4 className="title-blog">How does home automation enhance comfort?
      </h4>
      <div className="post-excerpt">
        <p>
        Home automation brings comfort to new heights by putting control at your fingertips. Imagine adjusting the lighting, thermostat, and entertainment systems with a simple tap on your smartphone or voice command. Smart home technology ensures that your living space caters to your preferences, creating a personalized and comfortable atmosphere.
        </p>
        </div>
      
      </div>
      
     
        </div><div></div><div>
 {/*  */}

     
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
  )
}

export default Blogs