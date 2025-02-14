// // import {
// //   CircleMarker,
// //   MapContainer,
// //   Marker,
// //   Popup,
// //   TileLayer,
// // } from 'react-leaflet';
// // import useGeoLocation from '../../hooks/useGeolocation';
// // import { MapPinIcon } from '@heroicons/react/24/solid';
// // import { useEffect, useState } from 'react';
// // export default function Map() {
// //   const [markerPosition, setMarkerPosition] = useState([35.738343, 51.31382]);
// //   const [circleCenter, setCircleCenter] = useState([35.738343, 51.31382]);
// //   const [userPosition, setUserPosition] = useState([]);
// //   const { getPosition, position } = useGeoLocation();

// //   useEffect(() => {
// //     position.lat &&
// //       position.lng &&
// //       setUserPosition([position.lat, position.lng]);
// //   }, [position]);
// //   const circleRadius = 200;
// //   // Calculate the distance between two latlng points in meters
// //   const calculateDistance = (latlng1, latlng2) => {
// //     const R = 6371e3; // Earth radius in meters
// //     const lat1 = (latlng1[0] * Math.PI) / 180;
// //     const lat2 = (latlng2[0] * Math.PI) / 180;
// //     const deltaLat = ((latlng2[0] - latlng1[0]) * Math.PI) / 180;
// //     const deltaLng = ((latlng2[1] - latlng1[1]) * Math.PI) / 180;

// //     const a =
// //       Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
// //       Math.cos(lat1) *
// //         Math.cos(lat2) *
// //         Math.sin(deltaLng / 2) *
// //         Math.sin(deltaLng / 2);

// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// //     const distance = R * c;
// //     return distance;
// //   };

// //   // Check if the marker is within the circle
// //   const isMarkerWithinCircle =
// //     calculateDistance(userPosition && userPosition, markerPosition) <=
// //     circleRadius;
// //   console.log(isMarkerWithinCircle);
// //   return (
// //     <div className='w-full h-[500px] relative'>
// //       <button
// //         onClick={getPosition}
// //         className='bottom-3 left-3 w-12 rounded-full flex items-center justify-center absolute h-12 bg-white z-100 border-gray-200'>
// //         <MapPinIcon className='w-8 h-8 text-blue-700' />
// //       </button>
// //       <MapContainer
// //         center={markerPosition}
// //         zoom={15}
// //         scrollWheelZoom={false}
// //         className='w-full h-full absolute top-0 z-10'>
// //         <TileLayer
// //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// //         />

// //         <CircleMarker
// //           center={circleCenter}
// //           radius={circleRadius}
// //           pathOptions={{ color: 'red' }}
// //         />

// //         {userPosition && userPosition[0] && (
// //           <Marker position={userPosition}>
// //             <Popup>
// //               A pretty CSS3 popup. <br /> Easily customizable.
// //             </Popup>
// //           </Marker>
// //         )}

// //         <Marker position={circleCenter}>
// //           <Popup>
// //             A pretty CSS3 popup. <br /> Easily customizable.
// //           </Popup>
// //         </Marker>
// //       </MapContainer>
// //     </div>
// //   );
// // }

import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import useGeoLocation from '../../hooks/useGeolocation';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const center = [35.70101296177307, 51.31946272698875];

function DraggableMarker({ userPosition, handler }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(userPosition);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  useEffect(() => {
    handler([position.lat, position.lng]);
  }, [position]);
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
}

export default function Map() {
  const [userPosition, setUserPosition] = useState([]);
  const { getPosition, position } = useGeoLocation();
  const circleRadius = 200;

  useEffect(() => {
    if (position.lat && position.lng) {
      return setUserPosition([position.lat, position.lng]);
    }
  }, [position]);

  const isPointInCircle = (position) => {
    if (position[0]) {
      console.log('User positions :', position);
      console.log('Center positions :', center);
      const xa = position[0] * 100000;
      const ya = position[1] * 100000;
      const x0 = center[0] * 100000;
      const y0 = center[1] * 100000;
      const x = (x0.toFixed(3) - xa.toFixed(3)) ** 2;
      const y = (y0.toFixed(3) - ya.toFixed(3)) ** 2;
      const sum = x + y;
      const r2 = (circleRadius / 1000) ** 2;
      const z = sum - r2;
      console.log(z);
    }

    // console.log(x);
    // console.log(y);
    // console.log(sum);

    // const earthRadius = 6371; // Earth's radius in kilometers
    // const userLat = userPosition[0];
    // const userLng = userPosition[1];
    // const circleLat = center[0];
    // const circleLng = center[1];

    // // Convert latitude and longitude from degrees to radians
    // const lat1 = (userLat * Math.PI) / 180;
    // const lon1 = (userLng * Math.PI) / 180;
    // const lat2 = (circleLat * Math.PI) / 180;
    // const lon2 = (circleLng * Math.PI) / 180;

    // // Haversine formula
    // const dLat = lat2 - lat1;
    // const dLon = lon2 - lon1;
    // const a =
    //   Math.sin(dLat / 2) ** 2 +
    //   Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // const distance = earthRadius * c;

    // // Check if the distance is less than or equal to the circle's radius
    // const isWithinCircle = distance <= circleRadius;
    // console.log(isWithinCircle)

    // console.log()
    // const circleArea = circleRadius * circleRadius * Math.PI;
    // console.log(centerAndMarkerDistance * 100 * circleRadius);
    // console.log('circle Area ===>', circleArea / 1000);
    // if(position[0] > center[0] && position[1] > center[1]){
    //   console.log(centerAndMarkerDistance * 100000);
    //   console.log(((center[0] + center[1]) / 2 * circleRadius / 10) + (circleArea /4000))
    //   console.log(circleArea /4)
    //   // return centerAndMarkerDistance * 100 * circleRadius >= circleArea;
    // } else if(position[0] > center[0] && position[1] < center[1]) {
    //   return centerAndMarkerDistance * 100 * circleRadius >= circleArea;
    // }
  };

  return (
    <div className='w-full h-[500px] relative'>
      <button
        onClick={getPosition}
        className='bottom-3 left-3 w-12 rounded-full flex items-center justify-center absolute h-12 bg-white z-100 border-gray-200'>
        <MapPinIcon className='w-8 h-8 text-blue-700' />
      </button>
      <MapContainer
        center={center}
        zoom={15}
        doubleClickZoom={false}
        closePopupOnClick={false}
        zoomSnap={false}
        zoomDelta={false}
        trackResize={false}
        touchZoom={false}
        scrollWheelZoom={false}
        className='w-full h-full absolute top-0 z-10'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <CircleMarker
          center={center}
          radius={circleRadius}
          pathOptions={{ color: 'red' }}
        />

        {userPosition && userPosition[0] && (
          <DraggableMarker
            userPosition={userPosition}
            handler={isPointInCircle}
          />
        )}

        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
