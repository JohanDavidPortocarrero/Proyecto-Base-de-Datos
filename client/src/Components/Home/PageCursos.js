import React, { useState } from 'react'

/* Style */
import '../../Styles/Home/pageCursos.css';

/* Components */
import CursoStudens from './CursosPag/CursoStudens';
import CursosDocente from './CursosPag/CursosDocente'
import CardCurso from './CardCurso';

export default function PageCursos() {

  let [verCurso, setVerCurso] = useState({
    hayCurso: false,
    curso: []
  })

  let rol = 'estudiante';

  const setCurso = (boolean, dato) => {
    setVerCurso({
      hayCurso: boolean,
      curso: dato  
    })
  }

  const alterCurso = () => {
    if( verCurso.hayCurso ){
      if( rol === 'docente' ){
        return <CursosDocente setCurso={setCurso} datos = {verCurso.curso} />
      }
      else if( rol === 'estudiante' ){
        return <CursoStudens setCurso={setCurso} datos = {verCurso.curso} />
      }
      
    }
    else{
      return <>
        <CardCurso name={'Fundamentos de programacion'} setVerCurso={setCurso} />
        <CardCurso setVerCurso={setCurso} />
        <CardCurso setVerCurso={setCurso} />
        <CardCurso setVerCurso={setCurso} />
        <CardCurso setVerCurso={setCurso} />
      </>
    }
  }

  return (
    <div className='pageCursos'>
      <div className='contCardCursos'>
        {alterCurso()}
      </div>
    </div>
  )
}
