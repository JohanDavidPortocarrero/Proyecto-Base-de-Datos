/* eslint-disable import/no-anonymous-default-export */
import {
    OBTENER_USUARIO,
    AUTENTICAR_USUARIO,
    ACTUALIZAR_USUARIO,
    ELIMINAR_USUARIO,
    CREAR_USUARIO,
    CARGAR_USUARIO
} from '../type';

export default (state, action) => {
    const {payload, type} = action

    switch(type){
        case OBTENER_USUARIO:
            return {
                ...state,
                usuariosList: payload
            }
        case AUTENTICAR_USUARIO:
            return {
                ...state,
                datosUsuario: payload,
            }
        case ACTUALIZAR_USUARIO:
            return {
                ...state,
            }
        case ELIMINAR_USUARIO:
            return {
                ...state,
            }
        case CREAR_USUARIO:
            return {
                ...state,
                datosUsuario: payload,
            }
        case CARGAR_USUARIO:
            return {
                ...state,
            }
        default:
            return state;
    }

}