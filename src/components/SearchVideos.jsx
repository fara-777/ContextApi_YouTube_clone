import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import millify from "millify";
import { Link } from "react-router-dom";

const SearcVideos = ({ videoInfo }) => {
  const { video } = videoInfo;

  return (
    // kullanici karta basarsa onu detay sayfasina yonlendir
    // parametre olarak linke videonun id' ni koy
    <Link className="w-full" to={`/watch/${video.videoId}`}>
      <div className="flex gap-5 ">
        <img
          className="w-full rounded-2xl mb-5"
          src={video.thumbnails[0].url}
        />
        <div className="flex gap-5">
          <div className="w-[300px] flex flex-col justify-center">
            <p className=" text-xl mb-1" title={video.descriptionSnippet}>
              {video.title}
            </p>
            <div className="flex gap-3 mb-1 text-lg text-zinc-400">
              <p>{millify(video.stats.views)}</p>
              <p>goruntuleme: {video.publishedTimeText}</p>
            </div>
            <p className="flex items-center gap-2 text-zinc-400">
              <img
                className=" rounded-full w-[50px] h-[50px]"
                src={video.author.avatar[0].url}
              />
              <span className=" text-lg">{video.author.title}</span>
              {video?.author?.badges[0]?.text === "Doğrulandı" && (
                <BsFillCheckCircleFill />
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearcVideos;
