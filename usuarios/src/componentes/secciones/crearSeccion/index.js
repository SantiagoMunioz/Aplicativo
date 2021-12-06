import React from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';

export const crearSeccion = _ => {
    const crear = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            nombres: form.nombre.value,
            encuesta_id: form.encuesta_id.value,
        };

        axios.post('http://localhost:5000/secciones', data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            window.history.back();
        });
    }

    return (
        <div className="pagEditSec">
            <li className="list-inline-item"><Link className="btn btn-primary" to="/secciones">Volver</Link></li>
            <form onSubmit={crear}>
                <input className="nombSec" type="text" placeholder="Nombre" name="nombre"></input>
                <input className="numbEncSec" type="number" placeholder="ID Encuesta" name="encuesta_id"></input>
                <button className="btn btn-success" type="submit">✔</button>
            </form>
        </div>
    )
}