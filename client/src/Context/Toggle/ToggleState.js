import React, {useReducer} from 'react'

import ToggleContext from './ToggleContext';
import ToggleReducer from './ToggleReducer';

const ToggleState = (props) => {
    const inicialState = {
        activeToggle: false,
        activeCurso: false
    }

    const [state, dispatch] = useReducer(ToggleReducer, inicialState)

    const onOffToggle = () => {
        dispatch({
            type: 'ACTIVE_TOGGLE',
            payload: !state.activeToggle
        })
    }

    const ingresarAlCurso = ( ingresar ) => {
        dispatch({
            type: 'IR_CURSO',
            payload: ingresar
        })
    }

    return (
        <ToggleContext.Provider value={{
            activeToggle: state.activeToggle,
            activeCurso: state.activeCurso,
            ingresarAlCurso,
            onOffToggle,
        }}>
            {props.children}
        </ToggleContext.Provider>
    )
}


export default ToggleState;