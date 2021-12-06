import React from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';

export const crearPregunta = _ => {

    var msgAviso = ""

    const crear = (event) =>{
        event.preventDefault();
        const form = event.target;
        // if(!form.pregunta.value || !form.seccion_id.value){
        //     msgAviso = "¡Por favor, complete todos los campos!"
        // }else{
        //     const data = {
        //         pregunta: form.pregunta.value,
        //         seccion_id: form.seccion_id.value,
        //         tipoPregunta: form.tipoPregunta.value,
        //     }

        //     axios.post('http://localhost:5000/preguntas', data).then((response)=>{
        //         window.history.back();
        //     });
        // };
        const data = {
            pregunta: form.pregunta.value,
            seccion_id: form.seccion_id.value,
            tipoPregunta: form.tipoPregunta.value,
        }

        axios.post('http://localhost:5000/preguntas', data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            window.history.back();
        });
    }

    return (
        <div className="pagEditPreg">
            <div className="cabeEditPreg">
                <h1 className="titEditPreg">Crear</h1>
                <h1 className="linkEditPreg">
                    <li className="list-inline-item"><Link className="btn btn-primary" to="/preguntas">Volver</Link></li>
                </h1>
            </div>
            <form onSubmit={crear}>
                <div className="divSelPreg">
                    <select className="selectTipoPreg" type="text" name="tipoPregunta">
                        <option selected calue="">Seleccionar Tipo...</option>
                        <option value="Abierta">Abierta</option>
                        <option value="Cerrada">Cerrada</option>
                        <option value="Multiple">Multiple</option>
                        <option value="Multiple Unica Respuesta">Multiple Unica Respuesta</option>
                    </select>
                    <input className="numbSecPreg" type="number" placeholder="ID Seccion" name="seccion_id"></input>
                    <textarea className="nombPreg" type="text" placeholder="Pregunta" name="pregunta" rows={6} cols={64} ></textarea>
                    <button className="btn btn-success" type="submit">✔</button>
                </div>
                <label className="labelAviso" name="aviso">{msgAviso}</label>
            </form>
        </div>
    )
}