// React
import React, { useEffect, useState } from "react";

// Components
import Pixel from "./Pixel";

// Emotino
import styled from "@emotion/styled";

// Styling the image container
const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(256, 3px);
  width: 768px;
  margin: auto;
`;

const Image = () => {
  // colours array contains all posible rgb combinations.
  const [colours, setColours] = useState([]);
  // image array contains all possible rgb combinations in an order determined by algorithm below.
  const [image, setImage] = useState([]);

  // Creates colours array using nested loops.
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

  // Creates a random set from array specified in the parameter.
  const getRandomSet = (coloursArray) => {
    let uniqueArray = [];
    let randomSetArray = [];

    // Loop until the random set array is large enough.
    while (randomSetArray.length < coloursArray.length / 200) {
      // Grab random number within the range of the coloursArray.
      let rand = Math.floor(Math.random() * coloursArray.length);
      // Push to array if the value in random index is unique.
      if (uniqueArray.indexOf(rand) === -1) {
        uniqueArray.push(rand);
        randomSetArray.push(coloursArray[rand]);
      }
    }
    return randomSetArray;
  };

  // Returns the colour in the random set that is cloest to
  // "colour" specified in the paramter.
  const getClosestColour = (colour, randomSet) => {
    let thresh = 1000;
    let minIndex = 0;

    randomSet.forEach((element, i) => {
      const diff =
        Math.abs(colour.r - element.r) +
        Math.abs(colour.g - element.g) +
        Math.abs(colour.b - element.b);
      if (diff < thresh) {
        thresh = diff;
        minIndex = i;
      }
    });
    return minIndex;
  };

  // Creates the image array.
  const createImageArray = () => {
    let coloursArray = [...colours];
    let randomSetArray = [];
    let imageArray = [];
    let deleteIndex;
    let pixel;

    // Keep looping while the coloursArray contains elements.
    while (coloursArray.length > 0) {
      // Generate random set from remaining colours array.
      randomSetArray = getRandomSet(coloursArray);
      // Finds the closest colour in the random set.
      deleteIndex = getClosestColour({ r: 255, g: 0, b: 0 }, randomSetArray);
      // Remove element from colours array.
      pixel = coloursArray.splice(deleteIndex, 1)[0];
      // Push to image array.
      imageArray.push(pixel);
    }
    setImage(imageArray);
  };

  // Calls getColours() on mount.
  useEffect(() => {
    getColours();
  }, []);

  // If colours array has been updated, call createImageArray().
  useEffect(() => {
    if (colours.length != 0) {
      createImageArray();
    }
  }, [colours]);

  return (
    <ImageContainer>
      {image.map((element, i) => {
        return <Pixel element={element} />;
      })}
    </ImageContainer>
  );
};

export default Image;
