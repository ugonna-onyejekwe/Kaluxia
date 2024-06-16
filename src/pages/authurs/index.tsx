import "./index.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../global-components/data-fetcher";
import { Loader } from "../../global-components";

export const Authurs_page = () => {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  window.scrollTo(0, 0);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(`users`, "get");
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getAuthors();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="authurs_page">
      <div className="wrapper container">
        {users &&
          users.map((item, key) => {
            return (
              <Link to={`/author/${item._id}`}>
                <div className="box" key={key}>
                  <div className="img_con">
                    <img src={item.avatar.url} alt="authurs image" />
                  </div>
                  <div className="txt_con">
                    <h3>{item.name}</h3>
                    <p>{item.bio}</p>
                    <div className="activity_section">
                      <span>{item.posts} Posts</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
