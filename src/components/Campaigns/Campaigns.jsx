import { useEffect, useState } from "react";
import "./Campaigns.scss";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import search_icon from "./img/search.svg";
import arrow_back from "./img/arrow_back.svg";
// import data from "./campaignsData.json";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import close from "./img/close.svg";
import closeGrey from "./img/close_grey.svg";
import Iframe from "../Iframe/Iframe";
import { useContext } from "react";
import { AuthorizationContext } from "../AuthorizationContext";
import { CampaignsContext } from "../CampaignsContext";

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
  // const [data, setData] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [recentSearch, setRecentSearch] = useState([5, 2, 13, 10, 7]);
  const context = useContext(AuthorizationContext);
  const [data, setData] = useContext(CampaignsContext);
  const [currentSearch, setCurrentSearch] = useState(data);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const [scrollBlock, setScrollBlock] = useState(true);

  // console.log(context);

  useEffect(() => {
    const getCampaigns = async () => {
      const response = await fetch("http://localhost:4000/campaigns");
      const json = await response.json();
      // setData(json);
      setData(json);
      console.log("UPDATE KAMPANII!");
    };

    try {
      getCampaigns();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getRecentSearch = () => {
    return data.filter((campaign) => recentSearch.includes(campaign.id));
  };

  // console.log(getRecentSearch());

  // console.log(searchParams.get("active"));

  const removeFromHistory = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    recentSearch.splice(recentSearch.indexOf(id), 1);
    setRecentSearch((recent) => [...recent]);
  };

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

  const handleSearch = (
    e,
    fromParamsSearch,
    fromParamsFilter = searchFilter
  ) => {
    let txt;

    if (fromParamsSearch === undefined) {
      txt = e.target.value;
    } else {
      txt = fromParamsSearch;
      console.log("TO");
    }

    setSearchBarValue(txt);
    console.log("SEARCHFILTER: " + searchFilter);

    console.log(txt);
    if (fromParamsFilter === "untested") {
      setCurrentSearch(
        data.filter(
          (campaign) =>
            checkInclude(campaign, txt) && campaign.newCampaign === true
        )
      );
    } else if (fromParamsFilter === "active") {
      setCurrentSearch(
        data.filter(
          (campaign) => checkInclude(campaign, txt) && campaign.running === true
        )
      );
    } else if (fromParamsFilter === "history") {
      console.log("teoretycznie to");
      setCurrentSearch(
        data.filter(
          (campaign) => checkInclude(campaign, txt) && campaign.history === true
        )
      );
    } else if (fromParamsFilter === undefined) {
      setCurrentSearch(data.filter((campaign) => checkInclude(campaign, txt)));
    }

    console.log(currentSearch);
  };

  useEffect(() => {
    const getScroll = () => {
      if (!scrollBlock) {
        console.log(window.scrollY);
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", getScroll);

    return () => {
      window.removeEventListener("scroll", getScroll);
    };
  }, [scrollBlock]);

  useEffect(() => {
    if (searchParams.get("tab") !== null) {
      console.log(searchParams.get("tab"));
      setTab(searchParams.get("tab"));
    }

    if (searchParams.get("active") !== null) {
      console.log(searchParams.get("active") === "true");
      setSearchActive(searchParams.get("active") === "true");
    }

    if (searchParams.get("filter") !== null) {
      console.log("searchParamsFilter:", searchParams.get("filter"));
      setSearchFilter(searchParams.get("filter"));
      handleChangingFilter(searchParams.get("filter"));
    }

    if (searchParams.get("search") !== null) {
      handleSearch(
        { target: { value: "" } },
        searchParams.get("search"),
        searchParams.get("filter")
      );
    }

    if (
      searchParams.get("scroll") !== null &&
      searchParams.get("scroll") !== 0
    ) {
      setTimeout(() => {
        window.scrollTo({
          left: 0,
          top: searchParams.get("scroll"),
          behavior: "instant",
        });
        console.log("SCROLL P: " + searchParams.get("scroll"));
        setScrollBlock(false);
      }, 0);
    }

    console.log("GETTING PARAMS!");
    const indicator = document.querySelector(".indicator span");
    const activeBtn = document.querySelector(".activeBtn");
    const historyBtn = document.querySelector(".historyBtn");

    setTimeout(() => {
      // indicator.style.transition = "0.5s ease";
      // activeBtn.style.transition = "0.3s ease";
      // historyBtn.style.transition = "0.3s ease";
    }, 600);
  }, []);

  const handleChangingFilter = (value) => {
    setSearchFilter(value);

    if (value === searchFilter) {
      setCurrentSearch(data.filter((campaign) => checkInclude(campaign)));
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
                setSearchBarValue("");
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
            value={searchActive ? searchBarValue : ""}
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
                        state={`?tab=${tab}&scroll=${scrollY}`}
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
                        state={`?tab=${tab}&scroll=${scrollY}`}
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
                        state={`?tab=${tab}&scroll=${scrollY}`}
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
                  state={`?${searchParams.toString()}&scroll=${scrollY}`}
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
