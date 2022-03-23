import axios from 'axios';

const urlServe = 'https://attendance-management-back.herokuapp.com';

const autenticarUsuario = async (datos) => {
    try {
        
        const res = await axios.post(urlServe+'/users/', datos)
        const dato = res;
        return dato.data;
    } catch (error) {
        console.log(error)
    }
} 

const ingresarPersonal = async (datos) => {
    try {
        const res = await axios.post(urlServe+'/personal/', datos)
        const dato = res;
        return dato.data;
    } catch (error) {
        console.log(error)
    }
}

const ingresarEstudiante = async (datos) => {
    try {
        const res = await axios.post(urlServe+'/students/', datos)
        const dato = res;
        return dato.data;
    } catch (error) {
        console.log(error)
    }
}

const obtenerUsuarios = async () => {
    try {
        const res = await axios.get(urlServe+'/all-users/')
        const dato = res;
        return dato.data;
    } catch (error) {
        console.log(error)
    }
}

const obtenerUsuario = async (id) => {
    try {
        const res = await axios.get(urlServe+'/users/'+id)
        const dato = res;
        return dato.data;
    } catch (error) {
        console.log(error)
    }
}

const actualizarUsuario = async (id, datos) => {
    try {
        const res = await axios.put(urlServe+'/users/'+id, datos)
        const dato = res;
        return dato.data;
    } catch (error) {
        console.log(error)
    }
}

const obtenerAsistenciaEstudiantes = async (id) => {
    try {
        const res = await axios.get(urlServe+'/asistencia-estudiante/'+id);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const obtenerAsistenciaCurso = async (id) => {
    try {
        const res = await axios.get(urlServe+'/asistencia-curso/'+id);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export {
    autenticarUsuario,
    ingresarPersonal,
    ingresarEstudiante,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    obtenerAsistenciaEstudiantes,
    obtenerAsistenciaCurso
}