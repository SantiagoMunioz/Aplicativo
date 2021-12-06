import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

export const EditarSeccion = _ =>{
    const [secciones, setSeccion] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:5000/secciones/'+id).then((response)=>{
            setSeccion(response.data);
        });
    }, [id]);

    const handleInChange = (event) =>{
        setSeccion({
            ...secciones,
            [event.target.name] : event.target.value
        })
    }

    const editar = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            nombre: form.nombre.value,
            encuesta_id: form.encuesta_id.value,
        };

        axios.put('http://localhost:5000/secciones/'+id, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            window.location.replace('http://localhost:3000/secciones');
        });
    }

    return (
        <div className="pagEditSec">
            <li className="list-inline-item"><Link className="btn btn-primary" to="/secciones">Volver</Link></li>
            <form onSubmit={editar} key={secciones.id}>
                <input className="nombSec" type="text" value={secciones.nombre} onChange={handleInChange} name="nombre"></input>
                <input className="numbEncSec" type="number" value={secciones.encuesta_id} onChange={handleInChange} name="encuesta_id"></input>
                <button className="btn btn-success" type="submit">✔</button>
            </form>
        </div>
    );
}