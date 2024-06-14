import "./index.scss";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { Loader, post_title_reducer } from "../../global-components";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { post_desc_reducer } from "../../global-components/description_reducer";
import { fetchData } from "../../global-components/data-fetcher";
import { Poster_con } from "../../global-components/authur-con";

export const Posts_page = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [isLoading, setIsloading] = useState(false);

  window.scrollTo(0, 0);

  useEffect(() => {
    setIsloading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetchData("posts", "get");
        setPostList(response);
      } catch (error) {
        console.log(error);
      }
      setIsloading(false);

      // setPostList ( fetchData("posts", "get"));

      // let data = await fetchData("posts", "get");
      // console.log(data);
    };

    fetchPosts();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {isLoading || (
        <div className="post_main_container container">
          <div className="wrapper ">
            {postList?.map((item, key) => {
              console.log(item.desc);
              return (
                <div className="box" key={key}>
                  <div className="img_con">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/uploads/${
                        item.thumbnail
                      }`}
                      alt="blog image"
                    />
                  </div>
                  <div className="txt_con">
                    <div className="tag_section">
                      <div className="tag">
                        <Link to={"/"}>
                          <button className="tag_btn">
                            {item.tag}{" "}
                            <HiOutlineArrowSmRight className="arrow" />
                          </button>
                        </Link>
                      </div>
                    </div>

                    <Link to={`/post/${item._id}`}>
                      <h3>{post_title_reducer(item.title)}</h3>
                    </Link>

                    <p
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: post_desc_reducer(item.desc.trimStart()),
                      }}
                    >
                      {}
                    </p>

                    <Link to={"/"}>
                      <Poster_con {...item} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
