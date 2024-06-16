import { useEffect, useState } from "react";
import { Time } from "./date-formater";
import { fetchData } from "./data-fetcher";

export const Poster_con = ({ authur, createdAt }: PosterType) => {
  const [user, setUser] = useState<UsersType>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchData(`users/${authur.id}`, "get");
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {user && (
        <div className="avatar_section">
          <div className="avatar_img">
            <img src={user.avatar.url} alt="Writer's image" />
          </div>
          <div className="txt">
            <h4>{user.name}</h4>
            <p>
              <Time date={createdAt} />
            </p>
          </div>
        </div>
      )}
    </>
  );
};
