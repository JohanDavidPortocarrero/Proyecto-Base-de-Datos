import React, { useEffect, useState } from 'react'

import '../../../../Styles/Home/modalCursoAdmin.css'
import imganeDefault from '../../../../Assets/defaultFondoCursos.png'
import {obtenerUsuario} from '../../../../Context/Servicio/Usuarios'
import { obtenerinscritosCurso } from '../../../../Context/Servicio/Cursos'

export default function ModalCursoAdmin(props) {

    let [docente, detDocente] = useState({}) 
    let [cantidadEstudiantes, setCantidad] = useState(0)

    const getDocente = () => {
        obtenerUsuario(props.dato.id_usuarios).then(datos => {
            detDocente(datos)
        })
    }

    const getStudent = () => {
        obtenerinscritosCurso(props.dato.id_cursos).then(datos => {
            if( datos.length > 0 ){
                if( datos[0].estudiantes ){
                    setCantidad(datos[0].estudiantes.length)  
                }
                else{
                    setCantidad(0)  
                }                                 
            }
        })
    }

    useEffect(() => {
        getDocente()
        getStudent()
    }, [])

  return (
    <div className='containerModal'>
        <div className='modalCardCursos'>
            <div className='contDatos'>
                <div className='contImagen'>
                    <img src={imganeDefault} alt='' />
                </div>
                <div className='contInformacion'>
                    <h2>Datos</h2>
                    <h4>NOMBRE</h4>
                    <p>{props.dato.nombre_c}</p>
                    <h4>CREDITOS</h4>
                    <p>{props.dato.creditos}</p>
                    <h4>DESCRIPCION</h4>
                    <p>{props.dato.descripcion}</p>
                    <h4>CANTIDAD ESTUDIANTES</h4>
                    <p>{cantidadEstudiantes}</p>
                    {
                        docente
                        ? <>
                            <h1>DOCENTE</h1>
                            <h5>NOMBRE</h5>
                            <p>{docente.nombre}</p>
                            <h5>EMAIL</h5>
                            <p>{docente.email}</p>
                            <h5>DESCRIPCION</h5>
                            <p>{docente.descripcion}</p>
                        </>
                        : <></>
                    }
                </div>
            </div>
            <div className='contBtnModal'>
                <div className='contBtnEspecial'>
                    <button><ion-icon name="create"></ion-icon></button>
                    <button><ion-icon name="trash"></ion-icon></button>
                </div>
                <button onClick={() => {
                  props.activeModal()  
                }}>CERRAR</button>
            </div>
        </div>
    </div>
  )
}
