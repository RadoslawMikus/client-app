import { Link, useParams } from "react-router-dom";
import data from "./formatsData.json";
import arrow_back from "./img/arrow_back.svg";

export default function SingleFormatList() {
  const params = useParams();

  const { title, description_1, description_2, formats } = data[params.type];

  return (
    <>
      <section className="formatList">
        <div className={"header bg_" + params.type}>
          <Link to="/formats">
            <span className="arrowBack">
              <img src={arrow_back} alt="Powrót" />
            </span>
          </Link>
          <h1>{title}</h1>
        </div>
        <div className="full_description">
          <p className="section_description">{description_1}</p>
          <p className="section_description">{description_2}</p>
          <p className="section_title">Poznaj rodzaje {title}</p>
        </div>

        <div className="format_list">
          {formats.map((el) => {
            return (
              <div className="format" key={el.title}>
                <div className="left_format">
                  <h2>{el.title}</h2>
                  <p>{el.description}</p>
                </div>
                <Link to={el.url}>
                  <button className={"bg_" + params.type}>Zobacz</button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
