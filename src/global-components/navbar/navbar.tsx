import "./navbar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useContext, useState } from "react";
import { userContext } from "../context/user-context";

export const Navbar = () => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);

  const { currentUser, setCurrentUser } = useContext(userContext);
  return (
    <>
      <nav
        style={
          pathname === "/login" || pathname === "/signin"
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="nav_container container">
          <div className="logo">
            <NavLink to={"/"}>kaluxia</NavLink>
          </div>

          <div className="navigators">
            {currentUser && (
              <NavLink to={`/author/${currentUser?.id}`} className="user_icon">
                <AiOutlineUser />
              </NavLink>
            )}
            <div className={isActive ? "links active" : "links"}>
              <div
                className="menu_btn close"
                onClick={() => setIsActive(!isActive)}
              >
                <IoMdClose />
              </div>
              <NavLink to={"/"} onClick={() => setIsActive(!isActive)}>
                home{" "}
              </NavLink>

              <NavLink to={"/posts"} onClick={() => setIsActive(!isActive)}>
                posts{" "}
              </NavLink>

              <NavLink to={"/authors"} onClick={() => setIsActive(!isActive)}>
                authurs{" "}
              </NavLink>

              {currentUser ? (
                <NavLink
                  to={"/login"}
                  className={"btn"}
                  onClick={() => {
                    setCurrentUser(null);
                    setIsActive(!isActive);
                  }}
                >
                  logout
                </NavLink>
              ) : (
                <NavLink
                  to={"/login"}
                  className={"btn"}
                  onClick={() => setIsActive(!isActive)}
                >
                  login
                </NavLink>
              )}
            </div>
            <div
              className="menu_btn open"
              onClick={() => setIsActive(!isActive)}
            >
              <CiMenuFries />
            </div>
          </div>
        </div>
        <div
          className={isActive ? "overlay active" : "overlay"}
          onClick={() => setIsActive(!isActive)}
        ></div>
      </nav>
    </>
  );
};
