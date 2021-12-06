import React from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';

export const crearEncuesta = _ => {
    const crear = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            nombre: form.nombre.value,
            usuario_id: form.usuario_id.value,
            descripcion: form.descripcion.value,
        };

        axios.post('http://localhost:5000/encuestas', data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            window.history.back();
        });
    }

    return (
        <div className="pagEditEnc">
            <li className="list-inline-item"><Link className="btn btn-primary" to="/usuarios">Volver</Link></li>
            <form onSubmit={crear}>
                <input className="nameText" type="text" placeholder="Nombre" name="nombre"></input>
                <input className="numbUsuEnc" type="number" placeholder="ID Usuario" name="usuario_id"></input>
                <input className="descText" type="text" placeholder="Descripcion" name="descripcion"></input>
                <button className="btn btn-success" type="submit">✔</button>
            </form>
        </div>
    )
}