import react, {useReducer} from 'react';
import MapReducer from './MapReducer';
import MapContext from './MapContext';
import { GET_MARKERS } from '../types';

const MapState = (props) => {
    const initialState = {
        markers: []
       // selectedMarker: null
    }

    const [state, dispatch] = useReducer(MapReducer, initialState)

    const getMarkers = () => {
        const res = state.markers;
        dispatch({
            type: GET_MARKERS,
            payload: res.data
        })
        //console.log(res.data)
    }
    
    /*const getMarker = async(id) => {
        const res = await axios.get('http://localhost:3001/usuario/' + id);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        //console.log(res.data)
    }*/
    
    return (
        <MapContext.Provider value = {{
            markers: state.markers,
            //selectedMarker: state.selectedMarker,
            getMarkers,
            //getMarker
        }}>
            {props.children}
        </MapContext.Provider>
    )

}

export default MapState;