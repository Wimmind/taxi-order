import React, { useState, useEffect, memo, useMemo } from "react";
import { YMaps, Map, Placemark, withYMaps } from "react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";

import { AddressState } from "../reducer";
import { setNewAddressAction } from "../actions";

const apikey = "b1f85c76-415e-4cb6-8170-21e2e3fd619b";

type PositionedMapProps = {
  ymaps?: any;
};

const YandexMap: React.FC = () => {
  const PositionedMap: React.FC<PositionedMapProps> = memo(({ ymaps }) => {
    const [coords, setCoords] = useState([56.8498, 53.2045]);

    const address = useSelector<AddressState, AddressState["address"]>(
      (state) => state.address
    );

    const dispatch = useDispatch();

    const setNewAddress = (address: string) => {
      dispatch(setNewAddressAction(address));
    };

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

        setNewAddress(newAddres);
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
