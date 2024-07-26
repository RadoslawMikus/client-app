import { useEffect, useState } from "react";
import "./Campaigns.scss";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import search_icon from "./img/search.svg";
import arrow_back from "./img/arrow_back.svg";
import data from "./campaignsData.json";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import close from "./img/close.svg";
import closeGrey from "./img/close_grey.svg";

export const getDate = (date) => {
  return (
    date.getFullYear() +
    "." +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + date.getDate()).slice(-2)
  );
};

const searchPrepare = (str) => {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export default function Campaigns() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBarValue, setSearchBarValue] = useState("");
  const [tab, setTab] = useState("active");
  const [searchFilter, setSearchFilter] = useState(undefined);
  const [currentSearch, setCurrentSearch] = useState(data);
  const [firstRun, setFirstRun] = useState(true);
  const [recentSearch, setRecentSearch] = useState([5, 2, 13, 10, 7]);

  const getRecentSearch = () => {
    return data.filter((campaign) => recentSearch.includes(campaign.id));
  };

  console.log(getRecentSearch());

  const removeFromHistory = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    recentSearch.splice(recentSearch.indexOf(id), 1);
    setRecentSearch((recent) => [...recent]);
  };

  // useEffect(() => {
  // console.log();
  // setSearchActive(searchParams.get("active"));
  // setTab(searchParams.get("tab"));
  // setSearchFilter(searchParams.get("filter"));
  // setSearchBarValue(searchParams.get("search"));
  // }, [searchParams]);

  useEffect(() => {
    let queryParams = {
      active: searchActive,
      tab: tab,
      filter: searchFilter,
      search: searchBarValue,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([key, value]) => value !== null && value !== undefined && value !== ""
      )
    );

    const buildQueryString = (params) => {
      const queryString = new URLSearchParams(params).toString();
      return queryString;
    };

    buildQueryString(filteredParams);

    if (
      queryParams.active ||
      firstRun !== true ||
      queryParams.filter !== undefined ||
      queryParams.search !== ""
    ) {
      setSearchParams(buildQueryString(filteredParams));
    } else {
    }
  }, [searchBarValue, searchActive, searchFilter, tab, firstRun]);

  const checkInclude = (campaignToCheck, value = searchBarValue) => {
    if (
      searchPrepare(campaignToCheck.client).includes(searchPrepare(value)) ||
      searchPrepare(campaignToCheck.name).includes(searchPrepare(value))
    ) {
      return true;
    }
  };

  const handleSearch = (e) => {
    console.log(searchFilter);
    setSearchBarValue(e.target.value);

    console.log(e.target.value);
    if (searchFilter === "untested") {
      setCurrentSearch(
        data.filter(
          (campaign) =>
            checkInclude(campaign, e.target.value) &&
            campaign.newCampaign === true
        )
      );
    } else if (searchFilter === "active") {
      setCurrentSearch(
        data.filter(
          (campaign) =>
            checkInclude(campaign, e.target.value) && campaign.running === true
        )
      );
    } else if (searchFilter === "history") {
      setCurrentSearch(
        data.filter(
          (campaign) =>
            checkInclude(campaign, e.target.value) && campaign.history === true
        )
      );
    } else if (searchFilter === undefined) {
      setCurrentSearch(
        data.filter((campaign) => checkInclude(campaign, e.target.value))
      );
    }

    console.log(currentSearch);
  };

  const handleChangingFilter = (value) => {
    setSearchFilter(value);

    if (value === searchFilter) {
      setCurrentSearch(data);
      console.log("USUNIETO!");
      setSearchFilter(undefined);
    } else if (value === "active") {
      setCurrentSearch(
        data.filter((campaign) => campaign.running && checkInclude(campaign))
      );
    } else if (value === "untested") {
      setCurrentSearch(
        data.filter(
          (campaign) =>
            !campaign.history && !campaign.running && checkInclude(campaign)
        )
      );
    } else if (value === "history") {
      setCurrentSearch(
        data.filter((campaign) => campaign.history && checkInclude(campaign))
      );
    }

    console.log(currentSearch);
  };

  return (
    <>
      <section className="campaigns">
        {!searchActive && <Logo />}

        <div className="searchContainer">
          {searchActive && (
            <img
              src={arrow_back}
              className="arrowBack"
              onClick={() => {
                setSearchFilter(undefined);
                setSearchActive(false);
              }}
            />
          )}
          <input
            id="search"
            className={"search " + (searchActive ? "searchActive" : "")}
            placeholder="Wyszukaj kampanię"
            onClick={() => {
              setSearchActive(true);
              setFirstRun(false);
            }}
            onChange={handleSearch}
          ></input>
          {!searchActive && <img src={search_icon} className="searchIcon" />}
        </div>

        {searchBarValue !== "" && searchActive === true && (
          <div className="searchFilters">
            <button
              className={
                "searchFilter " + (searchFilter === "active" ? "active " : "")
              }
              onClick={() => handleChangingFilter("active")}
            >
              Trwające {searchFilter === "active" && <img src={close} />}
            </button>
            <button
              className={
                "searchFilter " + (searchFilter === "untested" ? "active " : "")
              }
              onClick={() => handleChangingFilter("untested")}
            >
              Do testów {searchFilter === "untested" && <img src={close} />}
            </button>
            <button
              className={
                "searchFilter " + (searchFilter === "history" ? "active " : "")
              }
              onClick={() => handleChangingFilter("history")}
            >
              Historia {searchFilter === "history" && <img src={close} />}
            </button>
          </div>
        )}

        {!searchActive && (
          <div className="filterButtons">
            <button
              className={"activeBtn " + (tab === "active" ? "active" : "")}
              onClick={() => {
                setTab("active");
                setFirstRun(false);
              }}
            >
              Aktualne
            </button>
            <button
              className={"historyBtn " + (tab === "history" ? "active" : "")}
              onClick={() => {
                setTab("history");
                setFirstRun(false);
              }}
            >
              Historia
            </button>
            <div className="indicator">
              <span
                className={tab === "active" ? "activeBar" : "historyBar"}
              ></span>
            </div>
          </div>
        )}

        {!searchActive && (
          <div className="campaignCatalogue">
            {tab === "active" && (
              <div className="activeCampaigns">
                <h3>Do przetestowania:</h3>

                {data.map((item) => {
                  if (!item.history && !item.running) {
                    return (
                      <Link
                        to={item.id.toString()}
                        state={{ tab }}
                        key={"campaign_" + item.id}
                      >
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
                        >
                          <div className="client">{item.client}</div>
                          <div className="name">{item.name}</div>
                          <div className="subtext">{"Przetestuj teraz"}</div>
                        </div>
                      </Link>
                    );
                  }
                })}

                <h3>Trwające kampanie:</h3>

                {data.map((item) => {
                  if (item.running) {
                    return (
                      <Link
                        to={item.id.toString()}
                        state={{ tab }}
                        key={"campaign_" + item.id}
                      >
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
                        >
                          <div className="client">{item.client}</div>
                          <div className="name">{item.name}</div>
                          <div className="subtext">
                            {getDate(new Date(item.startDate)) +
                              " - " +
                              getDate(new Date(item.endDate))}
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            )}

            {tab === "history" && (
              <div className="historyCampaigns">
                {data.map((item) => {
                  if (item.history) {
                    return (
                      <Link
                        to={item.id.toString()}
                        state={{ tab }}
                        key={"campaign_" + item.id}
                      >
                        <div className="campaign">
                          <div className="client history">{item.client}</div>
                          <div className="name history">{item.name}</div>
                          <div className="subtext history">
                            {getDate(new Date(item.startDate)) +
                              " - " +
                              getDate(new Date(item.endDate))}
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            )}
          </div>
        )}

        <div className="searchResults">
          {searchActive && searchBarValue === "" && (
            <h3>Ostatnio wyszukiwane:</h3>
          )}

          {searchActive &&
            searchBarValue !== "" &&
            currentSearch.map((item) => {
              return (
                <Link
                  to={item.id.toString()}
                  state={`?${searchParams.toString()}`}
                  key={"campaign_" + item.id}
                >
                  <div
                    className={
                      "campaign " +
                      (item.newCampaign
                        ? "new"
                        : item.alreadyTested && !item.history && !item.running
                        ? "tested"
                        : "")
                    }
                  >
                    <div
                      className={"client " + (item.history ? "history" : "")}
                    >
                      {item.client}
                    </div>
                    <div className={"name " + (item.history ? "history" : "")}>
                      {item.name}
                    </div>
                    <div
                      className={"subtext " + (item.history ? "history" : "")}
                    >
                      {!item.running && !item.history
                        ? "Przetestuj teraz"
                        : getDate(new Date(item.startDate)) +
                          " - " +
                          getDate(new Date(item.endDate))}{" "}
                      {item.history && "(zakończona)"}
                    </div>
                  </div>
                </Link>
              );
            })}

          {searchActive &&
            searchBarValue === "" &&
            getRecentSearch().map((item) => {
              return (
                <Link
                  to={item.id.toString()}
                  state={`?${searchParams.toString()}`}
                  key={"campaign_" + item.id}
                >
                  <div className="campaign">
                    <div
                      className={"client " + (item.history ? "history" : "")}
                    >
                      {item.client}
                    </div>
                    <div className={"name " + (item.history ? "history" : "")}>
                      {item.name}
                    </div>
                    <div
                      className={"subtext " + (item.history ? "history" : "")}
                    >
                      {!item.running && !item.history
                        ? "Przetestuj teraz"
                        : getDate(new Date(item.startDate)) +
                          " - " +
                          getDate(new Date(item.endDate))}{" "}
                      {item.history && "(zakończona)"}
                    </div>
                    <span id={"remove_" + item.id} className=" close">
                      <img
                        src={closeGrey}
                        onClick={(e) => {
                          removeFromHistory(e, item.id);
                        }}
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      <Navigation />
    </>
  );
}
