import "./index.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../global-components/context/user-context";
import { Loader } from "../../global-components";
import { Poster_con } from "../../global-components/authur-con";
import { MdOutlineDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { fetchData } from "../../global-components/data-fetcher";

export const Single_post_page = () => {
  const [post, setPost] = useState<PostType>();
  const { currentUser } = useContext(userContext);
  const [modalIsActive, SetModalISActive] = useState(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  window.scrollTo(0, 0);

  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(`posts/${id}`, "get");
        setPost(response);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, []);

  const deletePost = async () => {
    setIsLoading(true);
    try {
      await fetchData(`posts/${id}`, "delete", "", currentUser);
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {post && (
        <div className="single_post container">
          <div className="action_sec">
            <Link to={`/author/${post.authur.id}`}>
              <Poster_con {...post} />
            </Link>

            {post?.authur?.id === currentUser?.id && (
              <div className="btn_section">
                <span>
                  <Link to={`/create-post/${id}/edit`}>
                    <TbEdit className="icon" />
                  </Link>
                </span>

                <span onClick={() => SetModalISActive(true)}>
                  <MdOutlineDelete className="icon" />
                </span>
              </div>
            )}
          </div>

          <div className="post_section">
            <div className="img_con">
              <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}/uploads/${
                  post.thumbnail
                }`}
                alt="blog image"
              />
            </div>
            <h2>{post.title}</h2>
            <div className="txt">
              <p dangerouslySetInnerHTML={{ __html: post.desc }}></p>
            </div>
          </div>
        </div>
      )}

      <div className={modalIsActive ? "delete_modal active" : "delete_modal"}>
        <p>Are sure you want to delete this post?</p>
        <div className="btn_section">
          <span
            onClick={() => {
              SetModalISActive(false);
              deletePost();
            }}
          >
            yes
          </span>
          <span onClick={() => SetModalISActive(false)}>no</span>
        </div>
      </div>

      <div
        className={modalIsActive ? "backdrop active" : "backdrop"}
        onClick={() => SetModalISActive(false)}
      ></div>
    </>
  );
};
