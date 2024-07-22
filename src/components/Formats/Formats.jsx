import "./Formats.scss";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import SingleFormat from "./SingleFormat";
import min_push from "./img/min_push.png";
import min_full from "./img/min_full.png";
import min_baner from "./img/min_baner.png";
import min_video from "./img/min_video.png";
import { useEffect } from "react";

export default function Formats() {
  return (
    <>
      <Logo />
      <section className="formats">
        <SingleFormat
          title="Push Ads"
          subtitle="Docieraj bezpośrednio"
          image={min_push}
          styles="push"
          path="push"
        />

        <SingleFormat
          title="Fullpage Ads"
          subtitle="Wizualne zaangażowanie"
          image={min_full}
          styles="fullpage"
          path="fullpage"
        />

        <SingleFormat
          title="Video Ads"
          subtitle="Spoty reklamowe w mobile"
          image={min_video}
          styles="video"
          path="video"
        />

        <SingleFormat
          title="Banner Ads"
          subtitle="Klasyczna wydajność mobile"
          image={min_baner}
          styles="banner"
          path="banner"
        />
      </section>

      <Navigation />
    </>
  );
}
