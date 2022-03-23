const pool = require('../database/db/configDatabase');

const getUsers = async (req, res) => {

    try {

        const usuarios = await pool.query('SELECT * FROM usuarios');
        const estudiantes = await pool.query('SELECT * FROM estudiantes');

        const personalData = []
        const studentData = []
        const administradoresData = []

        for( let i = 0; i < usuarios.rows.length; i++ ){
            if( usuarios.rows[i].rol === 'personal' ){
                const dato = {
                    identificacion: usuarios.rows[i].id_usuarios,
                    rol: usuarios.rows[i].rol,
                    nombre: usuarios.rows[i].nombre,
                    email: usuarios.rows[i].email,
                    descripcion: usuarios.rows[i].descripcion
                }
                personalData.push(dato)
            }
            else if( usuarios.rows[i].rol === 'estudiante' ){
                for( let j = 0; j < estudiantes.rows.length; j++ ){
                    if( estudiantes.rows[j].id_usuarios === usuarios.rows[i].id_usuarios ){
                        const dato = {
                            identificacion: usuarios.rows[i].id_usuarios,
                            rol: usuarios.rows[i].rol,
                            codigo_estudiante: estudiantes.rows[j].codigo_estudiante,
                            nombre: usuarios.rows[i].nombre,
                            email: usuarios.rows[i].email,
                            descripcion: usuarios.rows[i].descripcion
                        }
                        studentData.push(dato)
                    }
                }
                
            }
            else if( usuarios.rows[i].rol === 'administrador' ){
                const dato = {
                    identificacion: usuarios.rows[i].id_usuarios,
                    rol: usuarios.rows[i].rol,
                    nombre: usuarios.rows[i].nombre,
                    email: usuarios.rows[i].email,
                    descripcion: usuarios.rows[i].descripcion
                }
                administradoresData.push(dato)
            }
        }

        const json = {
            administradores: administradoresData,
            personal: personalData,
            estudiantes: studentData
        }

        res.json(json);

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener todos los usuarios",
            data: {},
            accion: 'obtener usuarios',
            error: error
        })
    }

}

const getUser = async (req, res) => {
    try {
        
        const {id} = req.params;

        const usuarios = await pool.query('SELECT * FROM usuarios WHERE id_usuarios = $1', [id]);
        const estudiantes = await pool.query('SELECT * FROM estudiantes WHERE id_usuarios = $1', [id]);

        if( usuarios.rows[0].rol === 'estudiante' ){

            const jsonFile = {
                identificacion: usuarios.rows[0].id_usuarios,
                codigo_estudiante: estudiantes.rows[0].codigo_estudiante,
                nombre: usuarios.rows[0].nombre,
                rol: usuarios.rows[0].rol,
                email: usuarios.rows[0].email,
                descripcion: usuarios.rows[0].descripcion
            }

            res.json(jsonFile);
        }
        else{
            const jsonFile = {
                identificacion: usuarios.rows[0].id_usuarios,
                nombre: usuarios.rows[0].nombre,
                rol: usuarios.rows[0].rol,
                email: usuarios.rows[0].email,
                descripcion: usuarios.rows[0].descripcion
            }

            res.json(jsonFile);
        }

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener el usuarios",
            data: {},
            accion: 'obtener usuario',
            error: error
        })
    }
}

const getStudents = async (req, res) => {
    try {

        const usuarios = await pool.query("SELECT * FROM usuarios WHERE rol = 'estudiante' ");
        const estudiantes = await pool.query('SELECT * FROM estudiantes');

        const jsonFile = [] 
        
        usuarios.rows.map( user => {
            estudiantes.rows.map( student => {
                if( user.id_usuarios === student.id_usuarios ){
                    const dato = {
                        identificacion: user.id_usuarios,
                        codigo_estudiante: student.codigo_estudiante,
                        nombre: user.nombre,
                        rol: user.rol,
                        email: user.email,
                        descripcion: user.descripcion
                    }
                    jsonFile.push(dato)
                }
            } )
        } )
        
        res.json(jsonFile);

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener el estudiante",
            data: {},
            accion: 'obtener estudiante',
            error: error
        })
    }
}

const agregarPersonal = async (req, res) => {
    try {

        const {nombre, email, password, rol, descripcion} = req.body

        await pool.query('INSERT INTO usuarios (rol, nombre, email, password_user, descripcion) VALUES ($1, $2, $3, $4, $5)', [
            rol, 
            nombre, 
            email, 
            password, 
            descripcion
        ])

        res.json({
            message: 'El docente o personal fue agregado con exito',
            data: [{
                rol,
                nombre, 
                email, 
                password, 
                descripcion
            }]
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de agregar personal",
            data: {},
            accion: 'agregar personal',
            error: error
        })
    }
}

const agregarEstudiante = async (req, res) => {
    try {

        const {codigo_estudiante, nombre, email, password, descripcion} = req.body

        const rol = 'estudiante'

        await pool.query('INSERT INTO usuarios (rol, nombre, email, password_user, descripcion) VALUES ($1, $2, $3, $4, $5)', [
            rol, 
            nombre, 
            email, 
            password, 
            descripcion
        ])

        const usuarios = await pool.query('SELECT * FROM usuarios WHERE rol = $1 and nombre = $2 and email = $3 and password_user = $4', [
            rol, 
            nombre, 
            email, 
            password, 
        ])

        usuarios.rows.map( async usuario => {
            await pool.query('INSERT INTO estudiantes (id_usuarios, codigo_estudiante) VALUES ($1, $2)', [
                usuario.id_usuarios,
                codigo_estudiante
            ])
        } )
                    
        res.json({
            message: 'El estuduante fue agregado con exito',
            data: [{
                codigo_estudiante,
                rol, 
                nombre, 
                email, 
                password, 
                descripcion
            }]
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de agregar al estudiante",
            data: {},
            accion: 'Agregar estudiante',
            error: error
        })
    }
}

const actualizarEstudiantes = async (req, res) => {
    try {

        const id = req.params.id;
        const {nombre, descripcion} = req.body;
        
        await pool.query('UPDATE usuarios SET nombre = $1, descripcion = $2 WHERE id_usuarios = $3', [
            nombre, 
            descripcion,
            id
        ])

        res.json({
            message: 'El usuario fue actualizado con exito',
            data: [{
                id, 
                nombre, 
                descripcion
            }]
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de actualizar al usuario",
            data: {},
            accion: 'Actualizar usuario',
            error: error
        })
    }
}

const autenticarUsuario = async (req, res) => {
    try {

        const {email, password} = req.body;

        const dato = await pool.query('SELECT id_usuarios, rol, nombre, email, descripcion FROM  usuarios WHERE email = $1 and password_user = $2', [
            email, 
            password
        ])

        res.json(dato.rows)
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de autenticar al usuario",
            data: {},
            accion: 'Autenticar usuario',
            error: error
        })
    }
}

module.exports = {
    getUsers,
    getUser,
    getStudents,
    agregarPersonal,
    agregarEstudiante,
    actualizarEstudiantes,
    autenticarUsuario
}