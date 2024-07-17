import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import welcome from "./img/welcome_mockup.png";
import "./Login.scss";
import key from "./img/key.svg";
import account from "./img/account_box.svg";
import { useState } from "react";

export default function Login() {
  const [modalOpen, setModalOpen] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleModal() {
    setModalOpen((current) => !current);
  }

  function handleLogin(e) {
    e.preventDefault();

    const data = {
      login: login,
      password: password,
    };

    console.log(data);
  }

  return (
    <>
      <Logo />

      <div className="login">
        <h1>Cześć!</h1>
        <p className="about_section">
          W tym miejscu przetestujesz reklamy z Twoich kampanii
        </p>

        <img src={welcome} className="mockup" />

        <form>
          <div className="inputFlex">
            <span className="icon">
              <img src={account} />
            </span>
            <input
              type="email"
              placeholder="Login"
              id="mail"
              name="login"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className="inputFlex">
            <span className="icon">
              <img src={key} />
            </span>
            <input
              type="password"
              placeholder="Hasło"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className={`login-btn 
              ${
                login.trim().length > 0 && password.trim().length > 0
                  ? "green"
                  : ""
              }`}
          >
            Zaloguj się
          </button>
        </form>

        <p className="no_password" onClick={handleModal}>
          Nie masz loginu lub nie pamiętasz hasła?
        </p>
      </div>
      {modalOpen && (
        <>
          <div id="overlay"></div>
          <div id="pop_up">
            <h2>Jak uzyskać dostęp?</h2>
            <p>
              Aby uzyskać dostęp do testowania Twoich kampanii reklamowych
              skontaktuj się z osobą obsługującą, z Mobiem / Polsat Media.
            </p>

            <h3 onClick={handleModal}>Ok, rozumiem</h3>
          </div>
        </>
      )}

      <Navigation />
    </>
  );
}
