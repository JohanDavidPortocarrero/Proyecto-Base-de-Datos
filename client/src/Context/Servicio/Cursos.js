import axios from 'axios';

const urlServe = 'https://attendance-management-back.herokuapp.com';

const obtenerCursos = async () => {
    try {
        const res = await axios.get(urlServe+'/all-cursos/');
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const agregarCurso = async (datos) => {
    try {
        const res = await axios.post(urlServe+'/cursos/', datos);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const obtenerCursosDocente = async (id) => {
    try {
        const res = await axios.get(urlServe+'/docentecursos/'+id);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const obtenerinscripcionCursos = async (id) => {
    try {
        const res = await axios.get(urlServe+'/inscripcionstudent/'+id);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const inscribirEstudianteCurso = async (datos) => {
    try {
        const res = await axios.post(urlServe+'/inscripcion/', datos);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const cursosInscriptoStudent =  async (id) => {
    try {
        const res = await axios.get(urlServe+'/cursosinscriptostudent/'+id);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const obtenerinscritosCurso = async (id) => {
    try {
        const res = await axios.get(urlServe+'/inscripcioncurso/'+id);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const obtenerCurso = async (id) => {
    try {
        const res = await axios.get(urlServe+'/cursos/'+id);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const obtenerPrueba = async (id) => {
    try {
        const res = await axios.get(urlServe+'/prueba/'+id);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const obtenerPruebasCurso = async (id) => {
    try {
        const res = await axios.get(urlServe+'/prueba-curso/'+id);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const crearPrueba = async (datos) => {
    try {
        const res = await axios.post(urlServe+'/prueba/', datos);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const insertarPretgunta = async (datos) => {
    try {
        const res = await axios.post(urlServe+'/pregunta/', datos);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const insertarOpciones = async (datos) => {
    try {
        const res = await axios.post(urlServe+'/opcion/', datos);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const actualizarPrueba = async (datos) => {
    try {
        const res = await axios.put(urlServe+'/prueba/', datos);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export {
    obtenerCursos,
    obtenerinscripcionCursos,
    obtenerCursosDocente,
    obtenerCurso,
    obtenerPrueba,
    obtenerPruebasCurso,
    obtenerinscritosCurso,
    cursosInscriptoStudent,
    agregarCurso,
    crearPrueba,
    insertarPretgunta,
    insertarOpciones,
    inscribirEstudianteCurso,
    actualizarPrueba
}