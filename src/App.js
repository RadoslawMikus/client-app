import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Formats from "./components/Formats/Formats";
import SingleFormatList from "./components/Formats/SingleFormatList";
import Iframe from "./components/Iframe/Iframe";
import Campaigns from "./components/Campaigns/Campaigns";
import SingleCampaign from "./components/Campaigns/SingleCampaign";
import { CampaignsContext } from "./components/CampaignsContext";
import campaignsData from "./components/Campaigns/campaignsData.json";
import { AuthorizationContext } from "./components/AuthorizationContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const router = createBrowserRouter([
    { path: "*", element: <Login /> },
    {
      path: "/contact",
      element: <Contact />,
      loader: async () => {
        var promise = new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve("Loaded!");
          }, 0);
        });

        console.log(await promise);
        return null;
      },
    },
    {
      path: "/campaigns",
      element: <Campaigns />,
      loader: () => {
        if (!isLogged) {
          return redirect("/login");
        }
        return null;
      },
    },
    { path: "/campaigns/:id", element: <SingleCampaign /> },
    { path: "/campaigns/:id/:url", element: <Iframe /> },
    { path: "/formats", element: <Formats /> },
    { path: "/formats/:type", element: <SingleFormatList /> },
    { path: "/formats/:type/:url", element: <Iframe /> },
  ]);

  return (
    <AuthorizationContext.Provider value={{ isLogged, setIsLogged }}>
      <CampaignsContext.Provider value={campaignsData}>
        <>
          <div className="content">
            {/* <Login /> */}
            <RouterProvider router={router} />
            {/* <Contact /> */}
          </div>
        </>
      </CampaignsContext.Provider>
    </AuthorizationContext.Provider>
  );
}

export default App;
