import React, {useState} from 'react'

import '../../../Styles/Home/cursosStudents.css';

import ItemParticipante from './ItemParticipante';

export default function CursoStudens(props) {

  
  let [publicar, setPublicar] = useState('')
  let [activePublicar, setActivePublicar] = useState(false)

  const test = () => {
    let map = [];
    for( let i = 0; i < 20; i++ ){
      map.push(i);
    }
    return map.map( item => {
      return <ItemParticipante key={item} />
    } )
  }

  return <>
    <div className='headCursoDocente'>
      <button onClick={() => {
        props.setCurso(false, [])
      }}><ion-icon name="arrow-back"></ion-icon></button>
    </div>
    <div className='contCurso'>
      <div className='curso'>
        <div className='infoDocente'>
          <div className='contIcon'></div>
          <div className='contInfo'>
            <h2>Nombre Docente</h2>
            <h3>docente.email@correo.com</h3>
            <h3>DESCRIPCION</h3>
            <p></p>
          </div>
        </div>        
        <div className='infoCursoStudent'>
          <div className='contInfo'>
            <h2>{props.datos.name ? props.datos.name : 'Nombre Del Curso' }</h2>
            <h3># Creditos</h3>
            <h3>DESCRIPCION</h3>
            <p></p>
          </div>
          <div className='contIcon'></div>
        </div>
        <div className='contBodyCursoStudent'>
          <div className={activePublicar ? 'contHeadCS active' : 'contHeadCS'}>
            <div className='contPublicar'>
              <input type='text' name='publicar' placeholder='¿Que deseas informar?' value={publicar}></input>
              <button><ion-icon name="send-outline"></ion-icon></button>
              <button onClick={() => {
                setActivePublicar(false)
              }}><ion-icon name="close-outline"></ion-icon></button>
            </div>
            <div className='contBtnHeadCS'>
              <button onClick={() => {
                setActivePublicar(true)
              }}>PUBLICAR</button>
              <button>ASISTIR A CLASES</button>
            </div>
          </div>
          <div className='contPublicacionesStudent'></div>
        </div>
      </div>
    </div>
    <div className='contParticipantes'>
      <div className='participantes'>
        <div className='headParticiapante'>
          <h2>Participantes</h2>
        </div>
        <div className='bodyParticipantes'>
          {test()}
        </div>
      </div>
    </div>
  </>
}

