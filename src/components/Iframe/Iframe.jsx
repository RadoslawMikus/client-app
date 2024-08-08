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
  const advert = useRef();
  console.log(advert.current);

  useEffect(() => {
    if (location.pathname.includes("campaigns")) {
      console.log("CAMPAIGNS");
      setPath("/campaigns/" + params.id);
    } else if (location.pathname.includes("formats")) {
      console.log("FORMATS");
      setPath("/formats/" + params.type);
    }
  }, []);

  const keepRatio = () => {
    const ratio = Math.min(window.innerWidth / 720, window.innerHeight / 1280);
    const width = 720 * ratio + "px";
    const height = 1280 * ratio + "px";

    advert.current.style.width = width;
    advert.current.style.height = height;
  };

  useEffect(() => {
    keepRatio();
    window.addEventListener("resize", keepRatio);
    return () => {
      window.removeEventListener("resize", keepRatio);
    };
  }, []);

  return (
    <div className="iframeBg">
      <section
        ref={advert}
        id="iframe"
        style={{ width: "100%", height: "100%" }}
      >
        <iframe src="https://lpmobiem.civ.pl/mobiemapp01"></iframe>
        <Link to={path}>
          <img src={closeBtn} className="close" />
        </Link>
      </section>
    </div>
  );
}
