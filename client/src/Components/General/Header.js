import React, { useContext, useEffect } from 'react'

/* Styles */
import '../../Styles/General/header.css';

/* Imagenes Test */
import defaul from '../../Assets/defaulAvatar.png';

/* Context */
import ToggleContext from '../../Context/Toggle/ToggleContext';
import UsuariosContext from '../../Context/Usuario/usuariosContext';

export default function Header() {

    const userContext = useContext(UsuariosContext)
    const {verificarInicioSecion, datosUsuario} = userContext

    useEffect(() => {
        verificarInicioSecion()
    }, [])

    const toggleContext = useContext(ToggleContext);
    const {onOffToggle} = toggleContext;

  return (
    <div className='bodyHeader'>
        <div className='contBtnToggle'>
            <button onClick={() => onOffToggle()}>
                <ion-icon name="menu"></ion-icon>
            </button>
        </div>
        <div className='contNameAvatar'>
            <h1>{ datosUsuario ? datosUsuario.nombre.toUpperCase() : 'NOMBRE DEL USUARIOS'}</h1>
            <div className='contAvatar'>
                <img src={defaul} alt='../' />
            </div>
        </div>
    </div>
  )
}
