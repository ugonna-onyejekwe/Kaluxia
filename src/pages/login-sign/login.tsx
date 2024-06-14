import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { Loader } from "../../global-components";
import { userContext } from "../../global-components/context/user-context";
import { MdErrorOutline } from "react-icons/md";

export const Login_page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  window.scrollTo(0, 0);

  const { setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();

  const userDetails = {
    email,
    password,
  };

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    try {
      const user = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userDetails
      );

      if (user) {
        setCurrentUser(user.data);
        navigate("/");
      }
    } catch (err: any) {
      setErr(err?.response?.data?.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="login_page  page_wrapper ">
      {isLoading && <Loader />}
      <div className="container">
        <div className="nav">
          <div className="logo">
            <h1>Kaluxia</h1>
          </div>
        </div>

        <form onSubmit={loginUser}>
          <h3>login</h3>
          <p>Hi, welcome back.</p>

          {err && (
            <div className="err">
              <p>
                <MdErrorOutline />
                {err}
              </p>
            </div>
          )}
          <div className="wrapper">
            <div className="input_con">
              <label htmlFor="email">email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input_con">
              <label htmlFor="password">password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="btn_con">
              <button type="submit">login</button>
            </div>

            <p className="switch">
              Already have an account? <Link to="/signin">sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
