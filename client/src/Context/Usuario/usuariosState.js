import React, {useReducer} from 'react'
import axios from 'axios'

import UsuariosContext from './usuariosContext'
import usuariosReducer from './usuariosReducer'

const UsuariosState = (props) => {
    const inicialState = {
        datosUsuario: null,
        estudiantes: null,
        docentes: null,
        administradores: null
    }

    const [state, dispatch] = useReducer(usuariosReducer, inicialState)

    const saveAutenticarUsuario = async (datos) => {
        try{
            
            dispatch({
                type: 'AUTENTICAR_USUARIO',
                payload: datos
            })

        }catch(e){
            console.log(e)
        }
    }

    const verificarInicioSecion = () => {
        const elem = window.localStorage.getItem('usuatioAttendance')
        const dato = elem ? JSON.parse(elem) : null

        if( dato != null ){
            saveAutenticarUsuario(dato);           
        }
        else {
            state.usuarioAutenticado = false;
        }

    }

    const cerrarSecion = () => {
        try {
            window.localStorage.removeItem('usuatioAttendance');
        } catch (error) {
            console.log(error)
        }
        state.datosUsuario = [];
    }

    const crearUsuario = async (datos) => {
        try{
            
            const res = await axios.post('', datos);
            dispatch({
                type: 'CREAR_USUARIO',
                payload: res.data.usuario
            })

        }catch(e){
            console.log(e)
        }
    }

    return (
        <UsuariosContext.Provider value={{
            datosUsuario: state.datosUsuario,
            verificarInicioSecion,
            cerrarSecion,
            saveAutenticarUsuario,
            crearUsuario
        }}>
            {props.children}
        </UsuariosContext.Provider>
    )
}

export default UsuariosState