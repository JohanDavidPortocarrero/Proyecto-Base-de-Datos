/* eslint-disable import/no-anonymous-default-export */
import {
    ACTIVE_TOGGLE,
    IR_CURSO
} from '../type';

export default (state, action) => {
    const {payload, type} = action

    switch(type){
        case ACTIVE_TOGGLE:
            return {
                ...state,
                activeToggle: payload
            }
        case IR_CURSO:
            return {
                ...state,
                activeCurso: payload
            }
        default:
            return state;
    }

}