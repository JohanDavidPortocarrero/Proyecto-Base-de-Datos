import React, { useContext, useEffect } from 'react'
import Swal from 'sweetalert2';
import {Link, useNavigate} from "react-router-dom";

/* Styles */
import '../../Styles/General/navegacion.css';

/* Context */
import ToggleContext from '../../Context/Toggle/ToggleContext';
import UsuariosContext from '../../Context/Usuario/usuariosContext';

export default function Navegacion() {

    const navigate = useNavigate();

    const userContext = useContext(UsuariosContext)
    const {cerrarSecion, verificarInicioSecion, datosUsuario} = userContext

    const toggleContext = useContext(ToggleContext);
    const {activeToggle} = toggleContext;

    useEffect(() => {
        const elem = window.localStorage.getItem('usuatioAttendance')
        const dato = elem ? JSON.parse(elem) : null

        if( !dato ){
            Swal.fire({
                icon: 'error',
                title: 'El usuario no existe',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                navigate("/login");
            })            
        }
        else{
            verificarInicioSecion()
        }
        
    }, [])

    const toggle = () => {
        if( datosUsuario ){
            if( datosUsuario.rol === 'administrador' ){
                return <ul>
                    <li>
                        <Link to='/home/admin/principal' className='link'>
                            <div className='icon'>
                                <ion-icon name="newspaper"></ion-icon>
                            </div>
                            <span>NOTICIAS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/admin/inicio' className='link'>
                            <div className='icon'>
                                <ion-icon name="home"></ion-icon>
                            </div>
                            <span>HOME</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/admin/cursos' className='link'>
                            <div className='icon'>
                                <ion-icon name="library"></ion-icon>
                            </div>
                            <span>CURSOS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/admin/asistencia' className='link'>
                            <div className='icon'>
                                <ion-icon name="albums"></ion-icon>
                            </div>
                            <span>ASISTENCIAS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/admin/administradores' className='link'>
                            <div className='icon'>
                                <ion-icon name="people-circle"></ion-icon>
                            </div>
                            <span style={{fontSize: '15px'}}>ADMINISTRADORES</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/admin/personal' className='link'>
                            <div className='icon'>
                                <ion-icon name="briefcase"></ion-icon>
                            </div>
                            <span>PERSONAL</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/admin/estudiantes' className='link'>
                            <div className='icon'>
                                <ion-icon name="people"></ion-icon>
                            </div>
                            <span>ESTUDIANTES</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => {
                            Swal.fire({
                                title: 'CERRANDO SESION',
                                timer: 1000,
                                timerProgressBar: true,
                                didOpen: () => {
                                    Swal.showLoading()
                                }
                            }).then(() => {
                                cerrarSecion()
                                navigate("/login");
                            })
                        }} className='link'>
                            <div className='icon'>
                                <ion-icon name="log-out"></ion-icon>
                            </div>
                            <span>LOG OUT</span>
                        </button>
                    </li>
                </ul>
            }
            else if( datosUsuario.rol === 'personal' ){
                return <ul>
                    <li>
                        <Link to='/home/staff/principal' className='link'>
                            <div className='icon'>
                                <ion-icon name="newspaper"></ion-icon>
                            </div>
                            <span>NOTICIAS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/staff/inicio' className='link'>
                            <div className='icon'>
                                <ion-icon name="home"></ion-icon>
                            </div>
                            <span>HOME</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/staff/cursos' className='link'>
                            <div className='icon'>
                                <ion-icon name="library"></ion-icon>
                            </div>
                            <span>CURSOS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/staff/asistencia' className='link'>
                            <div className='icon'>
                                <ion-icon name="albums"></ion-icon>
                            </div>
                            <span>ASISTENCIAS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/staff/estudiantes' className='link'>
                            <div className='icon'>
                                <ion-icon name="briefcase"></ion-icon>
                            </div>
                            <span>ESTUDIANTES</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => {
                            Swal.fire({
                                title: 'CERRANDO SESION',
                                timer: 1000,
                                timerProgressBar: true,
                                didOpen: () => {
                                    Swal.showLoading()
                                }
                            }).then(() => {
                                cerrarSecion()
                                navigate("/login");
                            })
                        }} className='link'>
                            <div className='icon'>
                                <ion-icon name="log-out"></ion-icon>
                            </div>
                            <span>LOG OUT</span>
                        </button>
                    </li>
                </ul>
            }
            else if( datosUsuario.rol === 'estudiante' ){
                return <ul>
                    <li>
                        <Link to='/home/student/principal' className='link'>
                            <div className='icon'>
                                <ion-icon name="newspaper"></ion-icon>
                            </div>
                            <span>NOTICIAS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/student/inicio' className='link'>
                            <div className='icon'>
                                <ion-icon name="home"></ion-icon>
                            </div>
                            <span>HOME</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/student/asistencia' className='link'>
                            <div className='icon'>
                                <ion-icon name="albums"></ion-icon>
                            </div>
                            <span>ASISTENCIAS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/home/student/cursos' className='link'>
                            <div className='icon'>
                                <ion-icon name="library"></ion-icon>
                            </div>
                            <span>CURSOS</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => {
                            Swal.fire({
                                title: 'CERRANDO SESION',
                                timer: 1000,
                                timerProgressBar: true,
                                didOpen: () => {
                                    Swal.showLoading()
                                }
                            }).then(() => {
                                cerrarSecion()
                                navigate("/login");
                            })
                        }} className='link'>
                            <div className='icon'>
                                <ion-icon name="log-out"></ion-icon>
                            </div>
                            <span>LOG OUT</span>
                        </button>
                    </li>
                </ul>
            }
        }
    }

  return (
    <div className={activeToggle ? 'bodyNavegacion active' : 'bodyNavegacion'} >
        {
            toggle()
        }
        
    </div>
  )
}
