import "./Contact.scss";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import mockup from "./img/contact_mockup.png";
import rectangle from "./img/rectangle.png";
import Carousel from "react-bootstrap/Carousel";
import temp from "./img/welcome_mockup.png";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "../../../node_modules/react-loading-skeleton/dist/skeleton.css";

export default function Contact() {
  return (
    <>
      {(
        <Skeleton height="20vw" width="74%" style={{ margin: "8% 13% 6%" }} />
      ) || <Logo />}

      <section className="contact">
        <div className="description">
          <h1>{<Skeleton /> || "Mobile marketing w nowym wydaniu"}</h1>
          <p>
            {<Skeleton /> ||
              "Spróbuj kreatywnego i nieszablonowego podejścia do reklamy."}
          </p>
          <p>
            {<Skeleton count={3} width="90%" height="16px" inline="true" /> ||
              "Stwórz z nami dopasowane i przyciągające formaty reklamowe - bo wiemy, jak dotrzeć do Twojej grupy docelowej."}
          </p>
        </div>
        <div className="mockup_contact_container">
          {<Skeleton height="50vw" /> || (
            <img src={mockup} className="mockup_contact" />
          )}
        </div>

        <h2>{<Skeleton /> || "3 podstawowe kroki w mobile"}</h2>

        {
          <Carousel controls={false}>
            <Carousel.Item>
              {(
                <Skeleton
                  height="42vw"
                  width="90%"
                  style={{ borderRadius: "10px", margin: "0 5%" }}
                />
              ) || <img className="w-90" src={temp} alt="First slide" />}
              <Carousel.Caption>
                <p>
                  {<Skeleton width="40%" height="16px" /> ||
                    "First slide label"}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {(
                <Skeleton
                  height="42vw"
                  width="90%"
                  style={{ borderRadius: "10px", margin: "0 5%" }}
                />
              ) || <img className="w-90" src={temp} alt="Second slide" />}

              <Carousel.Caption>
                {<Skeleton width="40%" height="16px" /> || (
                  <p>Second slide label</p>
                )}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {(
                <Skeleton
                  height="42vw"
                  width="90%"
                  style={{ borderRadius: "10px", margin: "0 5%" }}
                />
              ) || <img className="w-90" src={temp} alt="Third slide" />}

              <Carousel.Caption>
                {<Skeleton width="40%" height="16px" /> || (
                  <p>Third slide label</p>
                )}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        }

        <h2>{<Skeleton /> || "Dlaczego reklama mobile?"}</h2>
        <div className="points">
          <div className="carousel_row">
            {(
              <Skeleton
                width="80px"
                height="80px"
                containerClassName="rectangle_wrapper"
                style={{ borderRadius: "15px" }}
              />
            ) || <img src={rectangle} className="rectangle" />}
            <span>
              {(
                <Skeleton
                  count={2}
                  inline="true"
                  height="16px"
                  style={{ margin: "5px 0 0" }}
                />
              ) ||
                "Nowocześnie i w angażujący sposób zaproś użytkowników do świata Twojej marki."}
            </span>
          </div>
          <div className="carousel_row">
            {(
              <Skeleton
                width="80px"
                height="80px"
                containerClassName="rectangle_wrapper"
                style={{ borderRadius: "15px" }}
              />
            ) || <img src={rectangle} className="rectangle" />}
            <span>
              {(
                <Skeleton
                  count={2}
                  inline="true"
                  height="16px"
                  style={{ margin: "5px 0 0" }}
                />
              ) ||
                "Mobile to wysokie zasięgi wśród odbiorców z różnych generacji."}
            </span>
          </div>
          <div className="carousel_row">
            {(
              <Skeleton
                width="80px"
                height="80px"
                containerClassName="rectangle_wrapper"
                style={{ borderRadius: "15px" }}
              />
            ) || <img src={rectangle} className="rectangle" />}
            <span>
              {(
                <Skeleton
                  count={2}
                  inline="true"
                  height="16px"
                  style={{ margin: "5px 0 0" }}
                />
              ) ||
                "Super wyniki i efektywność, bo dla nas liczy się wysoka jakość, a nie ilość."}
            </span>
          </div>
        </div>
        <h2>{<Skeleton /> || "Porozmawiajmy!"}</h2>
        <p className="if">
          {(
            <Skeleton
              count={2}
              inline="true"
              height="16px"
              style={{ margin: "5px 0 0" }}
            />
          ) ||
            "Jeżeli chcesz zapoznać się z naszą ofertą lub masz pytania - zachęcamy do kontaktu."}
        </p>
        {(
          <Skeleton
            width="210px"
            height="40px"
            style={{
              lineHeight: "20px",
              margin: "2% 0 15%",
              borderRadius: "100px",
            }}
          />
        ) || <button className="contactUs">Napisz do nas</button>}
      </section>
      <Navigation />
    </>
  );
}
