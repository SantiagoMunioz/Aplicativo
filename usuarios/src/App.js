import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

//----------Componentes----------//
import {inicio} from './componentes/inicio';
import {login} from "./componentes/login";
import {ListarUsuarios} from './componentes/usuarios';
import {crearUsuario} from "./componentes/usuarios/crearUsuario";
import {EditarUsuario} from "./componentes/usuarios/editarUsuario";
import {ListarEncuestas} from './componentes/encuestas';
import {crearEncuesta} from "./componentes/encuestas/crearEncuestas";
import {EditarEncuesta} from "./componentes/encuestas/editarEncuestas";
import {ListarSecciones} from './componentes/secciones';
import {crearSeccion} from "./componentes/secciones/crearSeccion";
import {EditarSeccion} from "./componentes/secciones/editarSeccion";
import {ListarPreguntas} from './componentes/preguntas';
import {crearPregunta} from "./componentes/preguntas/crearPreguntas";
import {EditarPregunta} from "./componentes/preguntas/editarPreguntas";
import {ListarRespuestas} from './componentes/respuestas';
import {crearRespuesta} from "./componentes/respuestas/crearRespuestas";
import {EditarRespuesta} from "./componentes/respuestas/editarRespuestas";
//----------Fin Componentes------//


//----------Funciones------------//
function App(){
  const isUser = localStorage.getItem('token');

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    window.location.replace("http://localhost:3000/")
    menu=<><li className="nav-item"><Link className="nav-link active" to='/login'> Sesión </Link> </li></>
  }

  let menu='';
  if(isUser){
    menu=<>
      <li className="nav-item"><Link className="nav-link" to='/usuarios'> Usuarios </Link></li>
      <li className="nav-item"><Link className="nav-link" to='/encuestas'> Encuestas </Link></li>
      <li className="nav-item"><Link className="nav-link" to='/secciones'> Secciones </Link></li>
      <li className="nav-item"><Link className="nav-link" to='/preguntas'> Preguntas </Link></li>
      <li className="nav-item"><Link className="nav-link disabled" to='/respuestas'> Respuestas </Link></li>
      <li className="nav-item"><button className="btn" onClick={cerrarSesion}> Cerrar Sesión </button></li>
    </>
  }else{
    menu=<><li className="nav-item"><Link className="nav-link active" to='/login'> Sesión </Link> </li></>
  }

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            {/* <Link className="navbar-brand" to="#">Navbar</Link> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link active" to='/'> Inicio </Link></li>
                {menu}
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path="/usuarios" component={ListarUsuarios}></Route>
          <Route exact path="/usuarios/crear" component={crearUsuario}></Route>
          <Route exact path="/usuarios/editar/:id" component={EditarUsuario}></Route>
          <Route exact path="/encuestas" component={ListarEncuestas}></Route>
          <Route exact path="/encuestas/crear" component={crearEncuesta}></Route>
          <Route exact path="/encuestas/editar/:id" component={EditarEncuesta}></Route>
          <Route exact path="/secciones" component={ListarSecciones}></Route>
          <Route exact path="/secciones/crear" component={crearSeccion}></Route>
          <Route exact path="/secciones/editar/:id" component={EditarSeccion}></Route>
          <Route exact path="/preguntas" component={ListarPreguntas}></Route>
          <Route exact path="/preguntas/crear" component={crearPregunta}></Route>
          <Route exact path="/preguntas/editar/:id" component={EditarPregunta}></Route>
          <Route exact path="/respuestas" component={ListarRespuestas}></Route>
          <Route exact path="/respuestas/crear" component={crearRespuesta}></Route>
          <Route exact path="/respuestas/editar/:id" component={EditarRespuesta}></Route>
          <Route exact path="/" component={inicio}></Route>
          <Route exact path="/login" component={login}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;