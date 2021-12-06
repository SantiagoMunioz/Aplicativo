from flask import Flask, jsonify, request #se crean servicios web con flask
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import mysql.connector

import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'https://www.example.com',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from Lambda!')
    }

db = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = '1234',
    database = 'usuarios',
    port = 3306
)

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "NtERITiGAVioNOMeaMexANCelialThWA"
jwt = JWTManager(app)

######### LOGIN #########

@app.post('/login')
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    cursor = db.cursor(dictionary=True, buffered=True)

    cursor.execute('SELECT * FROM usuario WHERE email = %s and contrasena = %s', (email, password,))

    usuario = cursor.fetchone()
    
    if not usuario:
        return jsonify({
            "message":"Datos de acceso invalidos"
        })

    token = create_access_token(identity=usuario['id'])

    return jsonify({
        "token": token
    })

@app.route('/')
def index():
    return "Hola mundo"

######### USUARIOS #########

@app.post('/usuarios')
def crearUsuario():
    #request = lo q me envia el cliente
    #response = lo q le voy a responder
    datos = request.json
    
    cursor = db.cursor()

    cursor.execute('''INSERT INTO usuario(nombres, email, contrasena)
        VALUE(%s, %s, %s)''', (
        datos['nombres'],
        datos['email'],
        datos['contrasena'],
    ))

    db.commit()

    return jsonify({
        "mensaje": "Usuario almacenado correctamente"
    })

@app.get('/usuarios')
@jwt_required()
def listarUsuarios():
    usuario = get_jwt_identity()
    print(usuario)
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM usuario')

    usuarios = cursor.fetchall()

    return jsonify(usuarios)

@app.get('/usuarios/<id>')
@jwt_required()
def obtenerUnUsuario(id):
    usuario = get_jwt_identity()
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM usuario WHERE id=%s', (id,))

    usuario = cursor.fetchone()

    return jsonify(usuario)

@app.put('/usuarios/<id>') #alt + 60 < | alt + 62 >
@jwt_required()
def actualizarUsuario(id):
    usuario = get_jwt_identity()
    datos = request.json

    cursor = db.cursor()

    cursor.execute('UPDATE usuario SET nombres=%s, email=%s, contrasena=%s WHERE id=%s',(
        datos['nombres'],
        datos['email'],
        datos['contrasena'],
        id
    ))

    db.commit()

    return jsonify({
        "mensaje": "Usuario actualizado correctamente"
    })

@app.delete('/usuarios/<id>')
@jwt_required()
def eliminarUsuario(id):
    usuario = get_jwt_identity()

    cursor = db.cursor()

    cursor.execute('DELETE FROM usuario WHERE id=%s', (id,)) #en las tuplas hay q colocar una coma al final del ultimo elemento

    db.commit()

    return jsonify({
        "mensaje":"Usuario eliminado correctamente"
    })

######### ENCUESTAS #########

@app.post('/encuestas')
@jwt_required()
def crearEncuesta():
    usuario = get_jwt_identity()
    #request = lo q me envia el cliente
    #response = lo q le voy a responder
    datos = request.json
    
    cursor = db.cursor()

    cursor.execute('''INSERT INTO encuesta(nombre, usuario_id, descripcion)
        VALUE(%s, %s, %s)''', (
        datos['nombre'],
        datos['usuario_id'],
        datos['descripcion'],
    ))

    db.commit()

    return jsonify({
        "mensaje": "Encuesta almacenada correctamente"
    })

@app.get('/encuestas')
def listarEncuestas():
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM encuesta')

    encuestas = cursor.fetchall()

    return jsonify(encuestas)

@app.get('/encuestas/<id>')
@jwt_required()
def obtenerUnaEncuesta(id):
    usuario = get_jwt_identity()
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM encuesta WHERE id=%s', (id,))

    encuesta = cursor.fetchone()

    return jsonify(encuesta)

@app.put('/encuestas/<id>') #alt + 60 < | alt + 62 >
@jwt_required()
def actualizarEncuesta(id):
    usuario = get_jwt_identity()
    datos = request.json

    cursor = db.cursor()

    cursor.execute('UPDATE encuesta SET nombre=%s, usuario_id=%s, descripcion=%s WHERE id=%s',(
        datos['nombre'],
        datos['usuario_id'],
        datos['descripcion'],
        id
    ))

    db.commit()

    return jsonify({
        "mensaje": "Encuesta actualizada correctamente"
    })

@app.delete('/encuestas/<id>')
@jwt_required()
def eliminarEncuesta(id):
    usuario = get_jwt_identity()

    cursor = db.cursor()

    cursor.execute('DELETE FROM encuesta WHERE id=%s', (id,)) #en las tuplas hay q colocar una coma al final del ultimo elemento

    db.commit()

    return jsonify({
        "mensaje":"Encuesta eliminada correctamente"
    })

######### SECCIONES #########

@app.post('/secciones')
@jwt_required()
def crearSeccion():
    usuario = get_jwt_identity()
    print(usuario)
    #request = lo q me envia el cliente
    #response = lo q le voy a responder
    datos = request.json
    
    cursor = db.cursor()

    cursor.execute('''INSERT INTO seccion(nombre, encuesta_id)
        VALUE(%s, %s)''', (
        datos['nombre'],
        datos['encuesta_id'],
    ))

    db.commit()

    return jsonify({
        "mensaje": "Seccion almacenada correctamente"
    })

@app.get('/secciones')
@jwt_required()
def listarSecciones():
    usuario = get_jwt_identity()
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM seccion')

    seccion = cursor.fetchall()

    return jsonify(seccion)

@app.get('/secciones/<id>')
@jwt_required()
def obtenerUnaSeccion(id):
    usuario = get_jwt_identity()
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM seccion WHERE id=%s', (id,))

    seccion = cursor.fetchone()

    return jsonify(seccion)

@app.put('/secciones/<id>') #alt + 60 < | alt + 62 >
@jwt_required()
def actualizarSeccion(id):
    usuario = get_jwt_identity()
    datos = request.json

    cursor = db.cursor()

    cursor.execute('UPDATE seccion SET nombre=%s, encuesta_id=%s WHERE id=%s',(
        datos['nombre'],
        datos['encuesta_id'],
        id
    ))

    db.commit()

    return jsonify({
        "mensaje": "Seccion actualizada correctamente"
    })

@app.delete('/secciones/<id>')
@jwt_required()
def eliminarSeccion(id):
    usuario = get_jwt_identity()

    cursor = db.cursor()

    cursor.execute('DELETE FROM seccion WHERE id=%s', (id,)) #en las tuplas hay q colocar una coma al final del ultimo elemento

    db.commit()

    return jsonify({
        "mensaje":"Seccion eliminada correctamente"
    })

######### PREGUNTAS #########

@app.post('/preguntas')
@jwt_required()
def crearPregunta():
    usuario = get_jwt_identity()
    #request = lo q me envia el cliente
    #response = lo q le voy a responder
    datos = request.json
    
    cursor = db.cursor()

    cursor.execute('''INSERT INTO pregunta(pregunta, seccion_id, tipoPregunta)
        VALUE(%s, %s, %s)''', (
        datos['pregunta'],
        datos['seccion_id'],
        datos['tipoPregunta'],
    ))

    db.commit()

    return jsonify({
        "mensaje": "Pregunta almacenada correctamente"
    })

@app.get('/preguntas')
@jwt_required()
def listarPreguntas():
    usuario = get_jwt_identity()
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM pregunta')

    pregunta = cursor.fetchall()

    return jsonify(pregunta)

@app.get('/preguntas/<id>')
@jwt_required()
def obtenerUnaPregunta(id):
    usuario = get_jwt_identity()
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM pregunta WHERE id=%s', (id,))

    pregunta = cursor.fetchone()

    return jsonify(pregunta)

@app.put('/preguntas/<id>') #alt + 60 < | alt + 62 >
@jwt_required()
def actualizarPregunta(id):
    usuario = get_jwt_identity()
    datos = request.json

    cursor = db.cursor()

    cursor.execute('UPDATE pregunta SET pregunta=%s, seccion_id=%s, tipoPregunta=%s WHERE id=%s',(
        datos['pregunta'],
        datos['seccion_id'],
        datos['tipoPregunta'],
        id
    ))

    db.commit()

    return jsonify({
        "mensaje": "Pregunta actualizada correctamente"
    })

@app.delete('/preguntas/<id>')
@jwt_required()
def eliminarPregunta(id):
    usuario = get_jwt_identity()

    cursor = db.cursor()

    cursor.execute('DELETE FROM pregunta WHERE id=%s', (id,)) #en las tuplas hay q colocar una coma al final del ultimo elemento

    db.commit()

    return jsonify({
        "mensaje":"Pregunta eliminada correctamente"
    })

######### RESPUESTAS #########

@app.post('/respuestas')
@jwt_required()
def crearRespuesta():
    usuario = get_jwt_identity()
    #request = lo q me envia el cliente
    #response = lo q le voy a responder
    datos = request.json
    
    cursor = db.cursor()

    cursor.execute('''INSERT INTO respuesta(respuesta, usuario_id, pregunta_id)
        VALUE(%s, %s, %s)''', (
        datos['respuesta'],
        datos['usuario_id'],
        datos['pregunta_id'],
    ))

    db.commit()

    return jsonify({
        "mensaje": "Respuesta almacenada correctamente"
    })

@app.get('/respuestas')
@jwt_required()
def listarRespuestas():
    usuario = get_jwt_identity()
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM respuesta')

    respuesta = cursor.fetchall()

    return jsonify(respuesta)

@app.get('/respuestas/<id>')
@jwt_required()
def obtenerUnaRespuesta(id):
    usuario = get_jwt_identity()
    cursor = db.cursor(dictionary=True)

    cursor.execute('SELECT * FROM respuesta WHERE id=%s', (id,))

    respuesta = cursor.fetchone()

    return jsonify(respuesta)

@app.put('/respuestas/<id>') #alt + 60 < | alt + 62 >
@jwt_required()
def actualizarRespuesta(id):
    usuario = get_jwt_identity()
    datos = request.json

    cursor = db.cursor()

    cursor.execute('UPDATE respuesta SET respuesta=%s, usuario_id=%s, pregunta_id=%s WHERE id=%s',(
        datos['respuesta'],
        datos['usuario_id'],
        datos['pregunta_id'],
        id
    ))

    db.commit()

    return jsonify({
        "mensaje": "Respuesta actualizada correctamente"
    })

@app.delete('/respuestas/<id>')
@jwt_required()
def eliminarRespuesta(id):
    usuario = get_jwt_identity()

    cursor = db.cursor()

    cursor.execute('DELETE FROM respuesta WHERE id=%s', (id,)) #en las tuplas hay q colocar una coma al final del ultimo elemento

    db.commit()

    return jsonify({
        "mensaje":"Respuesta eliminada correctamente"
    })

app.run(debug=True) #debug = True recargar el servidor con cada cambio