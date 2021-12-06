import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {NavLink,} from 'react-router-dom';

export const ListarRespuestas = _ => {
    const [respuestas, setRespuestas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/respuestas', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setRespuestas(response.data);
        });
    }, [setRespuestas]);

    function idRespuesta(respuesta){
        return (
            window.location.replace("http://localhost:3000/respuestas/editar/"+ respuesta.id)
        );
    }

    function borrar(respuesta){
        var opcion=window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
        if (opcion){
            axios.delete('http://localhost:5000/respuestas/'+respuesta, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            .then(response =>{
                window.location.reload()
            })
        }
    }

    return (
        <div className="paginaData">
            <li>Respuestas → |<NavLink to="/respuestas/crear">Crear</NavLink></li>
            <ul>
                <table className="tabla">
                    <thead>
                        <tr>
                            <th className="id">ID</th><th className="tituloCamp">Respuesta</th>
                            <th className="tituloCamp">ID Usuario</th><th className="tituloUlt">ID Pregunta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {respuestas.map((respuesta, key) => (
                            <tr key={respuesta.id}>
                                <td className="id">{respuesta.id}{')'}</td>
                                <td className="campo">{respuesta.respuesta}</td>
                                <td className="campo">{respuesta.usuario_id}</td>
                                <td className="campo">{respuesta.pregunta_id}</td>
                                <td><button className="btnEdit" onClick={()=>idRespuesta(respuesta)}>🖊</button></td>
                                <td><button className="btnDelete" onClick={()=>borrar(respuesta.id)}>❌</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
        </div>
    );
}