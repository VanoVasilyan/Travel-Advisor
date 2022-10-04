import { useEffect, createRef } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { useGlobalContext } from '../../context';
import PlaceDetails from '../PlaceDetails';
import useStyles from './styles';

const List = () => {
  const { places, status } = useSelector(state => state.places)
  const { type, setType, rating, setRating, childClicked, elRefs, setElRefs, filteredPlaces } = useGlobalContext();
  const classes = useStyles();

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef())
    setElRefs(refs)
  }, [places])

  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restaurants, Hotels & Attractions around you</Typography>
      {
        status === 'loaded' ? (
          <>

            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
              {
                status === 'loaded' ? (
                  filteredPlaces.length ? (
                    filteredPlaces?.map((place, i) => {
                      return <Grid ref={elRefs[i]} item xs={12} key={i}>
                        <PlaceDetails
                          place={place}
                          selected={Number(childClicked) === i}
                          refProp={elRefs[i]}
                        />
                      </Grid>
                    })
                  )
                    :
                    (
                      places?.map((place, i) => {
                        return <Grid ref={elRefs[i]} item xs={12} key={i}>
                          <PlaceDetails
                            place={place}
                            selected={Number(childClicked) === i}
                            refProp={elRefs[i]}
                          />
                        </Grid>
                      })
                    )
                ) :
                  (
                    <div className={classes.loading}>
                      <CircularProgress size='5rem' />
                    </div>
                  )
              }
            </Grid>
          </>
        )
          :
          (
            <div className={classes.loading}>
              <CircularProgress size='5rem' />
            </div>
          )
      }

    </div >
  )
}

export default List