import React, { useState, useEffect, memo, useMemo } from "react";
import { YMaps, Map, Placemark, withYMaps } from "react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";

import { AddressState } from "../addressReducer";
import { setNewAddressAction } from "../actions";

const apikey = "b1f85c76-415e-4cb6-8170-21e2e3fd619b";

type PositionedMapProps = {
  ymaps?: any;
};

const YandexMap: React.FC = () => {
  const PositionedMap: React.FC<PositionedMapProps> = memo(({ ymaps }) => {
    const [coords, setCoords] = useState([56.8498, 53.2045]);
    const [baseMarkerColor, setBaseMarkerColor] = useState("#e5be01");

    const address = useSelector<AddressState, AddressState["address"]>(
      (state) => state.address
    );

    const dispatch = useDispatch();

    const setNewAddress = (address: string) => {
      dispatch(setNewAddressAction(address));
    };

    useEffect(() => {
      ymaps.geocode(`Ижевск, ${address}`).then((result: any) => {
        let obj = result.geoObjects.get(0),
          error;

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
              break;
            case "street":
              error = true;
              break;
            case "other":
            default:
              error = true;
          }
        } else {
          error = true;
        }

        if (error) {
          console.log("gg");
        } else {
          const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
          setCoords(newCoords);
        }
      });
    }, [address]);

    const getCoordsOnclick = (event: any) => {
      const currentCoords = event.get("coords");
      setCoords(currentCoords);
      ymaps.geocode(currentCoords).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0);
        if (
          !firstGeoObject.getThoroughfare().length ||
          !firstGeoObject.getPremiseNumber().length
        ) {
          setBaseMarkerColor("#ff3333");
        } else {
          const newAddres = [
            firstGeoObject.getThoroughfare(),
            firstGeoObject.getPremiseNumber(),
          ].join(", ");
          setBaseMarkerColor("#e5be01");
          setNewAddress(newAddres);
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
