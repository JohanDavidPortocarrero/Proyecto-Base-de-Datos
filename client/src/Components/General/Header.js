import React, { useContext } from 'react'

/* Styles */
import '../../Styles/General/header.css';

/* Imagenes Test */
import defaul from '../../Assets/defaulAvatar.png';

/* Context */
import ToggleContext from '../../Context/Toggle/ToggleContext';

export default function Header() {

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
            <h1>NOMBRE DEL USUARIOS</h1>
            <div className='contAvatar'>
                <img src={defaul} alt='../' />
            </div>
        </div>
    </div>
  )
}
