import { Route, Routes } from "react-router-dom";
import "./App.scss";
import {
  Home_page,
  Posts_page,
  Authurs_page,
  Single_author_page,
  Single_post_page,
  Login_page,
  Signin_page,
  CreatePost,
} from "./pages";
import { Footer, Navbar } from "./global-components";
import { useContext, useEffect } from "react";
import axios from "axios";
import { userContext } from "./global-components/context/user-context";

function App() {
  const { currentUser, setCurrentUser } = useContext(userContext);

  useEffect(() => {
    const checkUserLoginSession = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/authSession`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        console.log(response.data);
      } catch (error: any) {
        if (error?.response.data.message === "User session expired") {
          setCurrentUser(null);
        }
      }
    };

    checkUserLoginSession();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home_page />} />
        <Route path="/posts" element={<Posts_page />} />
        <Route path="/authors" element={<Authurs_page />} />
        <Route path="/author/:id" element={<Single_author_page />} />

        <Route path="/post/:id" element={<Single_post_page />} />
        <Route path="/login" element={<Login_page />} />
        <Route path="/signin" element={<Signin_page />} />
        <Route path="/create-post/:id/:type?" element={<CreatePost />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
