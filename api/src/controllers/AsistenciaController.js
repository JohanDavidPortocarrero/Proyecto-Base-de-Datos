const pool = require('../database/db/configDatabase');

const getAsistencia = async (req, res) => {
    try {

        const asistencia = await pool.query('SELECT * FROM asistencia');

        res.json(asistencia.rows)
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener todas las asistencias",
            data: {},
            accion: 'obtener asistencias',
            error: error
        })
    }
}

const getStudentsAsistencia = async (req, res) => {
    try {

        const {id} = req.params;

        const asistencia = await pool.query('SELECT * FROM asistencia WHERE id_estudiante = $1', [id]);
        const cursos = await pool.query('SELECT * FROM cursos');
        const prueba = await pool.query('SELECT * FROM pruebas');

        const jsonFile = []

        asistencia.rows.map(asist => {
            const dato = {
                id_asistencia: asist.id_asistencia,
                fecha: asist.fecha,
                curso:{},
                prueba: {}
            }

            cursos.rows.map( curso => {
                prueba.rows.map( prueb => {
                    if( prueb.id_curso === curso.id_cursos && curso.id_cursos === asist.id_cursos ){
                        dato.curso = {
                            id_curso: curso.id_cursos,
                            codigo_curso: curso.codigo_curso,
                            nombre_curso: curso.nombre_c
                        }
                        dato.prueba = {
                            id_prueba: prueb.id_pruebas,
                            id_docente: prueb.id_usuarios,
                            nombre: prueb.nombre,
                            fecha: prueb.fecha_publicacion,
                            descripcion: prueb.descripcion_estado
                        }
                    }
                } )
            } )

            jsonFile.push(dato)

        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener las asitencias del estudiante",
            data: {},
            accion: 'obtener asistencia estudiante',
            error: error
        })
    }
}

const getCursoAsistencia = async (req, res) => {
    try {

        const {id} = req.params;

        const asistencia = await pool.query('SELECT * FROM asistencia WHERE id_estudiante = $1', [id]);
        const usuarios = await pool.query("SELECT * FROM usuarios WHERE rol = 'estudiante' ");
        const estudiantes = await pool.query('SELECT * FROM estudiantes');
        const prueba = await pool.query('SELECT * FROM pruebas');

        const jsonFile = []

        asistencia.rows.map(asist => {
            const dato = {
                id_asistencia: asist.id_asistencia,
                fecha: asist.fecha,
                estudiante:{},
                prueba: {}
            }

            usuarios.rows.map( users => {
                estudiantes.rows.map( student => {
                    if( users.id_usuarios === student.id_usuarios ){
                        dato.estudiante = {
                            id: student.id_usuarios,
                            codgo_estudiante: student.codgo_estudiante,
                            nombre: users.nombre,
                            email: users.email
                        }
                    }
                } )
            } )

            prueba.rows.map( prueb => {
                if( prueb.id_curso === asist.id_cursos ){
                    dato.prueba = {
                        id_prueba: prueb.id_pruebas,
                        id_docente: prueb.id_usuarios,
                        nombre: prueb.nombre,
                        fecha: prueb.fecha_publicacion,
                        descripcion: prueb.descripcion_estado
                    }
                }
            } )

            jsonFile.push(dato)

        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener las asitencias del curso",
            data: {},
            accion: 'obtener asistencia curso',
            error: error
        })
    }
}

const marcarAsistencia = async (req, res) => {
    try {

        const {estudiante, curso, fecha} = req.body;

        await pool.query('INSERT INTO asistencia (id_estudiantes, id_cursos, fecha) VALUES ($1, $2, $3)', [
            estudiante, curso, fecha
        ])

        res.json({
            message: 'La sistencia fue marcada',
            data: {
                estudiante, curso, fecha
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de marcar la asitencia",
            data: {},
            accion: 'Marcar asistencia',
            error: error
        })
    }
}

const deleteAsistencia = async (req, res) => {
    try {

        const {id} = req.params
        
        await pool.query('DELETE FROM asistencia WHERE id_asistencia = $1', [id])

        res.json({
            message: 'La sistencia fue eliminada',
            data: {
                estudiante, curso, fecha
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de eliminar la asitencia",
            data: {},
            accion: 'Eliminar asistencia',
            error: error
        })
    }
}

module.exports = {
    getAsistencia,
    getStudentsAsistencia,
    getCursoAsistencia,
    marcarAsistencia,
    deleteAsistencia
}