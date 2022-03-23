import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

import '../../Styles/clases/clasesmodal.css'

import {obtenerPruebasCurso} from '../../Context/Servicio/Cursos'

export default function ModalPresentarPrueba(props) {

    const navigate = useNavigate();
  
    let [prueba, setPrueba] = useState(null)
    let [respuestas, setRespuestas] = useState([])
  
    const getPrueba = () => {
      obtenerPruebasCurso(props.idCurso).then( datos => {
        if( datos.nombre_prueba ){
          setPrueba(datos)        
        }
      } )
    }

    const marcarOpciones = (idOpcion, idPregunta, opcion) => {
      let result = []
      const existe = respuestas.filter( anwer => anwer.id_opcion === idOpcion && anwer.id_pregunta === idPregunta )
      if( !(existe.length > 0) ){
        const existePregunta = respuestas.filter( anwer => anwer.id_pregunta === idPregunta  )
        if( existePregunta.length > 0 ){
          result = respuestas.map( anwer => {
            if( anwer.id_pregunta === idPregunta ){
              return {
                id_pregunta: idPregunta,
                id_opcion: idOpcion,
                opcion: opcion
              }
            }
            return anwer
          } )
        }
        else{
          result = [...respuestas, {
            id_pregunta: idPregunta,
            id_opcion: idOpcion,
            opcion: opcion
          }]
        }
      }
      else{
        result = respuestas
      }
      setRespuestas(result)
    }

    const obcionSelecionada = (idOpcion, idPregunta) => {
      const existe = respuestas.filter( anwer => anwer.id_opcion === idOpcion && anwer.id_pregunta === idPregunta )
      if( existe.length > 0 ){
        return 'opcion active'
      }
      else{
        return 'opcion'
      }
    }

    const activarBoton = () => {
      if( prueba != null ){
        if( respuestas.length === prueba.preguntas.length ){
          return 'active'
        }
        else{
          return ''  
        }
      }
      else{
        return ''
      }
    }
  
    useEffect(() => {
        getPrueba()
    }, [])

    const onChange = ( e, idPregunta ) => {
      const existePregunta = respuestas.filter( anwer => anwer.id_pregunta === idPregunta  )
      if( existePregunta.length > 0 ){
        setRespuestas( respuestas.map( anwer => {
          if( anwer.id_pregunta === idPregunta ){
            return {
              id_pregunta: anwer.id_pregunta,
              id_opcion: 0,
              opcion: e.target.value
            }
          }
          return anwer
        } ) )
      }
      else{
        setRespuestas( [...respuestas, {
          id_pregunta: idPregunta,
          id_opcion: 0,
          opcion: e.target.value
        }] )
      }
    }
    
    const limpiarRespuestas = () => {
      setRespuestas( respuestas.filter( anwer => anwer.opcion.length > 0  ) )
    }
  
    const irAClases = () => {
      limpiarRespuestas()
      if( prueba != null ){
        if( respuestas.length === prueba.preguntas.length ){
          navigate('/clases/student/'+props.idCurso+'/meeting')
        }
        else{
          Swal.fire({
            icon: 'warning',
            title: 'Debes responder todas las preguntas',
            showConfirmButton: false,
            timer: 3000,
          })
        }
      }
      else{
        navigate('/clases/student/'+props.idCurso+'/meeting')
      }
      
    }

  return (
    <div className='containerModalPrueba'>
        <div className='modalprueba'>
          <div className='headBtnAsistir'>
            <button onClick={() => {
                navigate('/home/'+props.rolpage+'/cursos/'+props.idCurso+'/')
            }}> Volver </button>
            <button className={activarBoton()} onClick={irAClases}>IR A CLASES</button>
          </div>
          <div className='bodyPreguntasPrueba'>
            <h1>PRUEBA</h1>
            {
              prueba
              ? prueba.preguntas.length > 0
                ? prueba.preguntas.map( question => {
                    if( question.tipo === 'cerrada' ){
                      return <div key={question.id_pregunta} className='preguntasClose'>
                        <h2>{question.pregunta}</h2>
                        {
                          question.opciones.length > 0
                          ? <div className='contOpciones'>
                              {
                                question.opciones.map( opc => {
                                  return <button key={opc.id} className={obcionSelecionada(opc.id, question.id_pregunta)} onClick={() => {
                                    marcarOpciones(opc.id, question.id_pregunta, opc.opcion)
                                  }}>{opc.opcion}</button>
                                } )
                              }
                            </div>
                          : <></>
                        }
                        
                      </div>
                    }
                    else{
                      return <div key={question.id_pregunta} className='preguntasOpen'>
                        <h2>{question.pregunta}</h2>
                        <div className='contOpciones'>
                          <textarea placeholder='Respuesta' onChange={e => {
                            onChange(e, question.id_pregunta)
                          }} ></textarea>
                        </div>
                      </div>
                    }
                } )
                : <></>
              : <></>
            }
            
            
          </div>
        </div>
    </div>
  )
}
