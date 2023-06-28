import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  const [query, setQyery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // inputu sifirla
    setQyery("");
  };

  return (
    <header className="flex justify-between items-center p-5 px-10 mt-5 sticky">
      <Link to={"/"}>
        <div className="flex items-center">
          <img
            className="w-10"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
          />
          <h1 className="text-3xl px-2  ">YouTube</h1>
        </div>
      </Link>
      <form className="w-full px-10" onSubmit={handleSubmit}>
        <input
          className="lg:py-1 lg:w-full "
          type="text"
          placeholder="Ara"
          onChange={(e) => setQyery(e.target.value)}
          value={query}
        />
        <Link
          to={`/results?search_query=${query}`}
          className=" search  lg:text-2xl"
        >
          <BsSearch />
        </Link>
      </form>
      <BsBell className=" lg:mr-5 text-3xl" />
    </header>
  );
};

export default Header;
