import React, {useContext} from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* Style */
import '../../Styles/Home/home.css';

/* Context */
import ToggleContext from '../../Context/Toggle/ToggleContext';

/* Components */
import Header from '../General/Header';
import Navegacion from '../General/Navegacion';
import PageCursos from './PageCursos';
import Mantenimiento from '../PagesError/Mantenimiento';

export default function Home(props) {

  const toggleContext = useContext(ToggleContext);
  const {activeToggle} = toggleContext;

  return (
    <div className='bodyHome'>
        <Navegacion />
        <Header />
        <div className={activeToggle ? 'contPages active' : 'contPages'}>
          <div className='contentPag'>
            {
              props.active === 'Home' 
              ? <Mantenimiento />
              : props.active === 'Noticias'
                ? <Mantenimiento />
                : props.active === 'Cursos'
                  ? <PageCursos />
                  : <h1>Enlace no encontrado</h1>
            }
          </div>
          
        </div>
        
    </div>
  )
}
