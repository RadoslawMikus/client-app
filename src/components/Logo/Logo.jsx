import logoImg from "./logo.svg";
import "./Logo.scss";
import Skeleton from "react-loading-skeleton";
import "../../../node_modules/react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

export default function Logo() {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {!isLoaded && (
        <Skeleton height="20vw" width="74%" style={{ margin: "8% 13% 4%" }} />
      )}
      <img
        className="logo"
        src={logoImg}
        style={{ display: isLoaded ? "block" : "none" }}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </>
  );
}
