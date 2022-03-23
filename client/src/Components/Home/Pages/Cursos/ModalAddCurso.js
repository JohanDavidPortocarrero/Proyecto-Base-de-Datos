import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

import '../../../../Styles/Home/ModalCurso.css'

import { obtenerUsuarios } from '../../../../Context/Servicio/Usuarios';
import { agregarCurso } from '../../../../Context/Servicio/Cursos';

export default function ModalAddCursos(props){

    let [docentes, setDocente] = useState([])
  
    const obtenerDocente = () => {
      obtenerUsuarios().then(datos => {
        if( datos ){
          if( docentes.length < datos.personal.length ){          
            setDocente(datos.personal)
          }        
        }
      })
    }
  
    let [datosForm, setDatosFrom] = useState({
      codigo_curso: '', 
      id_docente: '', 
      nombre: '', 
      creditos: '', 
      descripcion: ''
    })
  
    useEffect(() => {
      obtenerDocente()
    })
  
    const handleChange = (e) => {
      setDatosFrom({...datosForm, [e.target.name]: e.target.value});
    }
  
    const funcAddCurso = () => {
        const datosCurso = {
            codigo_curso: datosForm.codigo_curso, 
            id_docente: parseInt(datosForm.id_docente), 
            nombre: datosForm.nombre, 
            creditos: parseInt(datosForm.creditos), 
            descripcion: datosForm.descripcion
        }
        console.log(datosForm)
        Swal.fire({
            title: 'Verificando informacion',
            didOpen: () => {
                Swal.showLoading()
                agregarCurso(datosCurso).then(datos => {
                    if( datos ){
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuarios autenticado',
                            showConfirmButton: false,
                            timer: 3000,
                        })
                    }
                    else{
                        Swal.fire({
                            icon: 'error',
                            title: 'El usuario no existe',
                            showConfirmButton: false,
                            timer: 3000,
                        })
                    }
                })
            },
        })
        props.activarModal()
    }
  
    return <div className='containerModal'>
      <div className='modalCurso'>
        <div className='contDatos'>
          <input 
            type='text'
            name='codigo_curso'
            value={datosForm.codigo_curso}
            placeholder='CODIGO DEL CURSO'
            required
            onChange={handleChange}
          />
          <input 
            type='text'
            name='nombre'
            value={datosForm.nombre}
            placeholder='NOMBRE'
            required
            onChange={handleChange}
          />
          <select 
            name='id_docente' 
            value={datosForm.id_docente} 
            onChange={handleChange}
          >
            <option value='0'>Seleccione un docente</option>
            {docentes
              ? docentes.map( staff => {
                return <option key={staff.identificacion} value={staff.identificacion}>{staff.nombre}</option>
              } )
              : <option value="">NO HAY OPCINES DISPONIBLES</option>
            }
          </select>
          <input 
            type='text'
            name='creditos'
            value={datosForm.creditos}
            placeholder='CREDITOS'
            required
            onChange={handleChange}
          />
          <textarea
            type='text'
            name='descripcion'
            required
            placeholder='Descripcion (opcional)' 
          />
        </div>        
        <div className='contBtnModal'>
          <button onClick={props.activarModal}>CANCELAR</button>
          <button onClick={funcAddCurso}>AGREGAR</button>
        </div>
      </div>
    </div>
}
