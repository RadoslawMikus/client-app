import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SingleButton({ title, icon, path }) {
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
              />
            </div>
            <div className="title">{title}</div>
          </div>
        </>
      )}
    </NavLink>
  );
}
