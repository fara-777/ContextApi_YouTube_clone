import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { options } from "../utils/Constans.jsx";

// context yapisinin temelini olusturma

export const YouTubeContext = createContext();

export const ContextProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const [searchResult, setSearchResult] = useState(null);

  // selectedCategory stateinin degisimini izleme
  useEffect(() => {
    // her category degistiginde baslangicta null yapsin bu sayede Loading koyabiliriz
    setSearchResult(null);
    // video verisini cek
    fetchCategory(selectedCategory);
  }, [selectedCategory]);
  // YouTube bverisini cekmeye yarayan fonksion
  const fetchCategory = (category) => {
    axios
      .get(`https://youtube138.p.rapidapi.com/search/?q=${category}`, options)
      .then((res) => setSearchResult(res.data.contents));
  };
  return (
    <YouTubeContext.Provider
      value={{ selectedCategory, setSelectedCategory, searchResult }}
    >
      {children}
    </YouTubeContext.Provider>
  );
};
