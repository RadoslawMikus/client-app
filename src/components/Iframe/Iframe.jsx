import { useLocation, useParams } from "react-router-dom";
import "./Iframe.scss";
import closeBtn from "./img/close.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Iframe() {
  const params = useParams();
  const location = useLocation();
  const [path, setPath] = useState(undefined);
  const advert = useRef();
  const navigate = useNavigate();
  console.log(advert.current);

  useEffect(() => {
    let direction;

    if (location.pathname.includes("campaigns")) {
      console.log("CAMPAIGNS");
      setPath("/campaigns/" + params.id);
      direction = "/campaigns/" + params.id;
    } else if (location.pathname.includes("formats")) {
      console.log("FORMATS");
      setPath("/formats/" + params.type);
      direction = "/formats/" + params.type;
    }

    // const checker = () => {
    //   // Check if the page is hidden
    //   if (document.hidden) {
    //     console.log("User opened another tab");
    //     console.log(direction);
    //     navigate(direction);
    //   } else if (!document.hidden) {
    //     console.log("User is on this tab");
    //   }
    // };

    // document.addEventListener("visibilitychange", checker);

    // return () => {
    //   document.removeEventListener("visibilitychange", checker);
    // };
  }, []);

  const keepRatio = () => {
    const ratio = Math.min(window.innerWidth / 720, window.innerHeight / 1280);
    const width = 720 * ratio + "px";
    const height = 1280 * ratio + "px";

    // advert.current.style.width = width;
    // advert.current.style.height = height;
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
      <section id="iframe" style={{ width: "100%", height: "100%" }}>
        <iframe ref={advert} src="https://lpmobiem.civ.pl/test01"></iframe>
        <Link to={path}>
          <img src={closeBtn} className="close" />
        </Link>
      </section>
    </div>
  );
}
