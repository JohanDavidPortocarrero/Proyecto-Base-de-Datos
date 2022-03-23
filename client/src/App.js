import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* Styles */
import './Styles/App.css';

/* Componentes */
import LogIn from './Components/Login/LogIn';
import Home from './Components/Home/Home';
import Page404 from "./Components/PagesExtras/Page404";
import Clases from './Components/Clases/Clases'

/* State */
import ToggleState from './Context/Toggle/ToggleState';
import UsuarioState from './Context/Usuario/usuariosState';

function App() {
  return (
    <div className="App">
      <UsuarioState>
        <ToggleState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/home/:rolpague/" element={<Home />} />
              <Route path="/home/:rolpague/:subpagina/" element={<Home />} />
              <Route path="/home/:rolpague/:subpagina/:iddatopague" element={<Home />} />                                 
              <Route path="/clases/:rolpage/:idCurso/:extra" element={<Clases />} />
              <Route path="/error/" element={<Page404 />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </ToggleState>
      </UsuarioState>        
    </div>
  );
}

export default App;
