import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

export const login = _ => {
    const isUser = localStorage.getItem('token');
    let menu='';
    let boton='';

    const login = (event) =>{
        event.preventDefault();
        
        const form = event.target;

        const data = {
            email: form.email.value,
            password: form.password.value,
        };

        axios.post('http://localhost:5000/login', data)
        .then((response)=>{
            localStorage.setItem('token', response.data.token)
            //window.location.replace("http://localhost:3000/")
            //console.log(response.data.token)
        });
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        window.location.replace("http://localhost:3000/login")
        menu=<><li className="nav-item"><Link className="nav-link active" to='/login'> Sesión </Link> </li></>
    }

    if(isUser){
        boton=<button className="btn btn-danger" type="button" onClick={cerrarSesion}>Cerrar sesión</button>;
    }

    function volver(){
        return (window.location.replace("http://localhost:3000/"));
    }

    return (
        <div className="pagLogin">
            <h1 className="cabeLog">Login</h1>
            <h2 className="h2Log"><button className="btn btn-primary" onClick={()=>volver()}>volver</button></h2>
            <form onSubmit={login} className="formLog">
                <label className="texto">Email: </label>
                <br/>
                <input className="datosL" type="email" placeholder="correo" name="email"/>
                <br/>
                <br/>
                <label className="texto">Contraseña: </label>
                <br/>
                <input className="datosL" type="password" placeholder="contraseña" name="password"/>
                <br/>
                <br/>
                <li className="list-inline-item"><Link to="/usuarios/crear">Registrarse</Link></li>
                <br/>
                <br/>
                <button className="btn btn-success" type="submit">Ingresar</button>
                <br/>
                <br/>
                {boton}
            </form>
        </div>
    );
}