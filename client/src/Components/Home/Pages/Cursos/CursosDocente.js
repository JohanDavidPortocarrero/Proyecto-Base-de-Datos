import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { inscribirEstudianteCurso, obtenerCurso, obtenerinscritosCurso } from '../../../../Context/Servicio/Cursos';

import '../../../../Styles/Home/cursoDocente.css';
import ModalPrueba from './ModalPrueba';
import ItemParticipante from './ItemParticipante';
import imgDefault from '../../../../Assets/defaultFondoCursos.png';
import { obtenerUsuarios } from '../../../../Context/Servicio/Usuarios';

export default function CursosDocente(props) {

  const navigate = useNavigate();

  let [modal, setModal] = useState(false);
  let [publicar, setPublicar] = useState('')
  let [activePublicar, setActivePublicar] = useState(false)
  let [student, setStudent] = useState([])
  let [curso, setCurso] = useState({})

  const getCurso = () => {
    if( props.idsubpague ){
      obtenerCurso(props.idsubpague).then( dato => {
        if( dato.length > 0 ){
          setCurso(dato[0])
        }
      } )
    }  
  }

  const getEstudiantesInscritos = () => {
    obtenerinscritosCurso(props.idsubpague).then( datos => {
      if( datos.length > 0 ){
        setStudent(datos[0].estudiantes)
      }
    } )
  }

  const onOffModal = () => {
    setModal(!modal);
  }

  useEffect(() => {
    getCurso()
  }, [])

  useEffect(() => {
    getEstudiantesInscritos()
  })

  const activeModal = () => {
    if( modal ){
      return <ModalPrueba curso = {curso} onOffModal={onOffModal} />
    }
    else {
      return <></>
    }
  }

  const obtenerRutaCurso = () => {

    const ruta = '/clases/curso/'+curso.id_cursos+'/'+curso.nombre_c

    Swal.fire({
      title: 'Enlace a clases',
      text: ruta,
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }

  const onChange = (e) => {
    setPublicar(e.target.value)
  }

  const agregarEstudiante = async () => {
    const { value: datoStudent } = await Swal.fire({
      title: 'Ingrese el codigo del estudiante',
      input: 'text',
      inputPlaceholder: 'ingrese el codigo estudiantil'
    })

    if (datoStudent) {

      Swal.fire({
        title: 'Verificando informacion',
        didOpen: () => {
          Swal.showLoading()
          obtenerUsuarios().then( data => {
            const student = data.estudiantes.filter( student => student.codigo_estudiante === parseInt(datoStudent) )

            if( student.length > 0 ){

              const datosInsert = {
                curso: curso.id_cursos, 
                docente: curso.id_usuarios, 
                estudiante: student[0].identificacion
              }

              inscribirEstudianteCurso(datosInsert).then(datos => {
                console.log( datos )
                  if( datos ){
                    Swal.fire({
                      icon: 'success',
                      title: 'El estudiante fue inscripto',
                      showConfirmButton: false,
                      timer: 3000,
                    })
                  }
                  else{
                    Swal.fire({
                      icon: 'error',
                      title: 'El estudiante no pudo ser inscripto',
                      showConfirmButton: false,
                      timer: 3000,
                    })
                  }
              })
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'El estudiante no esta en el sistema',
                showConfirmButton: false,
                timer: 3000,
              })
            }

          } )
          
        },
      })
    }

  }

  return <div className='cursoDocenteBody'>
    <div className='headCursoDocente'>
      <button onClick={() => {
        navigate('/home/staff/cursos')
      }}><ion-icon name="arrow-back"></ion-icon></button>
    </div>
    <div className='contentCursoParticipante'>
      <div className='contCurso'>
        <div className='curso'>
          <div className='contInfoCurso'>
            <div className='iconCurso'>
              <img src={imgDefault} alt='' />
            </div>
            <div className='infoCurso'>
              <h1>{curso ? curso.nombre_c : 'Nombre Curso'}</h1>
              <h2>Creditos</h2>
              <p>{curso ? curso.creditos : ''}</p>
              <h2>Descripcion</h2>
              <p>{curso ? curso.descripcion : ''}</p>
            </div>
            <div className='contAccionbtn'>
              <button onClick={obtenerRutaCurso}><ion-icon name="share-social"></ion-icon></button>
            </div>
          </div>
          <div className='BodyCurso'>
            <div className='bodyCurso'>
              <div className={activePublicar ? 'headBodyCurso active' : 'headBodyCurso'}>
                <div className='contPublicar'>
                  <input 
                    type='text' 
                    name='publicar' 
                    placeholder='¿Que deseas informar?'
                    value={publicar}
                    onChange={onChange}
                  ></input>
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
                    navigate('/clases/staff/'+curso.id_cursos+'/'+curso.nombre_c)
                  }}>Ir a Clases</button>
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
    
    {activeModal()}
  </div>
}
