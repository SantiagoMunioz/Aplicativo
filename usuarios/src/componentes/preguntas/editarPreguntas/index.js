import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

export const EditarPregunta = _ =>{
    const [preguntas, setPregunta] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:5000/preguntas/'+id).then((response)=>{
            setPregunta(response.data);
        });
    }, [id]);

    const handleInChange = (event) => {
        setPregunta({
            ...preguntas,
            [event.target.name] : event.target.value
        })
    }

    const editar = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            pregunta: form.pregunta.value,
            seccion_id: form.seccion_id.value,
            tipoPregunta: form.tipoPregunta.value,
        };

        axios.put('http://localhost:5000/preguntas/'+id, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            window.location.replace('http://localhost:3000/preguntas');
        });
    }

    return (
        <div className="pagEditPreg">
            <div className="cabeEditPreg">
                <h1 className="titEditPreg">Editar</h1>
                <h1 className="linkEditPreg">
                    <li className="list-inline-item"><Link className="btn btn-primary" to="/preguntas">←</Link></li>
                </h1>
            </div>
            <form onSubmit={editar} key={preguntas.id}>
                <div className="divSelPreg">
                    <select className="selectTipoPreg" type="text" value={preguntas.tipoPregunta} onChange={handleInChange} name="tipoPregunta">
                        <option value="Abierta">Abierta</option>
                        <option value="Cerrada">Cerrada</option>
                        <option value="Multiple">Multiple</option>
                        <option value="Multiple Unica Respuesta">Multiple Unica Respuesta</option>
                    </select>
                    <input className="numbSecPreg" type="number" value={preguntas.seccion_id} onChange={handleInChange} name="seccion_id"></input>
                    <textarea className="nombPreg" type="text" placeholder="Pregunta" name="pregunta" rows={6} cols={64} ></textarea>
                    <button className="btn btn-success" type="submit">✔</button>
                </div>
            </form>
        </div>
    );
}