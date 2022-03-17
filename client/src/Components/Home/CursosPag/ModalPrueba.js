import React, { useState } from 'react'

import '../../../Styles/Home/modalPrueba.css';

export default function ModalPrueba(props) {

    let [tipoPregunta, setPregunta] = useState({
        crearPregunta: false,
        tipo: ''
    })

    let [preguntas, setPreguntas] = useState([
        {
            id: 0,
            titulo: 'Que es una varible',
            tipo: 'cerrada',
            opciones: [
                {
                    id: 0,
                    opcion: 'Dato',
                    correcta: true,
                },
                {
                    id: 1,
                    opcion: 'almacen',
                    correcta: false,
                } ,
                {
                    id: 2,
                    opcion: 'prueba',
                    correcta: false,
                } 
            ]
        }, 
        {
            id: 1,
            titulo: '¿Que es un funcion?',
            tipo: 'cerrada',
            opciones: [
                {
                    id: 0,
                    opcion: 'objeto',
                    correcta: false,
                },
                {
                    id: 1,
                    opcion: 'contenedor de codigo',
                    correcta: false,
                } 
            ]
        },
        {
            id: 2,
            titulo: 'Describe un objecto',
            tipo: 'abierta',
        }      
    ])

    const handleChange = (e) => {
		setPreguntas({...preguntas,[e.target.name]: e.target.value});
	}

    const setTipoPregunta = ( bool, tipoP ) => {
        setPregunta({
            crearPregunta: bool,
            tipo: tipoP
        })
    }

    const crearPregunta = ( pregunta ) => {
        setPreguntas({
            ...preguntas, 
            pregunta
        })
    }

    const crearCompPregunta = () => {
        if( tipoPregunta.crearPregunta ){
            if( tipoPregunta.tipo === 'abierta' ){
                return <>
                    <input type='text' placeholder='TITULO PREGUNTA ABIERTA' />
                </>
            }
            else if( tipoPregunta.tipo === 'cerrada' ){
                return preguntas.map( question =>  {
                    if( question.tipo === 'cerrada' ){
                        return <>
                            <input type='text' name='titulo' value={question.titulo} placeholder='TITULO PREGUNTA CERRADA' />
                            <div className='contSelecion'>
                                { question.opciones.map( opc => {
                                    return <div className='opcionAdd'>
                                        <input type='text' name='opcion' value={opc.opcion} placeholder='opcion#' />
                                        <div className='contBtnOpc'>
                                            <button className={opc.correcta ? 'btnOpcion active' : 'btnOpcion'} >
                                                <ion-icon name="checkmark"></ion-icon>
                                            </button>
                                            <button className='btnOpcion' >
                                                <ion-icon name="close"></ion-icon>
                                            </button>
                                        </div>
                                        
                                    </div>
                                } ) }
                            </div>
                            <button className='addOpciones'><ion-icon name="add"></ion-icon></button>
                        </>
                    }
                    
                } )
                    
            }
            else{
                return <></>
            }
        }
            
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
                        <button className='btnAdd' onClick={() => {
                            setTipoPregunta( false, '' )
                        }}>AÑADIR</button>
                        <button className='btnAdd' onClick={() => {
                            setTipoPregunta( false, '' )
                        }}>LISTO</button>
                    </div>
                    <div className='contBtnSelecion'>
                        <button onClick={() => {
                            setTipoPregunta( true, 'abierta' )
                        }} >Abierta</button>
                        <button onClick={() => {
                            setTipoPregunta( true, 'cerrada' )
                        }}>Cerrada</button>
                    </div>
                    <div className='contOpcion'>
                        {crearCompPregunta()}
                    </div>
                </div>
                                
            </div>
            <div className='modalMostrar'>
                {preguntas.map( preg => {
                    return <div className='contPregunta'>
                        <h2>{preg.titulo}</h2>
                        { preg.tipo === 'cerrada' 
                        ? <div className='opciones'>
                            {preg.opciones.map( opc => {
                                return <div className='opcionItem'>
                                    <button>{opc.correcta ? <ion-icon name="radio-button-on"></ion-icon> : <ion-icon name="radio-button-off"></ion-icon>}</button>
                                    <p>{opc.opcion}</p>
                                </div>
                            } )}
                        </div>
                        : <textarea> 
                        </textarea> }
                        
                    </div>
                })}
            </div>
        </div>
      
  </div>
}

