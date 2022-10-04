import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "../../redux/slices/places";
import { useGlobalContext } from "../../context";
import Header from '../Header';
import List from '../List';
import Map from '../Map';

const App = () => {
  const dispatch = useDispatch();
  const { places } = useSelector(state => state.places)
  const { rating, setFilteredPlaces, type, bounds, setCoordinates } = useGlobalContext();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({
        lat: latitude,
        lng: longitude
      })
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      dispatch(getPlacesData({ bounds, type }))
      setFilteredPlaces([])
    }
  }, [type, bounds])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
