import { YMaps, Map } from "react-yandex-maps";
import { Coords } from "../interfaces";
import Button from "react-bootstrap/Button";

interface YandexMapProps {
  coords: Coords;
  address?: string;
}

const YandexMap: React.FC<YandexMapProps> = ({ coords }) => (
  <YMaps>
    <Map defaultState={{ center: [coords.lat, coords.long], zoom: 9 }} />
  </YMaps>
);

export default YandexMap;
