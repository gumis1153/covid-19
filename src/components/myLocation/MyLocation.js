import React from 'react';
import style from './myLocation.module.scss';

export default function () {
  const [currentLocation, setCurrentLocation] = React.useState([]);

  // const getCurrentLocation = () => {
  //   let latitude = 0;
  //   let longitude = 0;
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((pos) => {
  //       latitude = pos.coords.latitude;
  //       longitude = pos.coords.longitude;
  //       console.log(latitude, longitude);
  //     });
  //     const sucesfulGeolocation = () => {
  //       const requestOptions = {
  //         method: 'GET',
  //         redirect: 'follow',
  //       };
  //       fetch(
  //         `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=12fd995e1bbd4c71be8b636eb2ca3e90`,
  //         requestOptions
  //       )
  //         .then((response) => response.json())
  //         .then((result) => console.log(result));
  //     };
  //     sucesfulGeolocation();
  //   } else {
  //     console.log('nie jest wspierane');
  //   }
  // };

  React.useEffect(() => {
    // console.log(location.origin);
    // getCurrentLocation();
  }, []);
  return <div>My Location</div>;
}
