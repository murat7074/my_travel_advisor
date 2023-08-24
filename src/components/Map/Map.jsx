import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery,Box } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'
import {mapStyles} from "./mapStyles"
const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:600px)')

// console.log("weatherData",weatherData.coord.lon);


  return (
    <Box className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI:true,zoomControl:true,styles:mapStyles}}
        onChange={(e) => {
         /*  console.log('event', e) */
          /* haritaya çift tıklayınca center ve sağüst ve solalt kenar koordinatlarını gönderiyoruz  */
          setCoordinates({ lat: e.center.lat, lng: e.center.lng }) // merkez
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw }) // sağ üst ve sol alt kenar
        }}
        onChildClick={(child) => setChildClicked(child)}
        /* resimlerin üzerine tıklandığında hangi resime tıkladığımız bilgisini vericek */
      >
        {places?.map((place, i) => (
          <Box
            className={classes.markerContainer}
            /*   lat={Number(place.latitude)}
          lng={Number(place.longitude)} */
            lat={place.latitude}
            lng={place.longitude}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color='primary' fontSize='large' />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant='subtitle2'
                  gutterBottom
                >
         
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  }
                />
                <Rating
                  name='read-only'
                  size='small'
                  value={place.rating}
                  readOnly
                />
              </Paper>
            )}
          </Box>
        ))}

         {weatherData?.weather?.length && weatherData.weather.map((data, i) => (
          <Box key={i} lat={weatherData.coord.lat} lng={weatherData.coord.lon} >
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} height="70px" />
          </Box>
        ))}
                   
      </GoogleMapReact>
    </Box>
  )
}

export default Map
