import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { autenticarUsuario } from '../../Context/Servicio/Usuarios';

/* Styles */
import '../../Styles/Login/login.css';
import UsuariosContext from '../../Context/Usuario/usuariosContext';

/* Context */

export default function LogIn() {

    const navigate = useNavigate();

    let usersContext = useContext(UsuariosContext);
    let {
        datosUsuario,
        verificarInicioSecion,
        saveAutenticarUsuario
    } = usersContext

    let [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    })

    let [pintar, setPintar] = useState(false);

    useEffect(() => {
        const elem = window.localStorage.getItem('usuatioAttendance')
        const dato = elem ? JSON.parse(elem) : null

        if( dato ){
            setPintar(false)
            if( dato.rol === 'administrador' ){
                navigate("/home/admin");
            }
            else if( dato.rol === 'personal' ){
                navigate("/home/staff");
            }
            else if( dato.rol === 'estudiante' ){
                navigate("/home/student");
            }
        }
        else{
            setPintar(true)
        }
    }, [verificarInicioSecion, datosUsuario, navigate])

    const handleChange = (e) => {
		setCredenciales({...credenciales,[e.target.name]: e.target.value});
	}

    const verificar = () => {
        if( credenciales.email.length > 0 && credenciales.password.length > 0 ){
            Swal.fire({
                title: 'Verificando informacion',
                didOpen: () => {
                    Swal.showLoading()
                    autenticarUsuario(credenciales).then(datos => {
                        if( datos.length > 0 ){
                            Swal.fire({
                                icon: 'success',
                                title: 'Usuarios autenticado',
                                showConfirmButton: false,
                                timer: 3000,
                            }).then(function() {
                                window.localStorage.setItem('usuatioAttendance', JSON.stringify(datos[0]));
                                saveAutenticarUsuario(datos[0])
                                if( datos[0].rol === 'administrador' ){
                                    navigate("/home/admin");
                                }
                                else if( datos[0].rol === 'personal' ){
                                    navigate("/home/staff");
                                }
                                else if( datos[0].rol === 'estudiante' ){
                                    navigate("/home/student");
                                }
                                
                            });
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
            
        }
        else{
            Swal.fire({
                icon: 'warning',
                title: 'Debes completar los campos',
                showConfirmButton: false,
                timer: 3000,
            })
        }
        
    }

  return <>
    {
        !pintar 
        ? <></>
        : <div className='BodyLogin'>
            <div className='contLogin'>
                <div className='botonUni'>
                    <a href='https://www.univalle.edu.co/' target='_parent'>UNIVERSIDAD DEL VALLE</a>
                </div>
                <div className='formLogin'>
                    <h1>INGRESAR</h1>
                    <div className='contForm'>
                        <div className='inputUsername'>
                            <div>
                                <ion-icon name="person"></ion-icon>
                            </div>
                            <label>INCRESE SU EMAIL</label>
                            <input 
                                type='email' 
                                placeholder='EMAIL' 
                                name='email'
                                value={credenciales.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='inputPassword'>
                            <div>
                                <ion-icon name="lock-closed"></ion-icon>
                            </div>
                            <label>Password</label>
                            <input 
                                type='password' 
                                placeholder='PASSWORD' 
                                name='password'
                                value={credenciales.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='contBtn'>
                        <button onClick={() => {
                            verificar()
                            //navigate("/");
                        }}>LOGIN</button>
                        <button>Did you forget your username or password?</button>
                    </div>
                </div>
            </div>
        </div>
    }
  </>
  
}
