import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "*", element: <Login /> },
  { path: "/contact", element: <Contact /> },
]);

function App() {
  return (
    <>
      <div className="content">
        {/* <Login /> */}
        <RouterProvider router={router} />
        {/* <Contact /> */}
      </div>
    </>
  );
}

export default App;
