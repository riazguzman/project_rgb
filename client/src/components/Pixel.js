// React
import React from "react";

const Pixel = ({ element }) => {
  return (
    <div
      style={{
        height: "3px",
        backgroundColor: `rgb(${element.r},${element.g},${element.b})`,
      }}
    ></div>
  );
};
export default Pixel;
