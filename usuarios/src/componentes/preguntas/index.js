import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';
import "./preguntas.css";

export const ListarPreguntas = _ => {
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/preguntas', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setPreguntas(response.data);
        });
    }, [setPreguntas]);

    function idPregunta(pregunta){
        return (
            window.location.replace("http://localhost:3000/preguntas/editar/"+ pregunta.id)
        );
    }

    function borrar(pregunta){
        var opcion=window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
        if (opcion){
            axios.delete('http://localhost:5000/preguntas/'+pregunta, {
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
        <div className="pagDataPreg">
            <h1><label>Preguntas</label></h1>
            <h2><li className="list-inline-item"><Link className="btn btn-primary" to="/preguntas/crear">Crear</Link></li></h2>
            <ul>
                <table>
                    <thead>
                        <tr>
                            <th className="id">ID</th><th className="titCampPreg">Pregunta</th>
                            <th className="titSecPreg">ID Seccion</th><th className="titLastPreg">Tipo Pregunta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preguntas.map((pregunta, key) => (
                            <tr key={pregunta.id}>
                                <td className="idPreg">{pregunta.id}{')'}</td>
                                <td className="campPreg">{pregunta.pregunta}</td>
                                <td className="campSecPreg">{pregunta.seccion_id}</td>
                                <td className="campPreg">{pregunta.tipoPregunta}</td>
                                <td><button className="btn btn-primary" onClick={()=>idPregunta(pregunta)}>🖋</button></td>
                                <td><button className="btn btn-danger" onClick={()=>borrar(pregunta.id)}>✖</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
        </div>
    );
}