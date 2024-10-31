import "./index.scss";

import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer
      style={{
        display:
          pathname === "/login" || pathname === "/signin" ? "none" : "block",
      }}
    >
      <div className="container">
        {/* div 1 */}
        <div>
          <div className="logo">
            <h1>kaluxia</h1>
          </div>
          <p>
            Kaluxia is a blog that explores a wide range of topics, from tech
            and lifestyle to personal experiences and social commentary.
          </p>

          <div className="socails">
            <span>
              <FaFacebookF />
            </span>

            <span>
              <FaWhatsapp />
            </span>

            <span>
              <FaXTwitter />
            </span>

            <span>
              <FaYoutube />
            </span>
          </div>
        </div>

        {/* div 2 */}
        <div>
          <h3>tags</h3>
          <Link to="#">Business</Link>
          <Link to="#">Inspiration</Link>
          <Link to="#">News</Link>
          <Link to="#">Sport</Link>
          <Link to="#">Music</Link>
        </div>

        {/* div 3 */}
        <div>
          <h3>quick links</h3>
          <Link to="#">home</Link>
          <Link to="#">books</Link>
          <Link to="#">post</Link>
          <Link to="#">authurs</Link>
        </div>
      </div>
    </footer>
  );
};
