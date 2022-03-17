import React from 'react'

/* Style */
import '../../Styles/Home/pageCursos.css';

/* Imagenes */
import defaultFondo from '../../Assets/defaultFondoCursos.png';

export default function CardCurso(props) {
    return <div className='cardCurso' onClick={() => {
        props.setVerCurso(true, {name: props.name})
      }}>
        <div className='fondoCurso'>
          <img src={defaultFondo} alt='../' />
        </div>
        <div className='titleCurso'>
          {props.name ? props.name  : 'Nombre del Curso'}
        </div>
      </div>
}
