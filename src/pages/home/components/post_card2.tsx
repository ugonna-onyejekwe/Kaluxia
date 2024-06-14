import { HiOutlineArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Post_card2 = ({ title, desc, _id }: blog_card1_types) => {
  return (
    <div className="post_card2">
      <div className="txt_con">
        <h3>{title.length > 30 ? title.slice(0, 30) + "..." : title} </h3>
        <div className="txt">
          <p
            dangerouslySetInnerHTML={{ __html: desc?.slice(0, 100) + "..." }}
          ></p>
        </div>

        <Link to={`/post/${_id}`}>
          <button>
            read more <HiOutlineArrowSmRight className="arrow" />
          </button>
        </Link>
      </div>
    </div>
  );
};
