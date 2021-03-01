import React, { useState, useEffect, memo, useMemo } from "react";
import { YMaps, Map, Placemark, withYMaps } from "react-yandex-maps";

const apikey = "b1f85c76-415e-4cb6-8170-21e2e3fd619b";

type YandexMapProps = {
  address: string;
};

type YmapsProps = {
  ymaps?: any;
};

const YandexMap: React.FC<YandexMapProps> = ({ address }) => {
  const PositionedMap: React.FC<YmapsProps> = memo(({ ymaps }) => {
    const [coords, setCoords] = useState([56.8498, 53.2045]);

    useEffect(() => {
      ymaps.geocode(`Ижевск, ${address}`).then((result: any) => {
        if (result.geoObjects.get(0)) {
          const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
          setCoords(newCoords);
        } else {
          console.log("gg");
        }
      });
    }, [address]);

    const getCoordsOnclick = (event: any) => {
      const currentCoords = event.get("coords");
      setCoords(currentCoords);
      ymaps.geocode(currentCoords).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0);

        const newAddres = [
          firstGeoObject.getThoroughfare(),
          firstGeoObject.getPremiseNumber(),
        ].join(", ");
        console.log(newAddres);
      });
    };

    return (
      <Map
        onClick={getCoordsOnclick}
        width="100%"
        height="500px"
        modules={["geocode"]}
        state={{
          center: coords,
          zoom: 17,
        }}
        options={{
          searchControlProvider: "yandex#search",
          yandexMapDisablePoiInteractivity: true,
        }}
      >
        <Placemark
          geometry={coords}
          options={{
            preset: "slands#circleDotIcon",
            iconColor: "#e5be01",
          }}
        />
      </Map>
    );
  });

  const ConnectedMap = useMemo(() => {
    return withYMaps(PositionedMap, true, ["geolocation", "geocode"]);
  }, [PositionedMap]);

  return (
    <>
      <YMaps query={{ apikey }}>
        <ConnectedMap />
      </YMaps>
    </>
  );
};

export default YandexMap;
