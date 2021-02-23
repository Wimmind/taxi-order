import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const apikey = "b1f85c76-415e-4cb6-8170-21e2e3fd619b";

const YandexMap = (props) => {
  const [center, setCenter] = useState([56.8498, 53.2045]);
  let ymapsObject;

  const getCoords = (ymaps) => {
    console.log(ymaps);
    ymapsObject = ymaps;
  };

  useEffect(() => {
    console.log(ymapsObject);
    if (ymapsObject) {
      ymapsObject.geocode(`Екатеринбург, ${props.address}`).then((result) => {
        const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
        setCenter(newCoords);
      });
    }
  }, [props]);

  const [zoom, setZoom] = React.useState(17);
  const mapState = React.useMemo(() => ({ center, zoom }), [center, zoom]);

  return (
    <>
      <YMaps query={{ apikey }}>
        <Map
          onLoad={(ymaps) => getCoords(ymaps)}
          modules={["geocode"]}
          width="100%"
          height="500px"
          state={mapState}
        >
          <Placemark geometry={center} />
        </Map>
      </YMaps>
    </>
  );
};

export default YandexMap;
