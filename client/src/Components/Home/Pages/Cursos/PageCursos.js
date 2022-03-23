import React, { useEffect, useState, useContext } from 'react'
import { cursosInscriptoStudent, obtenerCursos, obtenerCursosDocente, obtenerinscripcionCursos } from '../../../../Context/Servicio/Cursos';

/* Style */
import '../../../../Styles/Home/pageCursos.css';

/* Components */
import CardCursos from './CardCurso'
import ModalAddCursos from './ModalAddCurso';

import UsuariosContext from '../../../../Context/Usuario/usuariosContext';
import PageLoadingV1 from '../../../PagesExtras/PageLoadingV1';

export default function PageCursos(props) {

  let [cursos, setCursos] = useState([])
  let [modalCurso, setModalCurso] = useState(false)
  let [cargando, setCargando] = useState(false)

  const userContex = useContext(UsuariosContext)
  const {verificarInicioSecion, datosUsuario} = userContex

  const activarModal = () => {
    setModalCurso(!modalCurso)
  }
  
  const obtenerAllCursos = () => {
    setCargando(true)
    if( props.rolpage === 'admin' ){
      obtenerCursos().then(datos => {
        if(datos){
          setCargando(false)
          setCursos(datos)
        }
      })
    }
    else if( props.rolpage === 'staff' ){
      if( datosUsuario ){
        obtenerCursosDocente(datosUsuario.id_usuarios).then(datos => {
          if(datos){
            setCargando(false)
            setCursos(datos)
          }
        })
      }
      
    }  
    else if( props.rolpage === 'student' ){
      if(datosUsuario){
        cursosInscriptoStudent(datosUsuario.id_usuarios).then(datos => {
          if(datos){
            setCargando(false)
            setCursos(datos)
          }
        })
      }
    }    
  }

  useEffect(() => {
    verificarInicioSecion()
    obtenerAllCursos()
  }, [])

  const defineCursos = () => {
    if( props.rolpage === 'admin' ){
      return <div className='contCursos'>
          <div className='contCardCursosAdmin'>
            {cursos.map( curso => {
              return <CardCursos key={curso.id_cursos} rolpage={props.rolpage} dato={curso} />
            } )}
          </div>
        <div className='contBtnCurso'>
          <button onClick={obtenerAllCursos}>actualizar</button>
          <button onClick={activarModal}>ADD</button>  
        </div>                
      </div>
    }
    else{
      return <div className='contCursos'>
          <div className='contCardCursos'>
            {cursos.map( curso => {
              return <CardCursos key={curso.id_cursos} rolpage={props.rolpage} dato={curso} />
            } )}
          </div>               
      </div>
    }
  }

  return (
    <div className='pageCursos'>
      <div className='headCursos'>
        <h1>CURSOS</h1>
      </div>
      <div className='bodyCursos'>
        {
          cargando
          ? <PageLoadingV1 />
          : defineCursos()
        }
      </div>
      {
        props.rolpage === 'admin' 
        ? modalCurso
          ? <ModalAddCursos activarModal={activarModal} />
          : <></>
        : <></>
      }
    </div>
  )
}
