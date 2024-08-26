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
  const [isLoaded, setIsLoaded] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter >= 7) {
      console.log("FULLY LOADED!");
      setIsLoaded(true);
      setCounter(0);
    }
  }, [counter]);

  const onLoad = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <>
      <Logo />

      <section className="contact">
        <div className="description">
          <h1> Mobile marketing w nowym wydaniu </h1>
          <p>Spróbuj kreatywnego i nieszablonowego podejścia do reklamy.</p>
          <p>
            Stwórz z nami dopasowane i przyciągające formaty reklamowe - bo
            wiemy, jak dotrzeć do Twojej grupy docelowej.
          </p>
        </div>
        <div className="mockup_contact_container">
          {!isLoaded && (
            <Skeleton
              height="45vw"
              width="90%"
              style={{ margin: "3% 5%", borderRadius: "25px" }}
            />
          )}

          <img
            src={mockup}
            className="mockup_contact"
            onLoad={onLoad}
            style={{ display: isLoaded ? "block" : "none" }}
          />
        </div>

        <h2>3 podstawowe kroki w mobile</h2>

        {
          <Carousel controls={false}>
            <Carousel.Item>
              {!isLoaded && (
                <Skeleton
                  height="42vw"
                  width="94%"
                  style={{ borderRadius: "10px", margin: "0 3%" }}
                />
              )}

              <img
                className="w-90"
                src={temp}
                alt="First slide"
                onLoad={onLoad}
                style={{ display: isLoaded ? "block" : "none" }}
              />

              <Carousel.Caption>
                <p>First slide label</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {!isLoaded && (
                <Skeleton
                  height="42vw"
                  width="92%"
                  style={{ borderRadius: "10px", margin: "0 4%" }}
                />
              )}

              <img
                className="w-90"
                src={temp}
                alt="Second slide"
                onLoad={onLoad}
                style={{ display: isLoaded ? "block" : "none" }}
              />

              <Carousel.Caption>
                <p>Second slide label</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {!isLoaded && (
                <Skeleton
                  height="42vw"
                  width="92%"
                  style={{ borderRadius: "10px", margin: "0 4%" }}
                />
              )}

              <img
                className="w-90"
                src={temp}
                alt="Third slide"
                onLoad={onLoad}
                style={{ display: isLoaded ? "block" : "none" }}
              />

              <Carousel.Caption>
                <p>Third slide label</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        }

        <h2>Dlaczego reklama mobile?</h2>
        <div className="points">
          <div className="carousel_row">
            {!isLoaded && (
              <Skeleton
                width="80px"
                height="80px"
                containerClassName="rectangle_wrapper"
                style={{ borderRadius: "15px" }}
              />
            )}

            <img src={rectangle} className="rectangle" onLoad={onLoad} />
            <span>
              Nowocześnie i w angażujący sposób zaproś użytkowników do świata
              Twojej marki.
            </span>
          </div>
          <div className="carousel_row">
            {!isLoaded && (
              <Skeleton
                width="80px"
                height="80px"
                containerClassName="rectangle_wrapper"
                style={{ borderRadius: "15px" }}
              />
            )}

            <img src={rectangle} className="rectangle" onLoad={onLoad} />
            <span>
              Mobile to wysokie zasięgi wśród odbiorców z różnych generacji.
            </span>
          </div>
          <div className="carousel_row">
            {!isLoaded && (
              <Skeleton
                width="80px"
                height="80px"
                containerClassName="rectangle_wrapper"
                style={{ borderRadius: "15px" }}
              />
            )}

            <img src={rectangle} className="rectangle" onLoad={onLoad} />
            <span>
              Super wyniki i efektywność, bo dla nas liczy się wysoka jakość, a
              nie ilość.
            </span>
          </div>
        </div>
        <h2> Porozmawiajmy! </h2>
        <p className="if">
          Jeżeli chcesz zapoznać się z naszą ofertą lub masz pytania - zachęcamy
          do kontaktu.
        </p>
        <button className="contactUs">Napisz do nas</button>
      </section>
      <Navigation />
    </>
  );
}
