import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormEvent, useContext, useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { fetchData } from "../../global-components/data-fetcher";
import { userContext } from "../../global-components/context/user-context";
import { Loader } from "../../global-components";

export const CreatePost = () => {
  const { id, type } = useParams();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | any>("");
  const [desc, setDesc] = useState<string>("");
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();

  window.scrollTo(0, 0);

  if (type && type === "edit") {
    useEffect(() => {
      const getData = async () => {
        setLoading(true);
        try {
          const response = await fetchData(`posts/${id}`, "get");
          setTitle(response?.title);
          setDesc(response?.desc);
          setTag(response?.tag);
          console.log(response);
        } catch (error: any) {
          window.scrollTo(0, 0);
          setErr(error.response.data.message);
        }
        setLoading(false);
      };

      getData();
    }, []);
  }

  const submitPost = async (e: FormEvent) => {
    setErr("");
    e.preventDefault();
    const formData = new FormData();
    formData.set("thumbnail", thumbnail);
    formData.set("title", title);
    formData.set("tag", tag);
    formData.set("desc", desc);

    if (type && type === "edit") {
      setLoading(true);

      try {
        await fetchData(
          `posts/edit-post/${id}`,
          "patch",
          formData,
          currentUser
        );
        navigate("/posts");
      } catch (error: any) {
        setErr(error.response.data.message);
      }

      setLoading(false);
    } else {
      setLoading(true);

      try {
        await fetchData("posts", "post", formData, currentUser);
        navigate("/posts");
      } catch (error: any) {
        setErr(error.response.data.message);
      }

      setLoading(false);
    }
  };

  const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link"],
        ["clean"],
      ],
    },
    formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
    ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="create_post_page">
      <div className="container">
        <div className="wrapper">
          <h2>{!type ? "create" : "edit"} your post </h2>
          <form onSubmit={submitPost}>
            {err && (
              <div className="err">
                <p>
                  <MdErrorOutline />
                  {err}
                </p>
              </div>
            )}

            <div className="input_con">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="input_con">
              <label htmlFor="tag">What is you post based on?</label>
              <select onChange={(e) => setTag(e.target.value)}>
                <option value="Select category" selected disabled>
                  Select category
                </option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Inspiration">Inspiration</option>
                <option value="News">News</option>
                <option value="Sport">Sport</option>
                <option value="Music">Music</option>
              </select>
            </div>

            <div className="input_con">
              <label htmlFor="thumbnail">Upload image</label>
              <input
                type="file"
                onChange={(e) => setThumbnail(e.target.files?.[0])}
              />
            </div>

            <div className="input_con">
              <label htmlFor="desc">Description</label>
              <ReactQuill
                value={desc}
                modules={modules}
                formats={formats}
                onChange={setDesc}
                className="desc"
                placeholder="Write about your post here"
              />
            </div>

            <div className="action_btn">
              <Link to="/posts">
                <button type="reset">cancel</button>
              </Link>
              {/* <Link to="/posts"> */}
              <button type="submit">{type ? "edit" : "post"}</button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
