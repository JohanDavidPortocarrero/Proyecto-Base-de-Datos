import React, { useState } from 'react'
import Swal from 'sweetalert2'

import '../../../Styles/Home/cursoDocente.css';
import ModalPrueba from './ModalPrueba';

export default function CursosDocente(props) {

  let [modal, setModal] = useState(false);
  let [publicar, setPublicar] = useState('')
  let [activePublicar, setActivePublicar] = useState(false)

  const onOffModal = () => {
    setModal(!modal);
  }

  const activeModal = () => {
    if( modal ){
      return <ModalPrueba onOffModal={onOffModal} />
    }
    else {
      return <></>
    }
  }

  const obtenerRutaCurso = () => {
    Swal.fire(`http://localhost:3000/cursos`)
  }

  const agregarEstudiante = async () => {
    const { value: datoStudent } = await Swal.fire({
      title: 'Ingrese el correo o codigo del estudiante',
      input: 'text',
      inputPlaceholder: 'ingrese el codigo o correo estudiantil'
    })

    if (datoStudent) {
      Swal.fire(`Dato del estudiante: ${datoStudent}`)
    }

  }

  return <>
    <div className='headCursoDocente'>
      <button onClick={() => {
        props.setCurso(false, [])
      }}><ion-icon name="arrow-back"></ion-icon></button>
    </div>
    <div className='contCurso'>
      <div className='curso'>
        <div className='contInfoCurso'>
          <div className='iconCurso'></div>
          <div className='infoCurso'>
            <button className='deleteCurso'><ion-icon name="trash"></ion-icon></button>
            <h1>{props.datos.name ? props.datos.name : 'Nombre Curso'}</h1>
            <h2># Creditos</h2>
            <h2>Descripcion</h2>
            <p></p>
            <div className='contAccionbtn'>
              <button><ion-icon name="pencil"></ion-icon></button>
              <button onClick={() => {
                obtenerRutaCurso()
              }}><ion-icon name="share-social"></ion-icon></button>
            </div>
          </div>
        </div>
        <div className='BodyCurso'>
          <div className='asistencia'>
            <div className='headAsistencia'>
              <h3>Asis. Recientes</h3>
            </div>
            <div className='bodyAsistencia'>
              <p>Nombre estudiante</p>
              <p>Nombre estudiante</p>
              <p>Nombre estudiante</p>
              <p>Nombre estudiante</p>
              <p>Nombre estudiante</p>
              <p>Nombre estudiante</p>
            </div>
          </div>
          <div className='bodyCurso'>
            <div className={activePublicar ? 'headBodyCurso active' : 'headBodyCurso'}>
              <div className='contPublicar'>
                <input type='text' name='publicar' placeholder='¿Que deseas informar?' value={publicar}></input>
                <button><ion-icon name="send-outline"></ion-icon></button>
                <button onClick={() => {
                  setActivePublicar(false)
                }}><ion-icon name="close-outline"></ion-icon></button>
              </div>
              <div className='contOpcionHead'>
                <button onClick={() => {
                  setActivePublicar(true)
                }}>Publicar</button>
                <button onClick={() => {
                  onOffModal()
                }}>Prueba de Asistencia</button>
              </div>
            </div>
            <div className='bodyBodyCurso'>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='contParticipantes'>
      <div className='participantes'>
        <div className='headParticiapante'>
          <h2>Participantes</h2>
          <button onClick={()=> {
            agregarEstudiante()
          }}><ion-icon name="person-add"></ion-icon></button>
        </div>
        <div className='bodyParticipantes'>
        </div>
      </div>
    </div>
    {activeModal()}
  </>
}
