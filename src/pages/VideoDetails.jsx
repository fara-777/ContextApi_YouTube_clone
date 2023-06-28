import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { options } from "../utils/Constans";
import axios from "axios";
import ReactPlayer from "react-player";
import loading from "../assets/loading.gif";
import { SlDislike } from "react-icons/sl";
import { PiShareFatBold } from "react-icons/pi";
import millify from "millify";
import StringArea from "./StringArea";
import VideoPlayback from "../components/VideoPlayback";
import Comments from "./Comments";

const VideoDetails = () => {
  const params = useParams();
  const [showVideo, setShowVideo] = useState(null);
  const [relatedContent, setRelatedContent] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    //kullanici alakali videolardan birine tiklarsa
    // loading gosterebilmek icin null'a cektik
    setShowVideo(null);
    setRelatedContent(null);
    // videonun bilgisine gore detaylarinin bilgisini cek
    axios
      .get(
        `https://youtube138.p.rapidapi.com/video/details/?id=${params.videoId}`,
        options
      )
      .then((res) => setShowVideo(res.data));

    axios
      .get(
        `https://youtube138.p.rapidapi.com/video/comments/?id=${params.videoId}`,
        options
      )
      .then((res) => setComments(res.data.comments));

    // videoya benzer diger videolari cekme (alakali icerik)
    axios
      .get(
        `https://youtube138.p.rapidapi.com/video/related-contents/?id=${params.videoId}`,
        options
      )
      .then((res) => setRelatedContent(res.data.contents));
    // ! bagimlilik ilarak useparamstan gelen videonun id' ni ekledik
    // ! alakali videolardan birine tiklanirsa onun verisini cekmek istiyoruz
  }, [params.videoId]);

  console.log(comments);

  return (
    <div>
      {/* show degeri null iken ekrana loading basma */}
      {!showVideo && <img className=" m-auto mt-[300px]" src={loading} />}

      {showVideo && (
        <div className="flex flex-col mt-5 lg:flex-row  gap-5 p-5 px-20 sm:p-5 md:p-12 ">
          {/* Ana Icerik */}
          <div className=" flex flex-col  items-center lg:max-w-[750px] lg:max-h-[700px]">
            <div className="player-wrapper">
              <ReactPlayer
                width={"750px"}
                height={"450px"}
                url={`https://www.youtube.com/watch?v=${showVideo.videoId}`}
                controls
                playing={true}
              />
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <h2>{showVideo?.title}</h2>
              <div className="flex justify-between">
                {/* kanal hakkinda kismi */}
                <div className="flex gap-4 items-center">
                  <img
                    className="w-[48px] h-[48px] rounded-full"
                    src={showVideo?.author?.avatar[0]?.url}
                  />

                  <div>
                    <p>{showVideo.author.title}</p>
                    <p className="text-zinc-400">
                      {showVideo.author.stats.subscribersText}
                    </p>
                  </div>
                  <button className=" bg-white text-black rounded-xl p-2  hover:bg-slate-300">
                    Abone Ol
                  </button>
                </div>
                {/* video hakkinda kismi */}
                <div className=" flex gap-5">
                  <div className="flex items-center gap-3 bg-neutral-800  rounded-xl p-3 cursor-pointer hover:bg-neutral-700">
                    <SlDislike />
                    <span>{millify(showVideo.stats.likes)}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-neutral-800 rounded-xl p-3 cursor-pointer hover:bg-neutral-700">
                    <PiShareFatBold />
                    <span>Paylas</span>
                  </div>
                </div>
              </div>
              <div className="  bg-neutral-800  rounded p-4 ">
                <p className="flex gap-5 mb-3">
                  <span>{millify(showVideo.stats.views)} kez izlendi </span>
                  <span>{showVideo.publisedDate} tarihinde yayinlandi </span>
                </p>
                <StringArea text={showVideo.description} max={300} />
              </div>
              <Comments videoDetails={showVideo} comments={comments} />
            </div>
          </div>
          {/* Alakali icerikler */}
          <div className="flex flex-col gap-3 lg:max-w-[350px] ">
            {!relatedContent && (
              <img className="m-auto mt-[300px]" src={loading} />
            )}

            {relatedContent &&
              relatedContent.map((video) => {
                if (video.type !== "video") return;
                return <VideoPlayback key={video.videoId} videoInfo={video} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
