import React from 'react';
import { Link } from 'react-router-dom';

export const inicio = _ => {
    const isUser = localStorage.getItem('token');
    let boton = '';
    if(!isUser){
        boton=<><h2><li className="list-inline-item"><Link className="btn btn-primary" to="/login">Login</Link></li></h2></>
    }

    return (
        <div>
            <h1>Menu principal</h1>
            {boton}
        </div>
    );
}