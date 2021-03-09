import React, { useState, useEffect, memo, useMemo } from "react";
import { YMaps, Map, Placemark, withYMaps } from "react-yandex-maps";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const apikey = "b1f85c76-415e-4cb6-8170-21e2e3fd619b";

interface PositionedMapProps {
  ymaps?: any;
}

const YandexMap: React.FC = () => {
  const PositionedMap: React.FC<PositionedMapProps> = memo(({ ymaps }) => {
    const [baseMarkerColor, setBaseMarkerColor] = useState<string>("#e5be01");

    const { address, coords } = useTypedSelector((state) => state.address);
    const { crewsInfo } = useTypedSelector((state) => state.order);
    console.log(crewsInfo[0] ? crewsInfo[0].coords : "lol");
    const {
      setAddress,
      toggleValidityAddress,
      setInvalidAddressMessage,
      setCoords,
      fetchCrewInfo,
    } = useActions();

    useEffect(() => {
      ymaps.geocode(`Ижевск, ${address}`).then((result: any) => {
        const obj = result.geoObjects.get(0);
        let error;
        let message = "";

        if (obj) {
          switch (
            obj.properties.get("metaDataProperty.GeocoderMetaData.precision")
          ) {
            case "exact":
              break;
            case "number":
            case "near":
            case "range":
              error = true;
              message = "Уточните номер дома";
              break;
            case "street":
              error = true;
              message = "Уточните номер дома";
              break;
            case "other":
            default:
              message = "Адрес не найден";
              error = true;
          }
        } else {
          error = true;
        }

        if (error) {
          toggleValidityAddress(false);
          setInvalidAddressMessage(message);
        } else {
          const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
          fetchCrewInfo({
            source_time: Date.now(),
            address: address,
            coords: newCoords,
          });
          setCoords(newCoords);
          toggleValidityAddress(true);
          setBaseMarkerColor("#e5be01");
        }
      });
    }, [address]);

    const getCoordsOnclick = (event: any) => {
      const currentCoords = event.get("coords");
      setCoords(currentCoords);
      ymaps.geocode(currentCoords).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0);

        if (
          !firstGeoObject.getThoroughfare() ||
          !firstGeoObject.getPremiseNumber()
        ) {
          setBaseMarkerColor("#ff3333");
          setAddress("");
        } else {
          const newAddress = [
            firstGeoObject.getThoroughfare(),
            firstGeoObject.getPremiseNumber(),
          ].join(", ");
          setBaseMarkerColor("#e5be01");
          setAddress(newAddress);
        }
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
            iconColor: baseMarkerColor,
          }}
        />
        {crewsInfo.length
          ? crewsInfo.map((crew) => (
              <Placemark
                key={crew.crew_id}
                geometry={crew.coords}
                options={{
                  preset: "slands#circleDotIcon",
                  iconColor: "#00a550",
                }}
              />
            ))
          : null}
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
