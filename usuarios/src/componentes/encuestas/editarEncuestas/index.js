import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

export const EditarEncuesta = _ =>{
    const [encuestas, setEncuestas] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:5000/encuestas/'+id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setEncuestas(response.data);
        });
    }, [id]);

    const handleInChange = (event) => {
        setEncuestas({
            ...encuestas,
            [event.target.name] : event.target.value
        })
    }
    
    const editar = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            nombre: form.nombre.value,
            usuario_id: form.usuario_id.value,
            descripcion: form.descripcion.value,
        };

        axios.put('http://localhost:5000/encuestas/'+id, data).then((response)=>{
            window.location.replace('http://localhost:3000/encuestas');
        });
    }

    return (
        <div className="pagEditEnc">
            <li className="list-inline-item"><Link className="btn btn-primary" to="/encuestas">Volver</Link></li>
            <form onSubmit={editar} key={encuestas.id}>
                <input className="nameText" type="text" value={encuestas.nombre} name="nombre" onChange={handleInChange}></input>
                <input className="numbUsuEnc" type="number" value={encuestas.usuario_id} name="usuario_id" onChange={handleInChange}></input>
                <input className="descText" type="text" value={encuestas.descripcion} name="descripcion" onChange={handleInChange}></input>
                <button className="btn btn-success" type="submit">✔</button>
            </form>
        </div>
    );
}