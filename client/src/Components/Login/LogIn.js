import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

/* Styles */
import '../../Styles/Login/login.css';

/* Context */

export default function LogIn() {

    const navigate = useNavigate();

    let [credenciales, setCredenciales] = useState({
        usuario: '',
        password: ''
    })

    const handleChange = (e) => {
		setCredenciales({...credenciales,[e.target.name]: e.target.value});
	}

  return (
    <div className='BodyLogin'>
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
                        <label>Nombre de Usuario</label>
                        <input 
                            type='text' 
                            placeholder='NOMBRE DE USUARIO' 
							name='usuario'
							value={credenciales.usuario}
							onChange={handleChange}
                        />
                    </div>
                    <div className='inputPassword'>
                        <div>
                            <ion-icon name="lock-closed"></ion-icon>
                        </div>
                        <label>Password</label>
                        <input 
                            type='text' 
                            placeholder='PASSWORD' 
                            name='password'
							value={credenciales.password}
							onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='contBtn'>
                    <button onClick={() => {
                        navigate("/");
                    }}>LOGIN</button>
                    <button>Did you forget your username or password?</button>
                </div>
            </div>
        </div>
    </div>
  )
}
