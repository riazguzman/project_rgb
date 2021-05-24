import React, { useEffect, useState } from "react";

const Image = () => {
  const [initial, setInitial] = useState(true);
  const [colours, setColours] = useState([]);
  const [image, setImage] = useState([]);

  const getColours = () => {
    const colourArray = [];
    for (let r = 0; r < 250; ) {
      for (let g = 0; g < 250; ) {
        for (let b = 0; b < 250; ) {
          colourArray.push({ r, g, b });
          b += 8;
        }
        g += 8;
      }
      r += 8;
    }
    setColours(colourArray);
    setInitial(false);
  };

  const getRandomSet = (coloursArray) => {
    let uniqueArray = [];
    let randomSetArray = [];

    while (randomSetArray.length < coloursArray.length / 60) {
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

  useEffect(() => {
    if (image.length != 0) {
      console.log(image);
    }
  }, [Image]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        overflow: "auto",
      }}
    >
      {image.map((element, i) => {
        return (
          <div
            key={i}
            style={{
              backgroundColor: `rgb(${element.r},${element.g},${element.b})`,
              width: "80px",
              height: "80px",
            }}
          ></div>
        );
      })}
      Image
    </div>
  );
};

export default Image;
