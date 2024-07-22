import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Formats from "./components/Formats/Formats";
import SingleFormatList from "./components/Formats/SingleFormatList";
import Iframe from "./components/Iframe/Iframe";
import Campaigns from "./components/Campaigns/Campaigns";
import SingleCampaign from "./components/Campaigns/SingleCampaign";
import { CampaignsContext } from "./components/CampaignsContext";
import campaignsData from "./components/Campaigns/campaignsData.json";

const router = createBrowserRouter([
  { path: "*", element: <Login /> },
  { path: "/contact", element: <Contact /> },
  { path: "/campaigns", element: <Campaigns /> },
  { path: "/campaigns/:id", element: <SingleCampaign /> },
  { path: "/formats", element: <Formats /> },
  { path: "/formats/:type", element: <SingleFormatList /> },
  { path: "/formats/:type/:url", element: <Iframe /> },
]);

function App() {
  return (
    <CampaignsContext.Provider value={campaignsData}>
      <>
        <div className="content">
          {/* <Login /> */}
          <RouterProvider router={router} />
          {/* <Contact /> */}
        </div>
      </>
    </CampaignsContext.Provider>
  );
}

export default App;
