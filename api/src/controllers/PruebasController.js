const pool = require('../database/db/configDatabase');

const getPruebas = async (req, res) => {
    try {

        const pruebas = await pool.query('SELECT * FROM pruebas');
        const preguntas = await pool.query('SELECT * FROM preguntas');
        const listaOpciones = await pool.query('SELECT * FROM lista_opciones');
        const opciones = await pool.query('SELECT * FROM opciones');
        const docentes = await pool.query('SELECT * FROM usuarios WHERE rol = $1', [
            'personal'
        ]);

        const jsonFile = []

        pruebas.rows.map( prueba => {

            const dato = {
                id_prueba: prueba.id_prueba,
                nombre_prueba: prueba.nombre,
                publicada: prueba.fecha_publicacion,
                descripcion: prueba.descripcion_estado,
                docente: {},
                preguntas: [],
            }

            docentes.rows.map(docente => {
                if( docente.id_usuarios === prueba.id_usuarios ){
                    dato.docente = {
                        id_docente: docente.id_usuarios,
                        nombre: docente.nombre,
                        email: docente.email
                    }
                }
            })

            preguntas.rows.map( pregunta => {
                if( prueba.id_pruebas === pregunta.id_pruebas ){
                    if( preguntas.tipo === 'cerrada' ){
                        listaOpciones.rows.map( list => {
                            const preguntaclose = {
                                id_pregunta: pregunta.id_pregunta,
                                tipo: pregunta.tipo,
                                pregunta: pregunta.descripcion,
                                opciones: []
                            }  
                            if( list.id_pregunta === pregunta.id_pregunta ){
                                opciones.rows.map( opcion => {
                                    if( opcion.id_list_opciones === list.id_lista_opciones ){     
                                        preguntaclose.opciones.push({
                                            id: opcion.id,
                                            opcion: opcion.opcion
                                        })                                                                   
                                    }
                                } )
                            }
                            dato.preguntas.push(preguntaclose)
                        } )
                    }
                    else if( preguntas.tipo === 'abierta' ){
                        const preguntaopen = {     
                            id_pregunta: pregunta.id_pregunta,
                            tipo: pregunta.tipo,
                            pregunta: pregunta.descripcion,        
                        }
                        dato.preguntas.push(preguntaopen)
                    }
                }                
            } )

            jsonFile.push(dato)

        } )

        res.json(jsonFile)

        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener las pruebas",
            data: {},
            accion: 'obtener pruebas',
            error: error
        })
    }
}

const getPrueba = async (req, res) => {
    try {

        const id = req.params.id;

        const pruebas = await pool.query('SELECT * FROM pruebas WHERE id_pruebas = $1', [id]);
        const preguntas = await pool.query('SELECT * FROM preguntas WHERE id_pruebas = $1', [id]);
        const listaOpciones = await pool.query('SELECT * FROM lista_opciones');
        const opciones = await pool.query('SELECT * FROM opciones');

        const jsonFile = {
            id_prueba: pruebas.rows[0].id_prueba,
            nombre_prueba: pruebas.rows[0].nombre,
            publicada: pruebas.rows[0].fecha_publicacion,
            descripcion: pruebas.rows[0].descripcion_estado,
            preguntas: [],
        }

        preguntas.rows.map( pregunta => {
            if( preguntas.tipo === 'cerrada' ){
                listaOpciones.rows.map( list => {
                    const preguntaclose = {
                        id_pregunta: pregunta.id_pregunta,
                        tipo: pregunta.tipo,
                        pregunta: pregunta.descripcion,
                        opciones: []
                    }  
                    if( list.id_pregunta === pregunta.id_pregunta ){
                        opciones.rows.map( opcion => {
                            if( opcion.id_list_opciones === list.id_lista_opciones ){     
                                preguntaclose.opciones.push({
                                    id: opcion.id,
                                    opcion: opcion.opcion
                                })                                                                   
                            }
                        } )
                    }
                    jsonFile.preguntas.push(preguntaclose)
                } )
            }
            else if( preguntas.tipo === 'abierta' ){
                const preguntaopen = {     
                    id_pregunta: pregunta.id_pregunta,
                    tipo: pregunta.tipo,
                    pregunta: pregunta.descripcion,        
                }
                jsonFile.preguntas.push(preguntaopen)
            }
        })

        res.json(jsonFile);
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener la prueba del curso",
            data: {},
            accion: 'obtener prueba del curso',
            error: error
        })
    }
}

const getPruebaCurso = async (req, res) => {
    try {

        const id = req.params.id;

        const pruebas = await pool.query('SELECT * FROM pruebas WHERE id_curso = $1', [id]);
        const preguntasConsult = await pool.query('SELECT * FROM preguntas');
        const listaOpciones = await pool.query('SELECT * FROM lista_opciones');
        const opciones = await pool.query('SELECT * FROM opciones');

        if( pruebas.rows.length > 0 ){
            const jsonFile = {
                id_prueba: pruebas.rows[0].id_pruebas,
                nombre_prueba: pruebas.rows[0].nombre,
                publicada: pruebas.rows[0].fecha_publicacion,
                descripcion: pruebas.rows[0].descripcion_estado,
                preguntas: [],
            }

            preguntasConsult.rows.map( pregunta => {
                if( pregunta.id_pruebas === pruebas.rows[0].id_pruebas ){
                    if( pregunta.tipo === 'cerrada' ){
                        listaOpciones.rows.map( list => {  
                            if( list.id_pregunta === pregunta.id_pregunta ){
                                const preguntaclose = {
                                    id_pregunta: pregunta.id_pregunta,
                                    tipo: pregunta.tipo,
                                    pregunta: pregunta.descripcion,
                                    opciones: []
                                }
                                opciones.rows.map( opcion => {
                                    if( opcion.id_list_opciones === list.id_lista_opciones ){     
                                        preguntaclose.opciones.push({
                                            id: opcion.id,
                                            opcion: opcion.opcion
                                        })                                                                   
                                    }
                                } )
                                jsonFile.preguntas.push(preguntaclose)
                            }
                        } )
                    }
                    else if( pregunta.tipo === 'abierta' ){
                        const preguntaopen = {     
                            id_pregunta: pregunta.id_pregunta,
                            tipo: pregunta.tipo,
                            pregunta: pregunta.descripcion,        
                        }
                        jsonFile.preguntas.push(preguntaopen)
                    }              
                }
                
            })
            res.json(jsonFile);
        }
        else{
            res.json([]);
        }

            
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de obtener la prueba del curso",
            data: {},
            accion: 'obtener prueba del curso',
            error: error
        })
    }
}

const crearPrueba = async (req, res) => {
    try {

        const {docente, curso, nombre, descripcion} = req.body;

        await pool.query('INSERT INTO pruebas (id_usuarios, nombre, fecha_publicacion, descripcion_estado, id_curso) VALUES ($1, $2, NOW(), $3, $4)', [
            docente, nombre, descripcion, curso
        ])

        const prueba = await pool.query('SELECT * FROM pruebas WHERE id_usuarios = $1 and id_curso = $2 and nombre = $3 and descripcion_estado = $4', [
            docente, curso, nombre, descripcion
        ])

        res.json({
            message: 'La prueba fue creada',
            dato:{
                id: prueba.rows[0].id_pruebas,
                docente: docente, 
                curso: curso, 
                nombre: nombre, 
                fecha_publicacion: new Date().toISOString(), 
                descripcion: descripcion
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de crear la prueba",
            data: {},
            accion: 'Crear Prueba',
            error: error
        })
    }
}

const insertarPregunta = async (req, res) => {
    try {

        const {prueba, tipo, pregunta} = req.body;

        await pool.query('INSERT INTO preguntas (id_pruebas, descripcion, tipo) VALUES ($1, $2, $3)', [
            prueba, pregunta, tipo
        ]);

        const preguntaConsult = await pool.query('SELECT * FROM preguntas WHERE  id_pruebas = $1 and descripcion = $2 and tipo = $3', [
            prueba, pregunta, tipo
        ])

        await pool.query('INSERT INTO lista_opciones (id_pregunta) VALUES ($1)', [
            preguntaConsult.rows[0].id_pregunta
        ])
        
        res.json({
            message: 'La pregunta fue insertada a la prueba',
            dato:{
                id: preguntaConsult.rows[0].id_pregunta,
                prueba: prueba, 
                tipo: tipo, 
                pregunta: pregunta
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de insertar la pregunta en la prueba",
            data: {},
            accion: 'insertar pregunta',
            error: error
        })
    }
}

const insertarOpcion = async (req, res) => {
    try {

        const {pregunta, opcion} = req.body;

        const list_opcion = await pool.query('SELECT id_lista_opciones FROM lista_opciones WHERE id_pregunta = $1', [
            pregunta
        ])

        await pool.query('INSERT INTO opciones (id_list_opciones, opcion) VALUES ($1, $2)', [
            list_opcion.rows[0].id_lista_opciones,
            opcion
        ])
        
        res.json({
            message: 'La opcion fue agregada con exito',
            dato:{
                id_lista_opcions: list_opcion.rows[0].id_lista_opciones,
                id_pregunta: pregunta,
                opcion: opcion
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de crear la prueba",
            data: {},
            accion: 'Crear Prueba',
            error: error
        })
    }
}

const actualizarPregunta = async (req, res) => {
    try {
        const id = req.params.id;
        const {tipo, pregunta} = req.body;

        await pool.query('UPDATE preguntas SET descripcion = $1, tipo = $2 WHERE id_pregunta = $3', [
            pregunta, tipo, id
        ])

        res.json({
            message: 'La pregunta fue actualizada',
            dato:{id, tipo, pregunta}
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de actualizar la pregunta",
            data: {},
            accion: 'Actualizar pregunta',
            error: error
        })
    }
}

const actualizarPrueba = async (req, res) => {
    try {
        const id = req.params.id;
        const {curso, nombre, descripcion} = req.body;

        await pool.query('UPDATE pruebas SET id_curso = $1, nombre = $2, descripcion_estado = $3 WHERE id_pruebas = $4', [
            curso, nombre, descripcion, id
        ])

        res.json({
            message: 'La prueba fue actualizada',
            dato:{id, curso, nombre, descripcion}
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de actualizar la prueba",
            data: {},
            accion: 'Actualizar prueba',
            error: error
        })
    }
} 

const actualizarOpcion = async (req, res) => {
    try {
        const id = req.params.id;
        const {opcion} = req.body;

        await pool.query('UPDATE opciones SET opcion = $1 WHERE id = $2', [
            opcion, id
        ])

        res.json({
            message: 'La prueba fue actualizada',
            dato:{id, opcion}
        })

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de actualizar la opcion",
            data: {},
            accion: 'Actualizar opcion',
            error: error
        })
    }
}

const deletePrueba = async (req, res) => {
    try {

        const id = req.params.id;
        
        const preguntas = await pool.query('SELECT * FROM preguntas WHERE id_pruebas = $1', [id]);

        preguntas.rows.map( async pregunta => {
            const listaOpciones = await pool.query('SELECT * FROM lista_opciones WHERE id_pregunta = $1', [pregunta.id_pregunta]);
            listaOpciones.rows.map( async lsit => {
                await pool.query('DELETE FROM opciones WHERE id_list_opciones = $1', [lsit.id_lista_opciones])
            } )
            await pool.query('DELETE FROM lista_opciones WHERE id_pregunta = $1', [pregunta.id_pregunta])
        } )       
        
        await pool.query('DELETE FROM preguntas WHERE id_pruebas = $1', [id])
        
        await pool.query('DELETE FROM pruebas WHERE id_pruebas = $1', [id])

        res.json({
            message: 'La prueba fue eliminada'
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de eliminar la prueba",
            data: {},
            accion: 'elijminar prueba',
            error: error
        })
    }
}

const deletePregunta = async (req, res) => {
    try {

        const id = req.params.id;

        const listaOpciones = await pool.query('SELECT * FROM lista_opciones WHERE id_pregunta = $1', [id]);
        listaOpciones.rows.map( async lsit => {
            await pool.query('DELETE FROM opciones WHERE id_list_opciones = $1', [lsit.id_list_opciones])
        } )
        await pool.query('DELETE FROM lista_opciones WHERE id_pregunta = $1', [id])
        await pool.query('DELETE FROM preguntas WHERE id_pregunta = $1', [id])

        res.json({
            message: 'La pregunta fue eliminada'
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de eliminar la pregunta",
            data: {},
            accion: 'eliminar pregunta',
            error: error
        })
    }
}

const deleteOpcion = async (req, res) => {
    try {

        const id = req.params.id;

        await pool.query('DELETE FROM opciones WHERE id = $1', [id])

        res.json({
            message: 'La opcion fue eliminada'
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error al tratar de eliminar la opcion",
            data: {},
            accion: 'eliminar opcion',
            error: error
        })
    }
}

module.exports = {
    getPruebas,
    getPrueba,
    getPruebaCurso,
    crearPrueba,
    insertarPregunta,
    insertarOpcion,
    actualizarPrueba,
    actualizarPregunta,
    actualizarOpcion,
    deleteOpcion,
    deletePregunta,
    deletePrueba
}