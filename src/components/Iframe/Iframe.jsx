import { useLocation, useParams } from "react-router-dom";
import "./Iframe.scss";
import closeBtn from "./img/close.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Iframe() {
  const params = useParams();
  const location = useLocation();
  const [path, setPath] = useState(undefined);
  const advert = useRef(null);
  console.log(advert.current);
  const [ratio, setRatio] = useState(
    Math.min(window.innerWidth / 720, window.innerHeight / 1280)
  );
  const [closingPosition, setClosingPosition] = useState(undefined);

  useEffect(() => {
    if (location.pathname.includes("campaigns")) {
      console.log("CAMPAIGNS");
      setPath("/campaigns/" + params.id);
    } else if (location.pathname.includes("formats")) {
      console.log("FORMATS");
      setPath("/formats/" + params.type);
    }
  }, []);

  return (
    <section id="iframe">
      <iframe ref={advert} src="https://lpmobiem.civ.pl/mobiemapp01"></iframe>
      <Link to={path}>
        <img src={closeBtn} className="close" />
      </Link>
    </section>
  );
}
