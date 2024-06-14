import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useEffect, useState } from "react";
import { fetchData, getImage } from "../../../global-components/data-fetcher";
import { Time } from "../../../global-components/date-formater";
import { Loader, post_title_reducer } from "../../../global-components";
import { post_desc_reducer } from "../../../global-components/description_reducer";

export const Post = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("posts", "get");
        const filteredPost = response.filter(
          (i: PostType) => i.authur.id === id
        );
        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {posts.length === 0 && (
        <div className="not_found">
          <h1>User has no post</h1>
        </div>
      )}
      {posts.length !== 0 && (
        <div className="posts_con">
          {posts.map((item, key) => {
            return (
              <div className="box" key={key}>
                <div className="img_con">
                  <img src={getImage(item.thumbnail)} alt="blog image" />
                </div>
                <div className="txt_con">
                  <div className="tag_section">
                    <div className="tag">
                      <Link to={"/"}>
                        {" "}
                        <button className="tag_btn">
                          {item.tag} <HiOutlineArrowSmRight className="arrow" />
                        </button>{" "}
                      </Link>
                    </div>
                    <div className="date">
                      <Time date={item.createdAt} />
                    </div>
                  </div>

                  <Link to={"/blog"}>
                    <h3>{post_title_reducer(item.title)}</h3>
                  </Link>

                  <p
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: post_desc_reducer(item.desc),
                    }}
                  ></p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
