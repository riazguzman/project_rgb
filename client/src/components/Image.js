import React, { useEffect, useState } from "react";

const Image = () => {
  const [initial, setInitial] = useState(true);
  const [colours, setColours] = useState([]);
  const [randomSet, setRandomSet] = useState([]);

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
        console.log(coloursArray[rand]);
      }
    }
    setRandomSet(randomSetArray);
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

  useEffect(() => {
    randomSet.forEach((element) => {
      console.log(element.r, element.g, element.b);
    });
  }, [randomSet]);

  useEffect(() => {
    console.log("here");
  }, [getRandomSet]);

  return (
    <div>
      {randomSet.map((element) => (
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
