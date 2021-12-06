import React from 'react';
import axios from 'axios';
import {NavLink,} from 'react-router-dom';

export const crearRespuesta = _ => {
    const crear = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            respuesta: form.respuesta.value,
            usuario_id: form.usuario_id.value,
            pregunta_id: form.pregunta_id.value,
        };

        axios.post('http://localhost:5000/respuestas', data).then((response)=>{
            window.history.back();
        });
    }

    return (
        <div>
            <li><NavLink to="/respuestas">Volver</NavLink></li>
            <form onSubmit={crear}>
                <input type="text" placeholder="Respuesta" name="respuesta"></input>
                <input type="number" placeholder="ID Usuario" name="usuario_id"></input>
                <input type="number" placeholder="ID Pregunta" name="pregunta_id"></input>
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}