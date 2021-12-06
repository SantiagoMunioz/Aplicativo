import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';
import './usuarios.css';

export const ListarUsuarios = _ => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/usuarios', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setUsuarios(response.data);
        });
    }, [setUsuarios]);

    function idUser(usuario){
        return (
            window.location.replace("http://localhost:3000/usuarios/editar/"+ usuario.id)
        );
    }

    function borrar(usuario){
        var opcion=window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
        if (opcion){
            axios.delete('http://localhost:5000/usuarios/'+usuario, {
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
        <div className="paginaDataUsu">
            <h1><label>Usuarios</label></h1>
            <h1><li className="list-inline-item"><Link className="btn btn-primary" to="/usuarios/crear">Crear</Link></li></h1>
            <ul>
                <table>
                    <thead>
                        <tr><th className="id">ID</th><th className="titCampUsu">Nombres</th><th className="titLastUsu">Email</th></tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, key) => (
                            <tr key={usuario.id}>
                                <td className="idUsu">{usuario.id}</td>
                                <td className="campUsu">{usuario.nombres}</td>
                                <td className="campUsu">{usuario.email}</td>
                                <td><button className="btn btn-primary" onClick={()=>idUser(usuario)}>🖊</button></td>
                                <td><button className="btn btn-danger" onClick={()=>borrar(usuario.id)}>✖</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
        </div>
    );
}