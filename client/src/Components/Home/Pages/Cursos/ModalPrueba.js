import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { crearPrueba, insertarOpciones, insertarPretgunta, obtenerPrueba, obtenerPruebasCurso } from '../../../../Context/Servicio/Cursos';

import '../../../../Styles/Home/modalPrueba.css';

export default function ModalPrueba(props) {

    let [prueba, setPrueba] = useState(null)
    let [preguntas, setPreguntas] = useState([])

    const getPrueba = () => {
        obtenerPruebasCurso(props.curso.id_cursos).then( _prueba => {
            console.log(_prueba)
            if( _prueba.nombre_prueba ){
                setPrueba(_prueba)
            }
        } )
    }

    useEffect(() => {
        getPrueba()
        Swal.fire({
            icon: 'info',
            title: 'Recuerda dar click en el boton CREAR para guardar la prueba',
            showConfirmButton: false,
            timer: 3000,
        })
    }, [])

    const agregarPregunta = ( type ) => {
        if( type === 'close' ){
            setPreguntas([...preguntas, {
                id: preguntas.length,
                type: 'cerrada',
                pregunta: '',
                opciones: [
                    {
                        id: 0,
                        correcta: false,
                        opcion: ''
                    },
                    {
                        id: 1,
                        correcta: false,
                        opcion: ''
                    }
                ]
            }])
        }
        else{
            setPreguntas([...preguntas, {
                id: preguntas.length,
                type: 'abierta',
                pregunta: ''
            }])
        }
    }

    const agregarOpcion = (idPregunta) => {
        setPreguntas(preguntas.map( question => {
            if( question.id === idPregunta ){
                return {
                    id: question.id,
                    type: question.type,
                    pregunta: question.pregunta,
                    opciones: [
                        ...question.opciones,
                        {
                            id: question.opciones.length,
                            correcta: false,
                            opcion: ''
                        }
                    ]
                }
            }
            return question
        } ))
    }

    const marcarOpcionCorrecta = (idPregunta, idOpcion) => {
        setPreguntas(preguntas.map( question => {
            if( question.id === idPregunta ){
                return {
                    id: question.id,
                    type: question.type,
                    pregunta: question.pregunta,
                    opciones: question.opciones.map( opc => {
                        if( opc.id === idOpcion ){
                            return {
                                id: opc.id,
                                correcta: true,
                                opcion: opc.opcion
                            }
                        }
                        return {
                            id: opc.id,
                            correcta: false,
                            opcion: opc.opcion
                        }
                    } )
                }
            }
            return question
        } ))
    }

    const eliminarOpcion = (idPregunta, idOpcion) => {
        setPreguntas(preguntas.map( question => {
            if( question.id === idPregunta ){
                if( question.opciones.length > 2 ){
                    return {
                        id: question.id,
                        type: question.type,
                        pregunta: question.pregunta,
                        opciones: question.opciones.filter( opc => opc.id !== idOpcion )
                    }
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'deben existir por lo menos dos opciones',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                }                
            }
            return question
        } ))
    }

    const eliminarPregunta = (idPregunta) => {
        setPreguntas(preguntas.filter( question => question.id !== idPregunta ))
    }

    const handleChange = (e, idPregunta) => {
        setPreguntas(preguntas.map( question => {
            if( question.id === idPregunta  ){
                if( question.type === 'cerrada' ){
                    return {
                        id: question.id,
                        type: question.type,
                        pregunta: e.target.value,
                        opciones: question.opciones
                    }
                }
                else{
                    return {
                        id: question.id,
                        type: question.type,
                        pregunta: e.target.value,
                    }
                }                
            }
            return question
        } ))
	}

    const handleChangeOpcion = (e, idPregunta, idOpcion) => {
        setPreguntas(preguntas.map( question => {
            if( question.id === idPregunta ){
                return {
                    id: question.id,
                    type: question.type,
                    pregunta: question.pregunta,
                    opciones: question.opciones.map( opc => {
                        if( opc.id === idOpcion ){
                            return {
                                id: opc.id,
                                correcta: opc.correcta,
                                opcion: e.target.value
                            }
                        }
                        return opc
                    })
                }
            }
            return question
        } ))
    }

    const crearPregunta = () => {

        console.log(prueba)
        if( prueba === null ){
            const pruebaInsert = {
                docente: props.curso.id_usuarios, 
                curso: props.curso.id_cursos, 
                nombre: 'Prueba '+props.curso.nombre_c+' '+new Date().toISOString(), 
                descripcion: 'Prueba del curso '+props.curso.nombre_c+' con codigo '+props.curso.codigo_curso
            }
            console.log(pruebaInsert)

            Swal.fire({
                title: 'Verificando informacion',
                didOpen: () => {
                    Swal.showLoading()
                    crearPrueba(pruebaInsert).then( datos => {
                        console.log( datos )
                        if( datos.dato ){
                            preguntas.map( async question => {

                                const questionInsert = {
                                    prueba: datos.dato.id, 
                                    tipo: question.type, 
                                    pregunta: question.pregunta
                                }

                                insertarPretgunta(questionInsert).then( resPregunta => {
                                    if( resPregunta ){
                                        if( question.type === 'cerrada' ){
                                            question.opciones.map( async opc => {
                                                const opcionInsert = {
                                                    pregunta: resPregunta.dato.id, 
                                                    opcion: opc.opcion
                                                }
                                                await insertarOpciones(opcionInsert)
                                            } )
                                        }
                                        
                                    }
                                } )
                            } )

                            Swal.fire({
                                icon: 'success',
                                title: 'La prueba fue creada con exito',
                                showConfirmButton: false,
                                timer: 3000,
                            })
                        }
                        else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Ocurrio un error',
                                showConfirmButton: false,
                                timer: 3000,
                            })
                        }
                    })
                },
            })

        }
        else{
            Swal.fire({
                title: 'Verificando informacion',
                didOpen: () => {
                    Swal.showLoading()
                    preguntas.map( question  => {

                        const existe = prueba.preguntas.filter( questionPrue => question.pregunta === questionPrue.pregunta )

                        if( !(existe.length > 0) ){
                            const questionInsert = {
                                prueba: prueba.id_prueba, 
                                tipo: question.type, 
                                pregunta: question.pregunta
                            }

                            insertarPretgunta(questionInsert).then( resPregunta => {
                                if( resPregunta ){
                                    if( question.type === 'cerrada' ){
                                        question.opciones.map( async opc => {
                                            const opcionInsert = {
                                                pregunta: resPregunta.dato.id, 
                                                opcion: opc.opcion
                                            }
                                            await insertarOpciones(opcionInsert)
                                        } )
                                    }
                                    
                                }
                            } )
                        }
                    })

                    Swal.fire({
                        icon: 'success',
                        title: 'Las preguntas fueron agregadas',
                        showConfirmButton: false,
                        timer: 3000,
                    })

                }
            })
        }
        
        setPreguntas([])
        getPrueba()
        props.onOffModal()
        
    }

  return <div className='containerModal'>
        <div className='closeModal'>
            <button onClick={() => {
                props.onOffModal()
            }}>CLOSE</button>
        </div>
        <div className='modal'>
            <div className='modalCrear'>
                <div className='cuestionario'>
                    <div className='contBtnAddPregunta'>
                        <button className='btnAdd' onClick={crearPregunta}>CREAR</button>
                    </div>
                    <div className='contBtnSelecion'>
                        <button onClick={() => {
                            agregarPregunta('open')
                        }} >Abierta</button>
                        <button onClick={() => {
                            agregarPregunta('close')
                        }}>Cerrada</button>
                    </div>
                    <div className='contOpcion'>
                        {
                            preguntas.length <= 0 
                            ? <></>
                            : preguntas.map( question => {
                                if( question.type === 'abierta' ){
                                    return <div key={question.id} className='contPreguntaOpen'>
                                        <input 
                                            type='text' 
                                            value={question.pregunta} 
                                            placeholder='TITULO PREGUNTA ABIERTA' 
                                            onChange={(e) => {
                                                handleChange(e, question.id)
                                            }}
                                        />
                                        <div className='contBtnAccionPreguntas'> 
                                            <button className='addOpciones' onClick={() => {
                                                eliminarPregunta(question.id)
                                            }}>
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </button>
                                        </div>
                                    </div>   
                                }
                                else{
                                    return <div key={question.id} className='contPreguntaCloso'>
                                        <input 
                                            type='text' 
                                            value={question.pregunta} 
                                            placeholder='TITULO PREGUNTA CERRADA'
                                            onChange={(e) => {
                                                handleChange(e, question.id)
                                            }}
                                        />
                                        <div className='contSelecion'>
                                            { question.opciones.map( opc => {
                                                return <div key={opc.id} className='opcionAdd'>
                                                    <input 
                                                        type='text' 
                                                        name='opcion' 
                                                        value={opc.opcion} 
                                                        placeholder={'opcion #'+opc.id}
                                                        onChange={(e) => {
                                                            handleChangeOpcion(e, question.id, opc.id)
                                                        }}
                                                    />
                                                    <div className='contBtnOpc'>
                                                        <button 
                                                            className={opc.correcta ? 'btnOpcion active' : 'btnOpcion'} 
                                                            onClick={() => {
                                                                marcarOpcionCorrecta(question.id, opc.id)
                                                            }}
                                                        >
                                                            <ion-icon name="checkmark"></ion-icon>
                                                        </button>
                                                        <button className='btnOpcion' onClick={() => {
                                                            eliminarOpcion(question.id, opc.id)
                                                        }}>
                                                            <ion-icon name="close"></ion-icon>
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                            } ) }
                                        </div>
                                        <div className='contBtnAccionPreguntas'> 
                                            <button className='addOpciones' onClick={() => {
                                                eliminarPregunta(question.id)
                                            }}>
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </button>
                                            <button className='addOpciones' onClick={() => {
                                                agregarOpcion(question.id)
                                            }}><ion-icon name="add"></ion-icon></button>
                                        </div>
                                    </div>
                                }
                            } )
                        }
                    </div>
                </div>
                                
            </div>
            <div className='modalMostrar'>
                {preguntas.map( preg => {
                    return <div key={preg.id} className='contPregunta'>
                        <h2>{preg.pregunta}</h2>
                        { preg.type === 'cerrada' 
                            ? <div className='opciones'>
                                {preg.opciones.map( opc => {
                                    return <div key={opc.id} className='opcionItem'>
                                        <button>{opc.correcta ? <ion-icon name="radio-button-on"></ion-icon> : <ion-icon name="radio-button-off"></ion-icon>}</button>
                                        <p>{opc.opcion}</p>
                                    </div>
                                } )}
                            </div>
                            : <textarea> 
                            </textarea> 
                        }
                        
                    </div>
                })}
                { prueba 
                    ? prueba.preguntas.length > 0 
                        ? prueba.preguntas.map( preg => {
                            return <div key={preg.id_pregunta} className='contPregunta'>
                                <h2>{preg.pregunta}</h2>
                                { preg.tipo === 'cerrada' 
                                    ? <div className='opciones'>
                                        {preg.opciones.map( opc => {
                                            return <div key={opc.id} className='opcionItem'>
                                                <button><ion-icon name="radio-button-off"></ion-icon></button>
                                                <p>{opc.opcion}</p>
                                            </div>
                                        } )}
                                    </div>
                                    : <textarea> 
                                    </textarea> 
                                }
                                
                            </div>
                        })
                        : <></>
                    : <></>
                }
            </div>
        </div>
      
  </div>
}

