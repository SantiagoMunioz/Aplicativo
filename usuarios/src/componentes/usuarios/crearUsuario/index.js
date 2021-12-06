import React from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';

export const crearUsuario = _ => {
    const crearUsuario = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            nombres: form.nombres.value,
            email: form.email.value,
            contrasena: form.contrasena.value,
        };

        axios.post('http://localhost:5000/usuarios', data).then((response)=>{
            window.history.back();
        });
    }

    return (
        <div className="paginaEditUsu">
            <li className="list-inline-item"><Link className="btn btn-primary" to="/usuarios">Volver</Link></li>
            <form onSubmit={crearUsuario}>
                <input className="nombUsu" type="text" placeholder="Nombres" name="nombres"></input>
                <input className="emailUsu" type="email" placeholder="Email" name="email"></input>
                <input className="passUsu" type="password" placeholder="Contraseña" name="contrasena"></input>
                <button className="btn btn-success" type="submit">✔</button>
            </form>
        </div>
    )
}