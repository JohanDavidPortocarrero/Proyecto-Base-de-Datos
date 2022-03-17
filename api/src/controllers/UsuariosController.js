const pool = require('../database/db/configDatabase');

const getUsers = async (req, res) => {

    try {

        const {id} = req.param;

        const usuarios = await pool.query('SELECT * FROM usuarios WHERE id <> $1', [id]);
        const personal = await pool.query('SELECT * FROM personal');
        const estudiantes = await pool.query('SELECT * FROM estudiantes');

        const json = usuarios.rows.map( usuario => {
            return {
                personal: personal.rows.filter( pers => {
                    if( pers.id === usuario.id ){
                        return {
                            identificacion: usuario.id,
                            nombre: usuario.nombre,
                            email: usuario.email,
                            descripcion: usuario.descripcion
                        }
                    }
                } ),
                estudiantes: estudiantes.rows.filter( estudiante => {
                    if( estudiante.id === usuario.id ){
                        return {
                            identificacion: usuario.id,
                            codigo_estudiante: estudiante.codigo_estudiante,
                            nombre: usuario.nombre,
                            email: usuario.email,
                            descripcion: usuario.descripcion
                        }
                    }
                } ),
            }
            
        } )

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
        
        const {id} = req.param;

        const usuarios = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        const personal = await pool.query('SELECT * FROM personal WHERE id = $1', [id]);
        const estudiantes = await pool.query('SELECT * FROM estudiantes WHERE id = $1', [id]);

        if( personal.rows.length > 0 ){
            const jsonFile = usuarios.rows.map( usuario => {
                return {
                    personal: personal.rows.map( pers => {
                        if( pers.id === usuario.id ){
                            return {
                                identificacion: usuario.id,
                                codigo_estudiante: estudiante.codigo_estudiante,
                                nombre: usuario.nombre,
                                email: usuario.email,
                                descripcion: usuario.descripcion
                            }
                        }
                    } )
                }
            } )

            res.json(jsonFile);
        }
        else if( estudiantes.rows.length > 0 ){
            const jsonFile = usuarios.rows.map( usuario => {
                return {
                    estudiantes: estudiantes.rows.map( estudiante => {
                        if( estudiante.id === usuario.id ){
                            return {
                                identificacion: usuario.id,
                                nombre: usuario.nombre,
                                email: usuario.email,
                                descripcion: usuario.descripcion
                            }
                        }
                    } )
                }
            } )

            res.json(jsonFile);
        }
        else{
            res.json({
                message: 'El usuario no fue encontrado',
                data: []
            })
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

module.exports = {
    getUsers,
    getUser
}