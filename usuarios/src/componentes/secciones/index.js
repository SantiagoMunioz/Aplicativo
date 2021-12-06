import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';
import "./secciones.css"

export const ListarSecciones = _ => {
    const [secciones, setSecciones] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/secciones', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setSecciones(response.data);
        });
    }, [setSecciones]);

    function idSeccion(seccion){
        return (
            window.location.replace("http://localhost:3000/secciones/editar/"+ seccion.id)
        );
    }

    function borrar(seccion){
        var opcion=window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
        if (opcion){
            axios.delete('http://localhost:5000/secciones/'+seccion, {
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
        <div className="pagDataSec">
            <h1><label>Secciones</label></h1>
            <h1><li className="list-inline-item"><Link className="btn btn-primary" to="/secciones/crear">Crear</Link></li></h1>
            <ul>
                <table>
                    <thead>
                        <tr><th className="id">ID</th><th className="titCampSec">Nombre</th><th className="titLastSec">ID Encuesta</th></tr>
                    </thead>
                    <tbody>
                        {secciones.map((seccion, key) => (
                            <tr key={seccion.id}>
                                <td className="idSec">{seccion.id}</td>
                                <td className="campSec">{seccion.nombre}</td>
                                <td className="campSec">{seccion.encuesta_id}</td>
                                <td><button className="btn btn-primary" onClick={()=>idSeccion(seccion)}>🖊</button></td>
                                <td><button className="btn btn-danger" onClick={()=>borrar(seccion.id)}>✖</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
        </div>
    );
}