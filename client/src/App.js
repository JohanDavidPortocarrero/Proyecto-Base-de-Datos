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
import Page404 from "./Components/PagesError/Page404";

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
              <Route path="/" element={<Home active={'Noticias'} />} />
              <Route path="/home" element={<Home active={'Home'} />} />
              <Route path="/cursos" element={<Home active={'Cursos'} />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </ToggleState>
      </UsuarioState>        
    </div>
  );
}

export default App;
