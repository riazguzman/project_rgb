import React, { useEffect, useState } from "react";

const Image = () => {
  const [initial, setInitial] = useState(true);
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
    setInitial(false);
  };

  const getRandomSet = () => {
    let coloursArray = [...colours];
    let uniqueArray = [];
    let randomSetArray = [];
    while (uniqueArray.length < 100) {
      let rand = Math.floor(Math.random() * 100) + 1;
      if (uniqueArray.indexOf(rand) === -1) {
        uniqueArray.push(rand);
        randomSetArray.push(coloursArray[rand]);
      }
    }
    return randomSetArray;
  };

  const getClosestColour = (center, randomSet) => {
    let min = 763;
    let minIndex = 0;
    let coloursArray = [...colours];
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
    while (coloursArray.length != 0) {
      randomSetArray = getRandomSet();
    }
  };

  useEffect(() => {
    getColours();
  }, []);

  useEffect(() => {
    if (!initial) {
      colours.forEach((element) => {
        console.log(element.r, element.g, element.b);
      });
      getRandomSet();
    }
  }, [colours]);

  return (
    <div>
      {image.map((element) => (
        <div>
          <div>{element.r}</div>
          <div>{element.g}</div>
          <div>{element.b}</div>
        </div>
      ))}
      Image
    </div>
  );
};

export default Image;
