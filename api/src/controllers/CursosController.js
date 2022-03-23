const pool = require('../database/db/configDatabase');

const getCursos = async (req, res) => {
    try {

        const cursos = await pool.query('SELECT * FROM cursos');

        res.json(cursos.rows)
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener todos los cursos",
            data: {},
            accion: 'obtener cursos',
            error: error
        })
    }
}

const getCurso = async (req, res) => {
    try {

        const id = req.params.id;

        const cursos = await pool.query('SELECT * FROM cursos WHERE id_cursos = $1', [
            id
        ]);

        res.json(cursos.rows)
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener el curso",
            data: {},
            accion: 'obtener curso',
            error: error
        })
    }
}

const getDocenteCursos = async (req, res) => {
    try {

        const id = req.params.id;

        const cursos = await pool.query('SELECT * FROM cursos WHERE id_usuarios = $1', [
            id
        ]);

        res.json(cursos.rows)
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener el curso del docente",
            data: {},
            accion: 'obtener curso',
            error: error
        })
    }
}

const crearCurso = async (req, res) => {
    try {

        const {codigo_curso, id_docente, nombre, creditos, descripcion} = req.body;

        await pool.query('INSERT INTO cursos (codigo_curso, id_usuarios, nombre_c, creditos, descripcion) VALUES ($1, $2, $3, $4, $5)', [
            codigo_curso, 
            id_docente, 
            nombre, 
            creditos, 
            descripcion
        ])

        res.json({
            message: 'El curso fue agregado con exito',
            data: [{
                codigo_curso, 
                id_docente, 
                nombre, 
                creditos, 
                descripcion
            }]
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de crear el curso",
            data: {},
            accion: 'crear curso',
            error: error
        })
    }
}

const actualizarcursosAdmin = async (req, res) => {
    try {

        const id = req.params.id;
        const {codigo_curso,id_docente,nombre,creditos,descripcion} = req.body;

        await pool.query('UPDATE cursos SET codigo_curso = $1, id_usuarios = $2 nombre_c = $3, creditos = $4, descripcion = $5 WHERE id_cursos = $6', [
            codigo_curso,
            id_docente,
            nombre,
            creditos,
            descripcion,
            id
        ])
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de actualizar el curso",
            data: {},
            accion: 'Actualizar curso',
            error: error
        })
    }
}

const actualizarCurso = async (req, res) => {
    try {
        
        const {id} = req.params;
        const {nombre, creditos, descripcion} = req.body;

        await pool.query('UPDATE cursos SET nombre_c = $1, creditos = $2, descripcion = $3 WHERE id_cursos = $4', [
            nombre, 
            creditos, 
            descripcion,
            id
        ])

        res.json({
            message: 'El curso fue agregado con exito',
            data: [{
                id, 
                nombre, 
                creditos, 
                descripcion
            }]
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de actualizar el curso",
            data: {},
            accion: 'Actualizar curso',
            error: error
        })
    }
}

const eliminarCurso = async (req, res) => {
    try {

        const {id} = req.params;

        await pool.query('DELETE FROM cursos WHERE id_cursos = $1', [
            id
        ])

        res.json({
            message: "el cursos fue eliminado",
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de eliminar el curso",
            data: {},
            accion: 'Eliminar curso',
            error: error
        })
    }
}

module.exports = {
    getCursos,
    getCurso,
    getDocenteCursos,
    crearCurso,
    actualizarCurso,
    actualizarcursosAdmin,
    eliminarCurso
}