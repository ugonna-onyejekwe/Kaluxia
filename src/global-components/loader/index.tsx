import { HashLoader } from "react-spinners";
import "./style.scss";

export const Loader = () => {
  return (
    <div className="loading_wrapper">
      <div className="box">
        <HashLoader color="purple" className="loader" />
      </div>
    </div>
  );
};
