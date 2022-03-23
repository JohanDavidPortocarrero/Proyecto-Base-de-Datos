import React, {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

/* Style */
import '../../Styles/Home/home.css';

/* Context */
import ToggleContext from '../../Context/Toggle/ToggleContext';

/* Components */
import Header from '../General/Header';
import Navegacion from '../General/Navegacion';
import Mantenimineto from '../PagesExtras/Mantenimiento'
import Personal from './Pages/Personal/Personal';
import PageCursos from './Pages/Cursos/PageCursos'
import CursosDocente from './Pages/Cursos/CursosDocente'
import CursoStudens from './Pages/Cursos/CursoStudens'
import UsuariosContext from '../../Context/Usuario/usuariosContext';
export default function Home(props) {

  const { rolpague, subpagina, iddatopague } = useParams();
  const navigate = useNavigate();

  let [pintar, setPintar] = useState(true);

  const userContex = useContext(UsuariosContext)
  const {verificarInicioSecion, datosUsuario} = userContex

  const toggleContext = useContext(ToggleContext);
  const {activeToggle} = toggleContext;

  useEffect(() => {

    const elem = window.localStorage.getItem('usuatioAttendance')
    const dato = elem ? JSON.parse(elem) : null

    if(dato){
      if( rolpague === 'admin' && dato.rol === 'administrador' ){
        setPintar(true)
        verificarInicioSecion()
      } 
      else if( rolpague === 'staff' && dato.rol === 'personal' ){
        setPintar(true)
        verificarInicioSecion()
      } 
      else if( rolpague === 'student' && dato.rol === 'estudiante' ){
        setPintar(true)
        verificarInicioSecion()
      }
      else{
        navigate('/error')
      }
    }

  }, [])

  const navegacionPagues = () => {
    if( rolpague === 'admin' ){
      if( !subpagina ){
        return <Mantenimineto />
      }
      else if( subpagina === 'principal' ){
        return <Mantenimineto />
      }
      else if( subpagina === 'inicio' ){
        return <Mantenimineto />
      }
      else if( subpagina === 'cursos' ){
        return <PageCursos rolpage = {rolpague} />
      }
      else if( subpagina === 'asistencia' ){
        return <Mantenimineto />
      }
      else if( subpagina === 'personal' ){
        return <Personal cargar={false} ver = {'personal'} />
      }
      else if( subpagina === 'estudiantes' ){
        return <Personal cargar={false} ver = {'estudiantes'} />
      }
      else if( subpagina === 'administradores' ){
        return <Personal cargar={false} ver = {'administradores'} />
      }
    } 
    else if( rolpague === 'staff' ){
      if( !subpagina ){
        return <Mantenimineto />
      }
      else if( subpagina === 'principal' ){
        return <Mantenimineto />
      }
      else if( subpagina === 'inicio' ){
        return <Mantenimineto />
      }
      else if( subpagina === 'cursos' ){
        if( !iddatopague ){
          return <PageCursos cargar={false} rolpage = {rolpague} />
        }
        else{
          return <CursosDocente idsubpague={iddatopague} />
        }
      }
      else if( subpagina === 'asistencia' ){
        return <Mantenimineto />
      }
      else if( subpagina === 'estudiantes' ){
        return <Personal ver = {'estudiantes'} />
      }
    } 
    else if( rolpague === 'student' ){
      if( !subpagina ){
        return <Mantenimineto />
      }
      else if( subpagina === 'principal' ){
        return <Mantenimineto />
      }
      else if( subpagina === 'inicio' ){
        return <Mantenimineto />
      }
      else if( subpagina === 'cursos' ){
        if( !iddatopague ){
          return <PageCursos rolpage = {rolpague} />
        }
        else{
          return <CursoStudens idsubpague={iddatopague} />
        }
      }
      else if( subpagina === 'asistencia' ){
        return <Mantenimineto />
      }
      else if( subpagina === 'estudiantes' ){
        return <Personal ver = {'estudiantes'} />
      }
    } 
  }

  return <>
    <div className='bodyHome'>
      <Navegacion />
      <Header />
      <div className={activeToggle ? 'contPages active' : 'contPages'}>
        <div className='contentPag'>
          {
            navegacionPagues()
          }
        </div>
      </div>
    </div>
  </>
}
