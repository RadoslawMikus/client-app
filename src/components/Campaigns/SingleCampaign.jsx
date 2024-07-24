import { useContext } from "react";
import { CampaignsContext } from "../CampaignsContext";
import { useParams } from "react-router-dom";
import { getDate } from "./Campaigns";
import arrow_back from "./img/arrow_back.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SingleCampaign() {
  const campaignsCtx = useContext(CampaignsContext);
  const params = useParams();

  const getCampaignData = () => {
    for (let el of campaignsCtx) {
      if (parseInt(params.id) === el.id) {
        return el;
      }
    }
  };

  let campaign = getCampaignData();
  let location = useLocation();
  console.log(location.state.filter);
  return (
    <>
      <section className="singleCampaign">
        <div className="header">
          <Link to={"/campaigns?mode=" + location.state.filter}>
            <span className="arrowBack">
              <img src={arrow_back} alt="Powrót" />
            </span>
          </Link>
          <h1>{campaign.client}</h1>
        </div>
        <div className="badgeTested">Kampania przetestowana</div>
        <div className="fullDescription">
          {" "}
          <div className="sectionTitle">Nazwa kampanii</div>
          <div className="campaignTitle">{campaign.name}</div>
          <div className="sectionTitle">Czas trwania</div>
          <h2 className="dates">
            {getDate(new Date(campaign.startDate)) +
              " - " +
              getDate(new Date(campaign.endDate))}
          </h2>
        </div>
      </section>
    </>
  );
}
