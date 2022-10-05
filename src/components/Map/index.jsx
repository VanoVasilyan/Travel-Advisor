import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { useGlobalContext } from '../../context';

import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = () => {
  const { places } = useSelector(state => state.places)
  const { filteredPlaces, coordinates, setBounds, setCoordinates, setChildClicked } = useGlobalContext();
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {
          filteredPlaces?.length ?
            filteredPlaces?.map((place, i) => {
              return <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
              >
                {
                  !isDesktop ? (
                    <LocationOnOutlined color='primary' fontSize='large' />
                  ) : (
                    <Paper elevation={3} className={classes.paper}>
                      <Typography className={classes.paper} variant="subtitle2" gutterBottom> {place.name}</Typography>
                      <img
                        className={classes.pointer}
                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                      />
                      <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                    </Paper>
                  )
                }
              </div>
            }
            )
            :
            (
              places?.length && places?.map((place, i) => {
                return <div
                  className={classes.markerContainer}
                  lat={Number(place.latitude)}
                  lng={Number(place.longitude)}
                  key={i}
                >
                  {
                    !isDesktop ? (
                      <LocationOnOutlined color='primary' fontSize='large' />
                    ) : (
                      <Paper elevation={3} className={classes.paper}>
                        <Typography className={classes.paper} variant="subtitle2" gutterBottom> {place.name}</Typography>
                        <img
                          className={classes.pointer}
                          src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                        />
                        <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                      </Paper>
                    )
                  }
                </div>
              }
              )
            )
        }
      </GoogleMapReact>
    </div >
  )
}

export default Map