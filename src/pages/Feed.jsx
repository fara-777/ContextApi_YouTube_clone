import SideNav from "../components/SideNav";
import { useContext } from "react";
import { YouTubeContext } from "../Context/YoutubeContext";
import VideoCard from "../components/VideoCard";
import loading from "../assets/loading.gif";

const Feed = () => {
  const { searchResult } = useContext(YouTubeContext);
  return (
    <div className="flex">
      <SideNav />
      <div className="videos">
        {!searchResult ? (
          <img className=" ml-[480px] mt-[200px]" src={loading} />
        ) : (
          searchResult.map((video, i) => {
            // egerki elamanin tipi video degilse hicbir sey yapma
            if (video.type !== "video") return;
            // elemanin tipi video ise ekrana birtane video bas
            return <VideoCard key={i} videoInfo={video} />;
          })
        )}
      </div>
    </div>
  );
};

export default Feed;
