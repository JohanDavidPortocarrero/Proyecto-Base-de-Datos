import React, { useContext } from 'react'
import {Link} from "react-router-dom";

/* Styles */
import '../../Styles/General/navegacion.css';

/* Context */
import ToggleContext from '../../Context/Toggle/ToggleContext';

export default function Navegacion() {

    const toggleContext = useContext(ToggleContext);
    const {activeToggle} = toggleContext;

  return (
    <div className={activeToggle ? 'bodyNavegacion active' : 'bodyNavegacion'} >
        <ul>
            <li>
                <Link to='/' className='link'>
                    <div className='icon'>
                        <ion-icon name="newspaper"></ion-icon>
                    </div>
                    <span>NOTICIAS</span>
                </Link>
            </li>
            <li>
                <Link to='/home' className='link'>
                    <div className='icon'>
                        <ion-icon name="home"></ion-icon>
                    </div>
                    <span>HOME</span>
                </Link>
            </li>
            <li>
                <Link to='/cursos' className='link'>
                    <div className='icon'>
                        <ion-icon name="library"></ion-icon>
                    </div>
                    <span>CURSOS</span>
                </Link>
            </li>
            <li>
                <Link to='/login' className='link'>
                    <div className='icon'>
                        <ion-icon name="log-out"></ion-icon>
                    </div>
                    <span>LOG OUT</span>
                </Link>
            </li>
        </ul>
    </div>
  )
}
