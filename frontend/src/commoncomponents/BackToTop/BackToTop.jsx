import React, { useEffect, useState } from 'react'

const BackToTop = () => {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / docHeight) * 100;
        setScrollPercent(progress);
        setVisible(scrollY > 200);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    return (
      <div 
        className={`scroll-top ${visible ? "visible" : ""}`} 
        onClick={scrollToTop}
        style={{ display: visible ? "block" : "none" }}
      >
        <svg className="progress-circle svg-content" width="50" height="50" viewBox="-1 -1 102 102">
          <path 
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              transition: "stroke-dashoffset 10ms linear",
              strokeDasharray: "307.919, 307.919",
              strokeDashoffset: 307.919 - (scrollPercent / 100) * 307.919
            }}
          />
        </svg>
      </div>
    )
};

export default BackToTop