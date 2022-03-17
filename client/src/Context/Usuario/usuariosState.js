import React, {useReducer} from 'react'
import axios from 'axios'

import UsuariosContext from './usuariosContext'
import usuariosReducer from './usuariosReducer'

const UsuariosState = (props) => {
    const inicialState = {
        userCargando: true,
        usuarioAutenticado: false,
        datosUsuario: [{
            identificacion: 10224563,
            nombre: 'User Test',
            email: 'test@testing.com',
            rol: 'Personal',
            descripcion: 'Es un docente'
        }],
        usuariosList: []
    }

    const [state, dispatch] = useReducer(usuariosReducer, inicialState)

    const obtenerUsuario = async (id) => {
        try{

            const res = await axios.get(''+id);
            //console.log(res.data)
            dispatch({
                type: 'OBTENER_USUARIO',
                payload: res.data
            })

        }catch(e){
            console.log(e)
        }
    }

    const autenticarUsuario = async (datos) => {
        try{
            
            const res = await axios.post('', datos );
            dispatch({
                type: 'AUTENTICAR_USUARIO',
                payload: res.data
            })

        }catch(e){
            console.log(e)
        }
        finally{
            dispatch({
                type: 'CARGAR_USUARIO',
                payload: false
            })
        }
    }

    const verificarInicioSecion = () => {
        const elem = window.localStorage.getItem('usuario')
        const dato = elem ? JSON.parse(elem) : null

        console.log(dato)

        if( dato != null ){
            autenticarUsuario(dato)
        }
        else {
            state.usuarioAutenticado = false;
        }

    }

    const cerrarSecion = () => {
        try {
            window.localStorage.removeItem('usuario');
        } catch (error) {
            console.log(error)
        }
        state.userCargando = true;
        state.datosUsuario = [];
        state.usuarioAutenticado = false;
        state.usuariosList = [];
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
            userCargando: state.userCargando,
            usuarioAutenticado: state.usuarioAutenticado,
            usuariosList: state.usuariosList,
            datosUsuario: state.datosUsuario,
            verificarInicioSecion,
            cerrarSecion,
            obtenerUsuario,
            autenticarUsuario,
            crearUsuario
        }}>
            {props.children}
        </UsuariosContext.Provider>
    )
}

export default UsuariosState