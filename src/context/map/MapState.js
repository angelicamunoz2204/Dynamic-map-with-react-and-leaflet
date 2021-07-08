import react, {useReducer} from 'react';
import MapReducer from './UserReducer';
import MapContext from './UserContext';
import axios from 'axios';
import { GET_MARKER, GET_MARKERS } from '../types';

const MapState = (props) => {
    const initialState = {
        markers: [],
        selectedMarker: null
    }

    const [state, dispatch] = useReducer(MapReducer, initialState)

    const getMarkers = async() => {
        const res = await axios.get('http://localhost:3001/usuario');
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
        //console.log(res.data)
    }
    
    const getMarker = async(id) => {
        const res = await axios.get('http://localhost:3001/usuario/' + id);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        //console.log(res.data)
    }
    
    return (
        <MapContext.Provider value = {{
            markers: state.markers,
            selectedMarker: state.selectedMarker,
            getMarkers,
            getMarker
        }}>
            {props.children}
        </MapContext.Provider>
    )

}

export default MapState;