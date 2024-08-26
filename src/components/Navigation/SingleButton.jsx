import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "../../../node_modules/react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

export default function SingleButton({ title, icon, path }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive || (path === "/campaigns" && location.pathname === "/login")
          ? "active"
          : ""
      }
    >
      {({ isActive }) => (
        <>
          <div className="element">
            <div className="icon">
              <img
                src={icon}
                className={
                  isActive ||
                  (path === "/campaigns" && location.pathname === "/login")
                    ? "icon_active"
                    : ""
                }
                onLoad={() => {
                  setIsLoaded(true);
                }}
              />
            </div>
            <div className="title">{title}</div>
          </div>
        </>
      )}
    </NavLink>
  );
}
