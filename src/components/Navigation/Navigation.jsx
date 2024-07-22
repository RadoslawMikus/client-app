import "./Navigation.scss";
import SingleButton from "./SingleButton";
import dashboard from "./img/dashboard.svg";
import grade from "./img/grade.svg";
import key from "./img/key.svg";
import mail from "./img/mail.svg";

export default function Navigation() {
  return (
    <nav>
      <SingleButton title="Logowanie" icon={key} path="/" />
      <SingleButton title="Kampanie" icon={grade} path="/campaigns" />
      <SingleButton title="Formaty" icon={dashboard} path="/formats" />
      <SingleButton title="Kontakt" icon={mail} path="/contact" />
    </nav>
  );
}
