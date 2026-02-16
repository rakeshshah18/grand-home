import React, { useState, useEffect } from "react";

const SliderDragCursor = ({ isVisible }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX - 65, y: e.clientY - 65 });
    };

    if (isVisible) {
      window.addEventListener("mousemove", moveCursor);
    } else {
      setPosition({ x: -100, y: -100 }); // Hide cursor
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isVisible]);

  return (
    <div
      className={`slider-drag-cursor ${isVisible ? "active" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        display: isVisible ? "block" : "none",
      }}
    >
      <i className="fas fa-angle-left me-2"></i> Grand Home{" "}
      <i className="fas fa-angle-right ms-2"></i>
    </div>
  );
};

export default SliderDragCursor;
