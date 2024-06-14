import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { Loader } from "../../global-components";
import { FormEvent, useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../../global-components/context/user-context";
import { MdErrorOutline } from "react-icons/md";

export const Signin_page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  window.scrollTo(0, 0);

  const navigate = useNavigate();
  const { setCurrentUser } = useContext(userContext);

  const userDetails = {
    firstName,
    lastName,
    email,
    password,
  };

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    try {
      const newUser = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/sign-in`,
        userDetails
      );
      if (newUser) {
        setCurrentUser(newUser.data);
        navigate("/");
      }
    } catch (err: any) {
      setErr(err?.response?.data?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="signin_page page_wrapper ">
      {isLoading && <Loader />}

      <div className="container">
        <div className="nav">
          <div className="logo">
            <h1>Kaluxia</h1>
          </div>
        </div>

        <form onSubmit={registerUser}>
          <h3>sign in</h3>
          <p>Hi, create an account.</p>

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
              <label htmlFor="first name">first name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="input_con">
              <label htmlFor="last name">last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

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
              Don't have an account? <Link to="/login">login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
