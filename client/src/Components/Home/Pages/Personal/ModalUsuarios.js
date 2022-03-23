import React, { useEffect, useState } from 'react'

import '../../../../Styles/Admin/modalUsuario.css';
import imganeDefault from '../../../../Assets/defaulAvatar.png';
import { obtenerCursos, obtenerinscripcionCursos } from '../../../../Context/Servicio/Cursos';
import { obtenerAsistenciaEstudiantes } from '../../../../Context/Servicio/Usuarios';

export default function ModalUsuarios(props) {

    let [cantidadCurso, setCantidad] = useState({
        curso: 0,
        asistencia: 0
    });

    useEffect(() => {
        obtenerCursos(props.dato.identificacion).then(dato => {
            if(dato){
                if( props.dato.rol === 'personal' ){
                    setCantidad({...cantidadCurso, curso: dato.length})
                }
                else if( props.dato.rol === 'estudiante' ){
                    obtenerinscripcionCursos(props.dato.identificacion).then(dato => {
                        if( dato ){
                            setCantidad({...cantidadCurso, curso: dato.length})
                        }                        
                    })
                    obtenerAsistenciaEstudiantes(props.dato.identificacion).then(dato => {
                        if( dato ){
                            setCantidad({...cantidadCurso, asistencia: dato.length})
                        }
                    })
                }      
            }
        })
    }, [])

  return (
    <div className='containerModal' >
        <div className='modalUsuarios'>
            <div className='contDatos'>
                <div className='contImagen'>
                    <img src={imganeDefault} alt='' />
                </div>
                {props.dato.rol === 'personal'
                    ?<div className='contInformacion'>
                        <h2>Datos</h2>
                        <h4>NOMBRE</h4>
                        <p>{props.dato.nombre}</p>
                        <h4>EMAIL</h4>
                        <p>{props.dato.email}</p>
                        <h4>DESCRIPCION</h4>
                        <p>{props.dato.descripcion}</p>
                        <h4>CANTIDAD CURSOS</h4>
                        <p>{cantidadCurso.curso}</p>
                    </div>
                    : props.dato.rol === 'estudiante'
                        ? <div className='contInformacion'>
                            <h2>Datos</h2>
                            <h4>NOMBRE</h4>
                            <p>{props.dato.nombre}</p>
                            <h4>EMAIL</h4>
                            <p>{props.dato.email}</p>
                            <h4>DESCRIPCION</h4>
                            <p>{props.dato.descripcion}</p>
                            <h4>CANTIDAD CURSOS</h4>
                            <p>{cantidadCurso.curso}</p>
                            <h4>CANTIDAD ASISTENCIAS</h4>
                            <p>{cantidadCurso.asistencia}</p>
                        </div>
                        : props.dato.rol === 'administrador'
                            ?<div className='contInformacion'>
                                <h2>Datos</h2>
                                <h4>NOMBRE</h4>
                                <p>{props.dato.nombre}</p>
                                <h4>EMAIL</h4>
                                <p>{props.dato.email}</p>
                                <h4>DESCRIPCION</h4>
                                <p>{props.dato.descripcion}</p>
                            </div>
                            : <></>
                }
            </div>
            <div className='contBtnModal'>
                <div className='contBtnEspecial'>
                    <button><ion-icon name="create"></ion-icon></button>
                    <button><ion-icon name="trash"></ion-icon></button>
                </div>
                <button onClick={props.activarModal}>CERRAR</button>
            </div>
        </div>
    </div>
  )
}
