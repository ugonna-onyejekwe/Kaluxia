import "./index.scss";

import { Loader } from "../../global-components";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

// will replace
import { Link, useParams } from "react-router-dom";
import { Edit_container } from "./components/edit-form";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../global-components/data-fetcher";
import { userContext } from "../../global-components/context/user-context";
import { HashLoader } from "react-spinners";
import { Post } from "./components/posts";

export const Single_author_page = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [userInfo, setUserInfo] = useState<UsersType>();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState<File | any>(undefined);
  const [avatar, setAvatar] = useState<string | null>("");

  window.scrollTo(0, 0);

  const { id } = useParams();
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    const getuserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(`users/${id}`, "get");
        setUserInfo(response);
        setAvatar(response.avatar);
      } catch (error: any) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getuserInfo();
  }, []);

  const changeAvatar = async (img: any) => {
    setUploadedAvatar(true);
    const formData = new FormData();
    formData.set("avatar", img);

    try {
      const response = await fetchData(
        `users/${id}/change-avatar`,
        "patch",
        formData,
        currentUser
      );
      setAvatar(response);
    } catch (error: any) {
      console.log(error.response.data.message);
    }

    setUploadedAvatar(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      {userInfo && (
        <div className="single_author_page container">
          {/* header section */}
          <div className="header">
            <div className="img_con">
              <div className="cover_bg"></div>
              <div className="img">
                {uploadedAvatar && (
                  <div className="loader">
                    <HashLoader color="purple" size={13} />
                  </div>
                )}
                {!uploadedAvatar && (
                  <img
                    src={`${
                      import.meta.env.VITE_IMAGE_BASE_URL
                    }/uploads/${avatar}`}
                    alt="authur image"
                  />
                )}
                <input
                  type="file"
                  name="avatar"
                  id="avatar_img"
                  onChange={(e) => {
                    changeAvatar(e.target.files?.[0]);
                  }}
                />
                {currentUser?.id === id ? (
                  <label htmlFor="avatar_img">
                    <TbEdit className="icon" />
                  </label>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* txt _section */}
            <div className="txt_section">
              <div className="txt_con">
                <h3>{userInfo.name}</h3>
                <p className="bio">
                  {!userInfo.bio ? "Friendly || Explorer" : userInfo.bio}
                </p>

                <div className="engagements">
                  <p>{userInfo?.posts} posts</p>
                </div>
              </div>

              {currentUser?.id === id ? (
                <div className="action_btns">
                  <Link to={`/create-post/${userInfo._id}`}>
                    <button className="create_btn">
                      {" "}
                      <FaPlus className="icon" />
                      create post
                    </button>
                  </Link>

                  <button
                    className="edit_btn"
                    onClick={() => setOpenEdit(true)}
                  >
                    {" "}
                    <MdEdit className="icon" /> edit
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* about section */}
          <div className="about">
            <h3>about</h3>
            {!userInfo.about ? (
              <p>
                Hi there! I'm new to <b>Kaluxia</b> and excited to explore all
                it has to offer. I'm always looking to connect with people who
                share similar interests. Feel free to say hello and introduce
                yourself!
              </p>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: userInfo.about }}></p>
            )}
          </div>

          {/* activity_section */}
          <div className="activity_section">
            <h2>posts</h2>

            <div className="wrapper">
              <Post />
            </div>
          </div>

          {/* Edit form */}
          <Edit_container
            set_open_edit={setOpenEdit}
            openEdit={openEdit}
            {...userInfo}
          />
        </div>
      )}
    </>
  );
};
