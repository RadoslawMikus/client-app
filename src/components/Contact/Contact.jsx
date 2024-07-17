import "./Contact.scss";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import mockup from "./img/contact_mockup.png";
import rectangle from "./img/rectangle.png";
import Carousel from "react-bootstrap/Carousel";
import temp from "./img/welcome_mockup.png";

export default function Contact() {
  return (
    <>
      <Logo />

      <section className="contact">
        <div className="description">
          <h1>Mobile marketing w nowym wydaniu</h1>
          <p>Spróbuj kreatywnego i nieszablonowego podejścia do reklamy.</p>
          <p>
            Stwórz z nami dopasowane i przyciągające formaty reklamowe - bo
            wiemy, jak dotrzeć do Twojej grupy docelowej.
          </p>
        </div>
        <img src={mockup} className="mockup_contact" />
        <h2>3 podstawowe kroki w mobile </h2>

        {
          <Carousel controls={false}>
            <Carousel.Item>
              <img className="w-90" src={temp} alt="First slide" />
              <Carousel.Caption>
                <p>First slide label</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="w-90" src={temp} alt="Second slide" />

              <Carousel.Caption>
                <p>Second slide label</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="w-90" src={temp} alt="Third slide" />

              <Carousel.Caption>
                <p>Third slide label</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        }

        <h2>Dlaczego reklama mobile?</h2>
        <div className="points">
          <div className="carousel_row">
            <img src={rectangle} className="rectangle" />
            <span>
              Nowocześnie i w angażujący sposób zaproś użytkowników do świata
              Twojej marki.
            </span>
          </div>
          <div className="carousel_row">
            <img src={rectangle} className="rectangle" />
            <span>
              Mobile to wysokie zasięgi wśród odbiorców z różnych generacji.
            </span>
          </div>
          <div className="carousel_row">
            <img src={rectangle} className="rectangle" />
            <span>
              Super wyniki i efektywność, bo dla nas liczy się wysoka jakość, a
              nie ilość.
            </span>
          </div>
        </div>
        <h2>Porozmawiajmy!</h2>
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
