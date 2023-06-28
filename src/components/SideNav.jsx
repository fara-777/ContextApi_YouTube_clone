import { categories } from "../utils/Constans";
import { useContext } from "react";
import { YouTubeContext } from "../Context/YoutubeContext";

const SideNav = () => {
  //contexte abone olma kismi
  const { selectedCategory, setSelectedCategory } = useContext(YouTubeContext);
  return (
    <nav className="flex flex-col mt-12 ml-3">
      {categories.map((item) => (
        <>
          <div
            // secilen kategoriyi contexte gonderme
            onClick={() => setSelectedCategory(item.name)}
            // egerki secilen kategorinin ismi ekrana basilan ile eslesirse onu mavi yap
            className={`${
              selectedCategory === item.name && "bg-blue-600"
            } flex items-center gap-2 p-2 py-5 text-1lg cursor-pointer hover:bg-gray-800`}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
          {/* egerki objenin divider degeri true ise ekrana bir cizgi bas */}
          {item.divider && <hr />}
        </>
      ))}
    </nav>
  );
};

export default SideNav;
