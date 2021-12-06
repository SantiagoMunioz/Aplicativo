import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {NavLink, useParams} from 'react-router-dom';

export const EditarRespuesta = _ =>{
    const [respuestas, setRespuestas] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:5000/respuestas/'+id).then((response)=>{
            setRespuestas(response.data);
        });
    }, [id]);

    const editar = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            respuesta: form.respuesta.value,
            usuario_id: form.usuario_id.value,
            pregunta_id: form.pregunta_id.value,
        };

        axios.put('http://localhost:5000/respuestas/'+id, data).then((response)=>{
            window.location.replace('http://localhost:3000/respuestas');
        });
    }

    return (
        <div>
            <li><NavLink to="/respuestas">Volver</NavLink></li>
            <ul>
                <table>
                    <tbody>
                        <tr key={respuestas.id}>
                            <td>|</td><td>{respuestas.id}{')'}</td>
                            <td>|</td><td>{respuestas.respuesta}</td>
                            <td>|</td><td>{respuestas.usuario_id}</td>
                            <td>|</td><td>{respuestas.pregunta_id}</td><td>|</td>
                        </tr>
                    </tbody>
                </table>
            </ul>
            <form onSubmit={editar}>
                <input type="text" placeholder={respuestas.respuesta} name="respuesta"></input>
                <input type="number" placeholder={respuestas.usuario_id} name="usuario_id"></input>
                <input type="number" placeholder={respuestas.pregunta_id} name="pregunta_id"></input>
                <button type="submit">Editar</button>
            </form>
        </div>
    );
}