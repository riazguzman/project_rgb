import React, { useEffect, useState } from "react";

import Pixel from "./Pixel";

const Image = () => {
  const [colours, setColours] = useState([]);
  const [image, setImage] = useState([]);

  const getColours = () => {
    const colourArray = [];
    for (let r = 0; r < 256; ) {
      for (let g = 0; g < 256; ) {
        for (let b = 0; b < 256; ) {
          colourArray.push({ r, g, b });
          b += 8;
        }
        g += 8;
      }
      r += 8;
    }
    setColours(colourArray);
  };

  const getRandomSet = (coloursArray) => {
    let uniqueArray = [];
    let randomSetArray = [];

    while (randomSetArray.length < coloursArray.length / 200) {
      let rand = Math.floor(Math.random() * coloursArray.length);
      if (uniqueArray.indexOf(rand) === -1) {
        uniqueArray.push(rand);
        randomSetArray.push(coloursArray[rand]);
      }
    }
    return randomSetArray;
  };

  const getClosestColour = (center, randomSet) => {
    let min = 1000;
    let minIndex = 0;

    randomSet.forEach((element, i) => {
      const diff =
        Math.abs(center.r - element.r) +
        Math.abs(center.g - element.g) +
        Math.abs(center.b - element.b);
      if (diff < min) {
        min = diff;
        minIndex = i;
      }
    });
    return minIndex;
  };

  const createImageArray = () => {
    let coloursArray = [...colours];
    let randomSetArray = [];
    let imageArray = [];
    let deleteIndex;
    let pixel;
    while (coloursArray.length > 0) {
      randomSetArray = getRandomSet(coloursArray);
      deleteIndex = getClosestColour({ r: 255, g: 0, b: 0 }, randomSetArray);
      pixel = coloursArray.splice(deleteIndex, 1)[0];
      imageArray.push(pixel);
    }
    setImage(imageArray);
  };

  useEffect(() => {
    getColours();
  }, []);

  useEffect(() => {
    if (colours.length != 0) {
      createImageArray();
    }
  }, [colours]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(256,3px)",
        width: "768px",
        margin: "auto",
      }}
    >
      {image.map((element, i) => {
        return <Pixel element={element} />;
      })}
    </div>
  );
};

export default Image;
