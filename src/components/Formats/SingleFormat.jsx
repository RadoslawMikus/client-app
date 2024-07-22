import { Link } from "react-router-dom";

export default function SingleFormat({ styles, title, subtitle, image, path }) {
  return (
    <>
      <Link to={path} className="section" title={title}>
        <div className={"description " + styles}>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </div>
        <img src={image} />
      </Link>
    </>
  );
}
