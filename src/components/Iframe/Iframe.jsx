import { useParams } from "react-router-dom";

export default function Iframe() {
  const params = useParams();
  return <>iframe, url: {params.url}</>;
}
