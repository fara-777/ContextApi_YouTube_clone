import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { MdOutlineSort } from "react-icons/md";
import avatar from "../assets/avatar.jpeg";
import millify from "millify";
import StringArea from "./StringArea";

const Comments = ({ comments, videoDetails }) => {
  const totalComments = videoDetails?.stats?.comments;
  const formatTotalComments = new Intl.NumberFormat("tr-TR").format(
    totalComments
  );

  return (
    <div className="flex flex-col gap-3 ">
      <div>
        <div className="flex  text-lg gap-3 mb-8">
          <p>Yorum: {formatTotalComments}</p>
          <MdOutlineSort className="mt-1 text-2xl" />
          <p>Siralama Olcutu:</p>
        </div>
        <div className="flex gap-3 mb-5">
          <img
            className="rounded-full max-w-[50px] max-h-[50px]"
            src={avatar}
          />
          <input
            type="text"
            className="  border-b-1 border-t-0 border-l-0 border-r-0 rounded-none"
            placeholder="Yorum ekleyin..."
          />
        </div>

        {comments.map((comment) => (
          <div className=" flex flex-col mb-5">
            <div className=" flex items-center gap-3">
              <img
                className="rounded-full max-w-[50px] max-h-[50px]"
                src={comment.author.avatar[0].url}
              />
              <div className="flex flex-col p-2 gap-1">
                <div className="flex items-center gap-4">
                  <p>{comment.author.title}</p>
                  <p className=" text-zinc-400">{comment?.publishedTimeText}</p>
                </div>
                <StringArea key={comment.commentId} text={comment?.content} />
                <div className="flex gap-3">
                  <SlLike role="button" />
                  <p>{millify(comment?.stats?.votes)}</p>
                  <SlDislike />
                  <p>Yanitla</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
