import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';
import "./encuestas.css"

export const ListarEncuestas = _ => {
    const [encuestas, setEncuestas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/encuestas').then((response)=>{
            setEncuestas(response.data);
        });
    }, [setEncuestas]);

    function idEncuesta(encuesta){
        return (
            window.location.replace("http://localhost:3000/encuestas/editar/"+ encuesta.id)
        );
    }

    function borrar(encuesta){
        var opcion=window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
        if (opcion){
            axios.delete('http://localhost:5000/encuestas/'+encuesta, {
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
        <div className="pagEncData">
            <h1><label>Encuestas</label></h1>
            <h1><li className="list-inline-item"><Link className="btn btn-primary" to="/encuestas/crear">Crear</Link></li></h1>
            <ul>
                <table>
                    <thead>
                        <tr>
                            <th className="id">ID</th><th className="titCampEnc">Nombre</th>
                            <th className="titCampEncUsu">Usuario</th><th className="titLastEnc">Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encuestas.map((encuesta, key) => (
                            <tr key={encuesta.id}>
                                <td className="idEnc">{encuesta.id}</td>
                                <td className="campEnc">{encuesta.nombre}</td>
                                <td className="campEncUsu">{encuesta.usuario_id}</td>
                                <td className="campEnc">{encuesta.descripcion}</td>
                                <td><button className="btn btn-primary" onClick={()=>idEncuesta(encuesta)}>🖋</button></td>
                                <td><button className="btn btn-danger" onClick={()=>borrar(encuesta.id)}>✖</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
        </div>
    );
}