/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ usuarios /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE usuarios;

DROP TABLE IF EXISTS encuesta;
CREATE TABLE `encuesta` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `nombre` varchar(255) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS opcion;
CREATE TABLE `opcion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameValor` varchar(255) DEFAULT NULL,
  `id_pregunta` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS pregunta;
CREATE TABLE `pregunta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(255) NOT NULL,
  `seccion_id` int NOT NULL,
  `tipoPregunta` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS respuesta;
CREATE TABLE `respuesta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `respuesta` varchar(255) DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `pregunta_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS seccion;
CREATE TABLE `seccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `encuesta_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS usuario;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;