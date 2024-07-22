import { useState } from "react";
import "./Campaigns.scss";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import search_icon from "./img/search.svg";
import arrow_back from "./img/arrow_back.svg";
import data from "./campaignsData.json";

export default function Campaigns() {
  const [searchActive, setSearchActive] = useState(false);
  const [filter, setFilter] = useState("active");

  return (
    <>
      <section className="campaigns">
        {!searchActive && <Logo />}

        <div className="searchContainer">
          {searchActive && (
            <img
              src={arrow_back}
              className="arrowBack"
              onClick={() => setSearchActive(false)}
            />
          )}
          <input
            id="search"
            className={"search " + (searchActive ? "searchActive" : "")}
            placeholder="Wyszukaj kampanię"
            onClick={() => setSearchActive(true)}
          ></input>
          {!searchActive && <img src={search_icon} className="searchIcon" />}
        </div>

        {!searchActive && (
          <div className="filterButtons">
            <button
              className={"activeBtn " + (filter === "active" ? "active" : "")}
              onClick={() => setFilter("active")}
            >
              Aktualne
            </button>
            <button
              className={"historyBtn " + (filter === "history" ? "active" : "")}
              onClick={() => setFilter("history")}
            >
              Historia
            </button>
            <div className="indicator">
              <span
                className={filter === "active" ? "activeBar" : "historyBar"}
              ></span>
            </div>
          </div>
        )}

        {!searchActive && (
          <div className="campaignCatalogue">
            {filter === "active" && (
              <div className="activeCampaigns">
                <h3>Do przetestowania:</h3>

                {data.map((item) => {
                  if (!item.history && !item.running) {
                    return (
                      <div
                        className={
                          "campaign " +
                          (item.newCampaign
                            ? "new"
                            : item.alreadyTested &&
                              !item.history &&
                              !item.running
                            ? "tested"
                            : "")
                        }
                        key={"campaign_" + item.id}
                      >
                        <div className="client">{item.client}</div>
                        <div className="name">{item.name}</div>
                        <div className="subtext">{"Przetestuj teraz"}</div>
                      </div>
                    );
                  }
                })}

                <h3>Trwające kampanie:</h3>

                {data.map((item) => {
                  if (item.running) {
                    return (
                      <div
                        className={
                          "campaign " +
                          (item.newCampaign
                            ? "new"
                            : item.alreadyTested &&
                              !item.history &&
                              !item.running
                            ? "tested"
                            : "")
                        }
                        key={"campaign_" + item.id}
                      >
                        <div className="client">{item.client}</div>
                        <div className="name">{item.name}</div>
                        <div className="subtext">{"Przetestuj teraz"}</div>
                      </div>
                    );
                  }
                })}
              </div>
            )}

            {filter === "history" && (
              <div className="historyCampaigns">
                {data.map((item) => {
                  if (item.history) {
                    return (
                      <div className="campaign" key={"campaign_" + item.id}>
                        <div className="client history">{item.client}</div>
                        <div className="name history">{item.name}</div>
                        <div className="subtext history">
                          {"Przetestuj teraz"}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        )}
      </section>
      <Navigation />
    </>
  );
}
