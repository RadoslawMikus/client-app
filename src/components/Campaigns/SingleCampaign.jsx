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
  const listOfFormats = [
    {
      id: 1,
      title: "Fullpage Rich Media",
      description: "10.02.2023 - 18.03.2023",
      url: "mobiemapp01",
    },
    {
      id: 2,
      title: "Notyfikacja graficzna",
      description: "21.02.2023 - 24.03.2023",
      url: "URL kreacji 2",
    },
  ];

  console.log(location);

  return (
    <>
      <section className="singleCampaign">
        <div className={"header " + (campaign.history ? "historyHeader" : "")}>
          <Link to={"/campaigns" + location.state}>
            <span className="arrowBack">
              <img src={arrow_back} alt="Powrót" />
            </span>
          </Link>
          <h1>{campaign.client}</h1>
        </div>
        {campaign.newCampaign && (
          <div className="badgeNew">Kampania do przetestowania</div>
        )}

        {!campaign.running && !campaign.history && campaign.alreadyTested && (
          <div className="badgeTested">Kampania przetestowana</div>
        )}

        {campaign.running && (
          <div className="badgeRunning">Kampania uruchomiona</div>
        )}

        {campaign.history && (
          <div className="badgeEnded">Kampania zakończona</div>
        )}
        <div className="fullDescription">
          {" "}
          <div className="sectionTitle">Nazwa kampanii</div>
          <div
            className={
              "campaignTitle " + (campaign.history ? "historyTitle" : "")
            }
          >
            {campaign.name}
          </div>
          <div className="sectionTitle">Czas trwania</div>
          <h2 className="dates">
            {getDate(new Date(campaign.startDate)) +
              " - " +
              getDate(new Date(campaign.endDate))}
          </h2>
        </div>

        <div className="format_list">
          {listOfFormats.map((format) => {
            return (
              <div className="format" key={format.id}>
                <div className="leftFormat">
                  <h2>{format.title}</h2>
                  <p>{format.description}</p>
                </div>

                <Link to={`${format.url}`}>
                  <button className={campaign.history ? "historyButton" : ""}>
                    {campaign.alreadyTested ? "Zobacz" : "Przetestuj"}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
