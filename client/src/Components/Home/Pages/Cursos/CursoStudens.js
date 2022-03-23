import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import '../../../../Styles/Home/cursosStudents.css';
import {obtenerCurso, obtenerinscritosCurso, obtenerPruebasCurso} from '../../../../Context/Servicio/Cursos'

import ItemParticipante from './ItemParticipante';
import { obtenerUsuario } from '../../../../Context/Servicio/Usuarios';

import imgDefaultCurso from '../../../../Assets/defaultFondoCursos.png'
import imgDefaultDoc from '../../../../Assets/defaulAvatar.png'

export default function CursoStudens(props) {

  const navigate = useNavigate();

  let [publicar, setPublicar] = useState('')
  let [activePublicar, setActivePublicar] = useState(false)
  let [curso, setCurso] = useState(null)
  let [docente, setDocente] = useState(null)
  let [student, setStudent] = useState([])
  let [pruebas, setPruebas] = useState(null)

  const getCurso = async () => {
    obtenerCurso(props.idsubpague).then( dato => {
      if( dato.length > 0 ){
        setCurso(dato[0])
        obtenerUsuario(dato[0].id_usuarios).then( doc => {
          if( doc ){
            setDocente(doc)
          }
        } )
      }
    } )
  }

  const getEstudiantesInscritos = () => {
    obtenerinscritosCurso(props.idsubpague).then( datos => {
      if( datos.length > 0 ){
        setStudent(datos[0].estudiantes)
      }
    } )
  }

  const getPruebaCurso = () => {
    obtenerPruebasCurso(props.idsubpague).then( prueba => {
      if( prueba.nombre_prueba ){
        setPruebas(prueba)
      }
      console.log(pruebas)
    } )
  }

  useEffect(() => {
    getCurso()
    getEstudiantesInscritos()
    getPruebaCurso()
  }, [])

  const onChange = (e) => {
    setPublicar(e.target.value)
  }

  return <div className='cursoStudentBody'>
    <div className='headCursoStudent'>
      <button onClick={() => {
        navigate('/home/student/cursos')
      }}><ion-icon name="arrow-back"></ion-icon></button>
    </div>
    <div className='contentCursoParticipanteStudent'>
      <div className='contCurso'>
        <div className='curso'>
          { docente 
            ?<div className='infoDocente'>
                <div className='contIcon'>
                  <img src={imgDefaultDoc} alt='../' />
                </div>
                <div className='contInfo'>
                  <h2>{docente.nombre}</h2>
                  <h3>{docente.email}</h3>
                  <h3>DESCRIPCION</h3>
                  <p>{docente.descripcion}</p>
                </div>
              </div>
              : <>
                <h1>Sin docente asignado</h1>
              </>  
          }     
          {curso 
            ?<div className='infoCursoStudent'>
              <div className='contInfo'>
                <h2>{curso.nombre_c ? curso.nombre_c : 'Nombre Del Curso' }</h2>
                <h3># Creditos</h3>
                <p>{curso.creditos}</p>
                <h3>DESCRIPCION</h3>
                <p>{curso.descripcion}</p>
              </div>
              <div className='contIcon'>
                <img src={imgDefaultCurso} alt='../' />
              </div>
            </div>
            : <></>}
          <div className='contBodyCursoStudent'>
            <div className={activePublicar ? 'contHeadCS active' : 'contHeadCS'}>
              <div className='contPublicar'>
                <input 
                  type='text' 
                  name='publicar' 
                  placeholder='¿Que deseas preguntar?' 
                  value={publicar}
                  onChange={onChange}
                ></input>
                <button><ion-icon name="send-outline"></ion-icon></button>
                <button onClick={() => {
                  setActivePublicar(false)
                }}><ion-icon name="close-outline"></ion-icon></button>
              </div>
              <div className='contBtnHeadCS'>
                <button onClick={() => {
                  setActivePublicar(true)
                }}>PUBLICAR</button>
                <button onClick={() => {
                  if( pruebas != null ){
                    navigate('/clases/student/'+curso.id_cursos+'/'+curso.nombre_c)
                  }
                  else{
                    navigate('/clases/student/'+curso.id_cursos+'/meeting/')
                  }                  
                }}>ASISTIR A CLASES</button>
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
            {
              student
              ? student.map( stud => {
                return <ItemParticipante key={stud.identificacion} dato={stud} />
              } )
              : <></>
            }
          </div>
        </div>
      </div>
    </div>
    
  </div>
}

