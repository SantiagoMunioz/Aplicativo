import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

export const EditarUsuario = _ =>{
    const [usuarios, setUsuarios] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:5000/usuarios/'+id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setUsuarios(response.data);
        });
    }, [id]);

    const handleInputChange = (event) => {
        setUsuarios({
            ...usuarios,
            [event.target.name] : event.target.value
        })
    }

    const editar = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            nombres: form.nombres.value,
            email: form.email.value,
            contrasena: form.contrasena.value,
        };

        axios.put('http://localhost:5000/usuarios/'+id, data).then((response)=>{
            window.location.replace('http://localhost:3000/usuarios');
        });
    }

    return (
        <div className="paginaEditUsu">
            <li className="list-inline-item"><Link className="btn btn-primary" to="/usuarios">Volver</Link></li>
            <form onSubmit={editar} key={usuarios.id}>
                <input className="nombUsu" type="text" value={usuarios.nombres} name="nombres" onChange={handleInputChange}></input>
                <input className="emailUsu" type="email" value={usuarios.email} name="email" onChange={handleInputChange}></input>
                <input className="passUsu" type="password" value={usuarios.contrasena} name="contrasena" onChange={handleInputChange}></input>
                <button className="btn btn-success" type="submit">✔</button>
            </form>
        </div>
    );
}