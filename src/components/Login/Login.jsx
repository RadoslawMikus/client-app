import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import welcome from "./img/welcome_mockup.png";
import "./Login.scss";
import key from "./img/key.svg";
import account from "./img/account_box.svg";
import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../AuthorizationContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const authContext = useContext(AuthorizationContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginPlaceholder, setLoginPlaceholder] = useState("");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("");
  const navigate = useNavigate();

  console.log(authContext);

  useEffect(() => {
    if (authContext.isLogged) {
      navigate("/campaigns");
    }
  }, [authContext.isLogged]);

  function handleModal() {
    setModalOpen((current) => !current);
  }

  function handleLogin(e) {
    e.preventDefault();

    const data = {
      login: login,
      password: password,
    };

    if (login === "admin" && password === "admin") {
      authContext.setIsLogged(true);
    }

    console.log(data);
  }

  return (
    <>
      <Logo />

      <section className="login">
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

            <span
              className={
                "customPlaceholder " +
                (login !== "" || loginPlaceholder !== "" ? "active" : "")
              }
            >
              Login
            </span>

            <input
              type="email"
              placeholder={loginPlaceholder}
              id="mail"
              name="login"
              onChange={(e) => setLogin(e.target.value)}
              onFocus={() => setLoginPlaceholder("Adres e-mail")}
              onBlur={() => setLoginPlaceholder("")}
            />
          </div>

          <div className="inputFlex">
            <span className="icon">
              <img src={key} />
            </span>

            <span
              className={
                "customPlaceholder " +
                (password !== "" || passwordPlaceholder !== "" ? "active" : "")
              }
            >
              Hasło
            </span>

            <input
              type="password"
              placeholder={passwordPlaceholder}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordPlaceholder("Twoje hasło")}
              onBlur={() => setPasswordPlaceholder("")}
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
      </section>
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
