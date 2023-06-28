import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { options } from "../utils/Constans";
import SideNav from "../components/SideNav";
import VideoCard from "../components/VideoCard";
import loading from "../assets/loading.gif";
import SearcVideos from "../components/SearchVideos";

const SearchResult = () => {
  const [videos, setVideos] = useState(null);
  // url'den arama terimini alma:
  const [searchParams, setSearchParams] = useSearchParams();
  // get methodu yardimiyla arama terimini alma
  const query = searchParams.get("search_query");

  useEffect(() => {
    // her aramının başında videolara  null değerini atadık
    // aşağıdaki sorgu sayesinde null iken loading bastık
    setVideos(null);
    // arama termiyle alakalı videoları çekme
    axios
      .get(`https://youtube138.p.rapidapi.com/search/?q=${query}`, options)
      .then((res) => setVideos(res.data.contents));
  }, [query]);

  return (
    <div className="flex">
      <SideNav />
      <div className="flex justify-start  p-5 w-full">
        {/* videolar yoksa ekrana loading basma */}
        {!videos && <img className="m-auto mt-[200px]" src={loading} />}
        <div className="flex flex-col gap-5 max-w-[500px]">
          {videos?.map((content, i) => {
            if (content.type !== "video") return;
            return <SearcVideos key={i} videoInfo={content} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
