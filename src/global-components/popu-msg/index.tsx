import "./styles.scss";
import { LuBadgeX } from "react-icons/lu";
import { LuBadgeCheck } from "react-icons/lu";

type PropsType = {
  type: string;
  msg: string | null;
  isActive: boolean;
};
export const Pop_up = ({ type, msg, isActive }: PropsType) => {
  return (
    <div className={isActive ? "pop_up_wrapper active" : "pop_up_wrapper"}>
      <div
        className="msg_con"
        style={{ color: type === "success" ? "green" : "red" }}
      >
        <div className="icon">
          {type === "success" ? <LuBadgeCheck /> : <LuBadgeX />}
        </div>
        <p style={{ color: type === "success" ? "green" : "red" }}>{msg}</p>
      </div>
    </div>
  );
};
