const { json } = require('express');
const pool = require('../database/db/configDatabase');

const getInscripciones = async (req, res) => {
    try {

        const inscripciones = await pool.query('SELECT * FROM inscripcion');

        res.json(inscripciones.rows)
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener todos las inscripciones",
            data: {},
            accion: 'obtener inscripciones',
            error: error
        })
    }
}

const getInscripcionStudent = async (req, res) => {
    try {

        const {id} = req.params;

        const cursos = await pool.query('SELECT * FROM cursos');
        const inscripciones = await pool.query('SELECT * FROM inscripcion WHERE id_estudiante = $1', [id]);
        const personalConsult = await pool.query('SELECT * FROM usuarios WHERE rol = $1', [
            'personal'
        ]);

        const jsonFile = []

        inscripciones.rows.map( insc => {
            const dato = {
                id_inscripcion: insc.id_inscripcion,
                id_studiante: insc.id_estudiante,
                cursos: [],
            }

            cursos.rows.map(curso => {
                personalConsult.rows.map( pers => {
                    if( insc.id_cursos === curso.id_cursos && curso.id_usuarios === pers.id_usuarios ){
                        const _curso = {
                            id_curso: curso.id_cursos,
                            codigo_curso: curso.codigo_curso,
                            nombre_curso: curso.nombre_c,
                            creditos: curso.creditos,
                            descripcion: curso.descripcion,
                            docente:{
                                id_docente: curso.id_usuarios,
                                nombre: pers.nombre,
                                email: pers.email,
                                descripcion: pers.descripcion
                            }
                        }
                        dato.cursos.push(_curso)
                    }
                    
                } )
            })

            jsonFile.push(dato)

        } )

        res.json(jsonFile)
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener todos las inscripciones de los estudiantes",
            data: {},
            accion: 'obtener inscripciones',
            error: error
        })
    }
}

const getCursosStudentInscripto = async (req, res) => {
    try {

        const {id} = req.params;

        const cursos = await pool.query('SELECT * FROM cursos');
        const inscripciones = await pool.query('SELECT * FROM inscripcion WHERE id_estudiante = $1', [id]);
        const personalConsult = await pool.query('SELECT * FROM usuarios WHERE rol = $1', [
            'personal'
        ]);

        const jsonFile = []

        inscripciones.rows.map( insc => {
            cursos.rows.map(curso => {
                personalConsult.rows.map( pers => {
                    if( insc.id_cursos === curso.id_cursos && curso.id_usuarios === pers.id_usuarios ){
                        const _curso = {
                            id_cursos: curso.id_cursos,
                            codigo_curso: curso.codigo_curso,
                            nombre_c: curso.nombre_c,
                            creditos: curso.creditos,
                            descripcion: curso.descripcion,
                            docente:{
                                id_docente: curso.id_usuarios,
                                nombre: pers.nombre,
                                email: pers.email,
                                descripcion: pers.descripcion
                            }
                        }
                        jsonFile.push(_curso)
                    }
                } )
            })
        } )

        res.json(jsonFile)
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener todos las inscripciones de los estudiantes",
            data: {},
            accion: 'obtener inscripciones',
            error: error
        })
    }
}

const getInscripcionCurso = async (req, res) => {
    try {

        const {id} = req.params;

        const cursos = await pool.query('SELECT * FROM cursos WHERE id_cursos = $1', [id]);
        const inscripciones = await pool.query('SELECT * FROM inscripcion WHERE id_cursos = $1', [id]);
        const personalConsult = await pool.query('SELECT * FROM usuarios WHERE rol = $1', [
            'personal'
        ]);
        const studentConsult = await pool.query('SELECT * FROM usuarios WHERE rol = $1', [
            'estudiante'
        ]);
        const estudiantes = await pool.query('SELECT * FROM estudiantes')

        const jsonFile = []

        const dato = {
            id_inscripcion: inscripciones.rows.id_inscripcion,
            id_curso: inscripciones.rows.id_cursos,
            docente: {},
            estudiantes: [],
        }

        inscripciones.rows.map( insc => {
            
            cursos.rows.map(curso => {
                personalConsult.rows.map( pers => {
                    if( insc.id_cursos === curso.id_cursos && curso.id_usuarios === pers.id_usuarios ){
                        const _docente = {
                            id_docente: curso.id_usuarios,
                            nombre: pers.nombre,
                            email: pers.email,
                            descripcion: pers.descripcion
                        }
                        dato.docente = _docente
                    }
                    
                } )
            })

            studentConsult.rows.map( user => {
                estudiantes.rows.map( student => {
                    if( user.id_usuarios === student.id_usuarios && student.id_usuarios === insc.id_estudiante ){
                        const _student = {
                            identificacion: user.id_usuarios,
                            codigo_estudiante: student.codigo_estudiante,
                            nombre: user.nombre,
                            rol: user.rol,
                            email: user.email,
                            descripcion: user.descripcion
                        }
                        dato.estudiantes.push(_student)
                    }
                } )
            } )

            

        } )
        
        jsonFile.push(dato)

        res.json(jsonFile)
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener todos las inscripciones de los estudiantes",
            data: {},
            accion: 'obtener inscripciones',
            error: error
        })
    }
}

const incribirEstudiante = async (req, res) => {
    try {

        const {curso, docente, estudiante} = req.body;

        await pool.query('INSERT INTO inscripcion (id_cursos, id_personal, id_estudiante) VALUES ($1, $2, $3)', [
            curso, docente, estudiante
        ])

        res.json({
            message: 'El estudiante fue inscrito al curso',
            dato:{
                curso, 
                docente, 
                estudiante
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de inscribir al estudiante",
            data: {},
            accion: 'Inscribir estudiante',
            error: error
        })
    }
}

const actualizarInscripcion = async (req, res) => {
    try {

        const {id} = req.params;
        const {curso, docente, estudiante} = req.body
        await pool.query('UPDATE inscripcion SET id_cursos = $1, id_personal = $2, id_estudiante = $3 WHERE id_inscripcion = $4', [
            curso, docente, estudiante, id
        ]);

        res.json({
            message: 'La inscripcion fue actualizada',
            dato:{
                id,
                curso, 
                docente, 
                estudiante
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de actualizar la inscripcion",
            data: {},
            accion: 'actualizar inscripcion',
            error: error
        })
    }
}

const deleteIncripcion = async (req, res) => {
    try {
        
        const {id} = req.params;

        await pool.query('DELETE FROM inscripcion WHERE id_inscripcion = $1', [id])

        res.json({
            message: 'La inscripcion fue eliminada'
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de eloiminar la inscripcion",
            data: {},
            accion: 'eliminar inscripcion',
            error: error
        })
    }
}

module.exports = {
    getInscripciones,
    getInscripcionStudent,
    getCursosStudentInscripto,
    incribirEstudiante,
    actualizarInscripcion,
    deleteIncripcion,
    getInscripcionCurso
}