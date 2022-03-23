import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import { ingresarEstudiante, ingresarPersonal, obtenerUsuarios } from '../../../../Context/Servicio/Usuarios'

import '../../../../Styles/Admin/personal.css'
import PageLoadingV1 from '../../../PagesExtras/PageLoadingV1';
import ItemPersonal from './ItemPersonal'

export default function Personal(props) {

    
    let [datos, setDatos] = useState([])
    let [cargando, setCargando] = useState(false)

    const dataUsuarios = () => {
        obtenerUsuarios().then( datos => {
            if( datos ){
                if( props.ver === 'personal' ){
                    setDatos(datos.personal) 
                }
                else if( props.ver === 'estudiantes' ){
                    setDatos(datos.estudiantes)   
                } 
                else if( props.ver === 'administradores' ){
                    setDatos(datos.administradores)  
                }                           
            }
        } )
    }

    const addUsuarios = async () => {
        if( props.ver === 'personal' ){   
            const { value: formValues } = await Swal.fire({
                title: "AGREGAR",
                html:
                  '<input id="swal-input1" type = "text" placeholder="Nombre" class="swal2-input">' +
                  '<input id="swal-input2" type = "email" placeholder="Email" class="swal2-input">'+
                  '<input id="swal-input3" type = "password" placeholder="Password" class="swal2-input">'+
                  '<textarea id="swal-input4" type = "text" placeholder="Descripcion (opcional)" class="swal2-textarea" style="width: 288px;height: 111px;resize: none;"></textarea>',
                focusConfirm: false,
                preConfirm: () => {
                  return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value,
                    document.getElementById("swal-input3").value,
                    document.getElementById("swal-input4").value
                  ];
                },
            });

            if( formValues ){
                if( formValues[0].length > 0 && formValues[1].length > 0 && formValues[2].length > 0){
                    const datosInput = {
                        nombre: formValues[0], 
                        email: formValues[1], 
                        password: formValues[2], 
                        rol: 'personal', 
                        descripcion: formValues[3]
                    }
                    Swal.fire({
                        title: 'AGREGANDO USUARIO',
                        didOpen: () => {
                            Swal.showLoading()
                            ingresarPersonal(datosInput).then(datos => {
                                if( datos ){
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Personal Agregado',
                                        showConfirmButton: false,
                                        timer: 3000,
                                    })
                                }
                                else{
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'el usuario no pudo ser agregado',
                                        showConfirmButton: false,
                                        timer: 3000,
                                    })
                                }
                            })
                        },
                    })
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Debes llenar todos los campos',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                }
                
            }

        }
        else if( props.ver === 'estudiantes' ){
            const { value: formValues } = await Swal.fire({
                title: "AGREGAR",
                html:
                  '<input id="swal-input1" type = "text" placeholder="Codigo Estudiantil" class="swal2-input">' +
                  '<input id="swal-input2" type = "text" placeholder="Nombre" class="swal2-input">' +
                  '<input id="swal-input3" type = "email" placeholder="Email" class="swal2-input">'+
                  '<input id="swal-input4" type = "password" placeholder="Password" class="swal2-input">'+
                  '<textarea id="swal-input5" type = "text" placeholder="Descripcion (opcional)" class="swal2-textarea" style="width: 288px;height: 111px;resize: none;"></textarea>',
                focusConfirm: false,
                preConfirm: () => {
                  return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value,
                    document.getElementById("swal-input3").value,
                    document.getElementById("swal-input4").value,                    
                    document.getElementById("swal-input5").value
                  ];
                },
            });

            if( formValues ){
                if( formValues[0].length > 0 && formValues[1].length > 0 && formValues[2].length > 0 && formValues[3].length > 0){
                    const datosInput = {
                        codigo_estudiante: formValues[0],
                        nombre: formValues[1], 
                        email: formValues[2], 
                        password: formValues[3], 
                        descripcion: formValues[4]
                    }
                    Swal.fire({
                        title: 'AGREGANDO USUARIO',
                        didOpen: () => {
                            Swal.showLoading()
                            ingresarEstudiante(datosInput).then(datos => {
                                if( datos ){
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Estudiante Agregado',
                                        showConfirmButton: false,
                                        timer: 3000,
                                    })
                                }
                                else{
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'el usuario no pudo ser agregado',
                                        showConfirmButton: false,
                                        timer: 3000,
                                    })
                                }
                            })
                        },
                    })
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Debes llenar todos los campos',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                }
                
            }
        } 
        else if( props.ver === 'administradores' ){
            const { value: formValues } = await Swal.fire({
                title: "AGREGAR",
                html:
                  '<input id="swal-input1" type = "text" placeholder="Nombre" class="swal2-input">' +
                  '<input id="swal-input2" type = "email" placeholder="Email" class="swal2-input">'+
                  '<input id="swal-input3" type = "password" placeholder="Password" class="swal2-input">'+
                  '<textarea id="swal-input4" type = "text" placeholder="Descripcion (opcional)" class="swal2-textarea" style="width: 288px;height: 111px;resize: none;"></textarea>',
                focusConfirm: false,
                preConfirm: () => {
                  return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value,
                    document.getElementById("swal-input3").value,
                    document.getElementById("swal-input4").value
                  ];
                },
            });

            if( formValues ){
                if( formValues[0].length > 0 && formValues[1].length > 0 && formValues[2].length > 0){
                    const datosInput = {
                        nombre: formValues[0], 
                        email: formValues[1], 
                        password: formValues[2], 
                        rol: 'administrador', 
                        descripcion: formValues[3]
                    }
                    Swal.fire({
                        title: 'AGREGANDO USUARIO',
                        didOpen: () => {
                            Swal.showLoading()
                            ingresarPersonal(datosInput).then(datos => {
                                if( datos ){
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Administrador Agregado',
                                        showConfirmButton: false,
                                        timer: 3000,
                                    })
                                }
                                else{
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'el usuario no pudo ser agregado',
                                        showConfirmButton: false,
                                        timer: 3000,
                                    })
                                }
                            })
                        },
                    })
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Debes llenar todos los campos',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                }
                
            }
        } 
    }

    useEffect(() => {
        dataUsuarios()           
    })

  return (
    <div className='AdminBodyPersonal'>
        <div className='headPersonal'>
            <h1>{ props.ver === 'personal' 
                ? 'PERSONAL UNIVERSITARIO'
                : props.ver === 'estudiantes'
                ? 'ESTUDIANTES'
                : props.ver === 'administradores'
                ? 'ADMINISTRADORES'
                : ''}</h1>
        </div>
        <div className='bodyPersonal'>
            <div className='contPersonal'>
                <div className='contentListPerosnal'>
                    { cargando 
                        ? <PageLoadingV1 />
                        :datos ? datos.map( personal => {
                            return <ItemPersonal key={personal.identificacion} dato = {personal} />
                        } )
                        :<></>
                    }
                </div>
                <div className='contBtn'>
                    <button onClick={dataUsuarios}>actualizar</button>
                    <button onClick={addUsuarios}>ADD</button>
                </div>
            </div>
        </div>
    </div>
  )
}
