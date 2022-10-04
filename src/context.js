import { useState, createContext, useContext } from "react";

const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [elRefs, setElRefs] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    return <AppContext.Provider
        value={{
            type,
            rating,
            coordinates,
            bounds,
            childClicked,
            elRefs,
            filteredPlaces,
            setFilteredPlaces,
            setElRefs,
            setChildClicked,
            setBounds,
            setCoordinates,
            setType,
            setRating
        }}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }