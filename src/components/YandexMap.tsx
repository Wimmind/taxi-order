import React, { useState, useEffect, memo, useMemo } from "react";
import { YMaps, Map, Placemark, withYMaps } from "react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";

import { AddressState } from "../addressReducer";
import { setNewAddressAction, toggleValidityAddress, setInvalidAddressMessage } from "../addressActions";

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
    const setAddressFieldState = (value: boolean) => {
      dispatch(toggleValidityAddress(value));
    };
    const setInvalidMessage = (message: string) => {
      dispatch(setInvalidAddressMessage(message));
    };

    useEffect(() => {
      ymaps.geocode(`Ижевск, ${address}`).then((result: any) => {
        const obj = result.geoObjects.get(0);
        let error;
        let message = '';
    
        if (obj) {
          switch (obj.properties.get("metaDataProperty.GeocoderMetaData.precision")) {
            case "exact":
              break;
            case "number":
            case "near":
            case "range":
              error = true;
              message = 'Уточните номер дома';
              break;
            case "street":
              error = true;
              message = 'Уточните номер дома';
              break;
            case "other":
            default:
              message = 'Адрес не найден';
              error = true;
          }
        } else {
          error = true;
        }

        if (error) {
          setAddressFieldState(false);
          setInvalidMessage(message);
        } else {
          const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
          setCoords(newCoords);
          setAddressFieldState(true);
        }
      });
    }, [address]);

    const getCoordsOnclick = (event: any) => {
      const currentCoords = event.get("coords");
      setCoords(currentCoords);
      ymaps.geocode(currentCoords).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0);

        if (!firstGeoObject.getThoroughfare() || !firstGeoObject.getPremiseNumber()) {
          console.log('говно')
        } else {
          const newAddres = [
            firstGeoObject.getThoroughfare(),
            firstGeoObject.getPremiseNumber(),
          ].join(", ");
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
