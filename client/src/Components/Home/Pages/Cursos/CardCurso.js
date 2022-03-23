import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

/* Style */
import '../../../../Styles/Home/pageCursos.css';

/* Imagenes */
import defaultFondo from '../../../../Assets/defaultFondoCursos.png';
import ModalCursoAdmin from './ModalCursoAdmin';

export default function CardCurso(props) {

  const navigate = useNavigate();

  let [modal, setModal] = useState(false)

  const activeModal = () =>{
    setModal(!modal)
  }

  return <div className='cardCurso' onClick={ () => {
    if( props.rolpage === 'admin' ){
      activeModal()
    }
    else{
      navigate("/home/"+props.rolpage+'/cursos/'+props.dato.id_cursos);
    }
  }}>
    <div className='fondoCurso'>
      <img src={defaultFondo} alt='../' />
    </div>
    <div className='titleCurso'>
      {props.dato.nombre_c ? props.dato.nombre_c  : 'Nombre del Curso'}
    </div>
    {
      modal
      ? <ModalCursoAdmin activeModal = {activeModal} dato={props.dato} />
      : <></>
    }
  </div>
}
