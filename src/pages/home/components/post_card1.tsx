import { HiOutlineArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { post_title_reducer } from "../../../global-components";

export const Post_card1 = ({
  thumbnail,
  title,
  desc,
  reduceTxt,
  _id,
}: blog_card1_types) => {
  return (
    <div className="post_card1">
      <div className="img_con">
        <img src={thumbnail.url} alt="post image" />
      </div>

      <div className="txt_con">
        <h3>{post_title_reducer(title)} </h3>

        <div className="txt">
          <p
            dangerouslySetInnerHTML={{
              __html: reduceTxt
                ? desc?.slice(0, 80)
                : desc?.slice(0, 150) + "...",
            }}
          ></p>
        </div>

        <Link to={`post/${_id}`}>
          <button>
            read more <HiOutlineArrowSmRight className="arrow" />
          </button>
        </Link>
      </div>
    </div>
  );
};
