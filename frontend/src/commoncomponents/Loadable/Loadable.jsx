import React, { Suspense } from 'react'

const Loadable = (Component) => {
    return (props) => (
      <Suspense fallback={
        <div id="preloader" className="preloader ">
           <button className="th-btn style2 preloaderCls">Cancel Preloader </button>
           <div id="loader" className="th-preloader">
              <div className="animation-preloader">
                 <div className="txt-loading">
                    <span preloader-text="G" className="characters">G</span>
                    <span preloader-text="R" className="characters">R</span>
                    <span preloader-text="A" className="characters">A</span>
                    <span preloader-text="N" className="characters">N</span>
                    <span preloader-text="D" className="characters">D</span>
                    <span preloader-text="H" className="characters">H</span>
                    <span preloader-text="O" className="characters">O</span>
                    <span preloader-text="M" className="characters">M</span>
                    <span preloader-text="E" className="characters">E</span>
                 </div>
              </div>
           </div>
        </div>
      }>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable