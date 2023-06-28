import React from "react";
import { useState } from "react";

const StringArea = ({ text, max }) => {
  // kisa yaziyi tuttugumuz state
  const [showText, setShowText] = useState(false);
  const handleClick = () => {
    setShowText(!showText);
  };
  /* egerki bizim yazimizin uzunlugu max degerinden uzunsa
yazinin max'a kadar olan kismini al ve sonuna ... koy
degilse oldugu gibi kalsin */
  let shortText = text;

  if (text.length > max && !showText) {
    shortText = text.substring(0, max) + "...";
  }
  // egerki paragrafa tiklanirsa tam halini goster
  return <p onClick={handleClick}>{shortText} </p>;
};

export default StringArea;
