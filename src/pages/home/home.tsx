import { Link, NavLink } from "react-router-dom";
import "./home.scss";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { Post_card1 } from "./components/post_card1";
import { Post_card2 } from "./components/post_card2";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useEffect, useState } from "react";
import { fetchData } from "../../global-components/data-fetcher";
import { Loader } from "../../global-components";

export const Home_page = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UsersType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  window.scrollTo(0, 0);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response1 = await fetchData("posts", "get");
        const response2 = await fetchData("users", "get");
        setUsers(response2);
        setPosts(response1);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="home_page">
      <div className="hero_section">
        <div className=" container">
          <div className="txt_con">
            <small>"seneca"</small>
            <h1>
              Learing is a treasure that will follow its owner everywhere.
            </h1>
            <p>
              Welcome to <b>Kaluxia</b>, a vibrant learning ecosystem where
              curious mind can explore, learn and grow through diverse range of
              inspiring content, empowering inviduals to reach their full
              potentials and shape a brighter future
            </p>
            <NavLink to="/posts">
              <button>
                explore posts <HiOutlineArrowSmRight className="arrow" />
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <section className="section2 container">
        <div className="part1">
          {posts?.slice(0, 2).map((item, key) => {
            return <Post_card1 {...item} key={key} reduceTxt={false} />;
          })}
        </div>
        <div className="part2">
          {posts.slice(3, 7).map((item, key) => {
            return <Post_card2 {...item} key={key} />;
          })}
        </div>
      </section>

      {/* Section 3 */}
      <section className="section3 container">
        <div className="heading">
          <h2>authors</h2>
        </div>
        <Swiper
          className="swiper_con"
          modules={[Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={"auto"}
          autoplay={{ delay: 3000 }}
          speed={2000}
        >
          {users?.map((item, key) => {
            return (
              <SwiperSlide key={key} className="book_con">
                <div className="img_con">
                  <img src={item.avatar.url} alt="author image" />
                </div>
                <div className="txt_con">
                  <h3>
                    <Link to={`author/${item._id}`}>
                      {item.name.length > 20
                        ? item.name.slice(0, 20) + "..."
                        : item.name}
                    </Link>
                  </h3>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/* Section 4 */}
      <section className="section4 container">
        <div className="part1">
          {posts?.slice(5, 9).map((item, key) => {
            return <Post_card2 {...item} key={key} reduceTxt={false} />;
          })}
        </div>
        <div className="part2">
          {posts?.slice(10, 11).map((item, key) => {
            return <Post_card1 {...item} key={key} reduceTxt={false} />;
          })}
        </div>
      </section>
    </div>
  );
};
