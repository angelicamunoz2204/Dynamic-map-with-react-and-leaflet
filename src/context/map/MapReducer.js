import { GET_MARKERS} from "../types";

export default (state, action) => {
    const {payload, type} = action;

    switch(type) {
        case GET_MARKERS:
            return {
                ...state,
                markers: payload
            }
        /*case GET_MARKER:
            return {
                ...state,
                selectedMarker: payload
            }*/
        default: 
            return  state;
    }
}