import { NavLink } from "react-router-dom";
import { useRef } from "react";

export default function SingleButton({ title, icon, path }) {
  return (
    <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
      {({ isActive }) => (
        <>
          <div className="element">
            <div className="icon">
              <img src={icon} className={isActive ? "icon_active" : ""} />
            </div>
            <div className="title">{title}</div>
          </div>
        </>
      )}
    </NavLink>
  );
}
