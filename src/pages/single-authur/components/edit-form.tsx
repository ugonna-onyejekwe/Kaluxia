import { FormEvent, useContext, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { userContext } from "../../../global-components/context/user-context";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchData } from "../../../global-components/data-fetcher";

export const Edit_container = ({
  set_open_edit,
  openEdit,
  about: aboutData,
  bio: bioData,
  name,
}: {
  set_open_edit: any;
  openEdit: any;
  about: string | any;
  bio: string | any;
  name: string;
}) => {
  const splitteName = name.split(" ");

  const [firstName, setFirstName] = useState(splitteName[0]);
  const [lastName, setLastName] = useState(splitteName[1]);
  const [bio, setBio] = useState(bioData);
  const [about, setAbout] = useState(aboutData);
  const [err, setErr] = useState<any>("");

  const { currentUser } = useContext(userContext);

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
        ["link", "image"],
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
      "image",
    ];

  const updateUser = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");

    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("bio", bio);
    formData.set("about", about);

    try {
      await fetchData(`users/edit-user-info`, "get", formData, currentUser);
      set_open_edit(false);
      window.location.reload();
    } catch (error: any) {
      window.scrollTo(0, 0);
      setErr(error?.response?.data?.message);
    }
  };

  return (
    <div className={openEdit ? "edit_wrapper active" : "edit_wrapper"}>
      <div className="edit_container">
        <form onSubmit={updateUser}>
          <h2>edit your profile</h2>
          {err && (
            <div className="err">
              <p>
                <MdErrorOutline />
                {err}
              </p>
            </div>
          )}

          <div className="input_con">
            <label htmlFor="#">first name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input_con">
            <label htmlFor="#">last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="input_con">
            <label htmlFor="#">bio</label>
            <input
              type="text"
              placeholder="A little briefing abouy you"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="input_con">
            <label htmlFor="#">about you</label>

            <ReactQuill
              value={about}
              modules={modules}
              formats={formats}
              onChange={setAbout}
              className="about_field"
            />
          </div>

          <div className="btn_section">
            <button type="reset" onClick={() => set_open_edit(false)}>
              cancel
            </button>
            <button type="submit">done</button>
          </div>
        </form>
      </div>
    </div>
  );
};
