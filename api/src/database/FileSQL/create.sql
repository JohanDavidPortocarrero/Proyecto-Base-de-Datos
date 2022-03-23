CREATE DATABASE attendance_management_system;

CREATE TABLE usuarios(
    id_usuarios serial,
		rol varchar(100),
    nombre varchar(250),
    email varchar(250),
    password_user varchar(250),
    descripcion varchar(250),
    PRIMARY KEY(id_usuarios)
);

CREATE TABLE estudiantes(
    id_usuarios int,
    codigo_estudiante int,
    PRIMARY KEY(id_usuarios),
    FOREIGN KEY(id_usuarios) references usuarios(id_usuarios)
);

CREATE TABLE cursos(
    id_cursos serial,
		codigo_curso varchar(200),
    id_usuarios int,
    nombre_c varchar(250),
    creditos int,
		descripcion varchar(500),
    PRIMARY KEY(id_cursos),
    FOREIGN KEY(id_usuarios) references usuarios(id_usuarios)
);

CREATE TABLE inscripcion(
    id_inscripcion SERIAL,
    id_cursos int,
    id_personal int ,
    id_estudiante int,
    PRIMARY KEY(id_inscripcion),
    FOREIGN KEY(id_cursos) references cursos(id_cursos),
    FOREIGN KEY(id_estudiante) references estudiantes(id_usuarios),
    FOREIGN KEY(id_personal) references usuarios(id_usuarios)
);

CREATE TABLE pruebas(
  id_pruebas SERIAL,
  id_usuarios int,
	id_curso integer,
  nombre varchar(250),
  fecha_publicacion date,
  descripcion_estado varchar(250),
  PRIMARY KEY(id_pruebas),
  FOREIGN KEY(id_usuarios) references usuarios(id_usuarios),
  FOREIGN KEY(id_curso) references cursos(id_cursos)
);

CREATE TABLE preguntas(
    id_pregunta SERIAL,
    id_pruebas int,
    descripcion varchar(250),
    tipo varchar(250),
    PRIMARY KEY(id_pregunta),
    FOREIGN KEY(id_pruebas) references pruebas(id_pruebas)
);

CREATE TABLE lista_opciones(
    id_lista_opciones serial,
    id_pregunta int,
    PRIMARY KEY(id_lista_opciones),
    FOREIGN KEY(id_pregunta) references preguntas(id_pregunta)
);

CREATE TABLE opciones(
	id serial,
	id_list_opciones integer,
	opcion varchar(250),
	primary key (id),
	foreign key (id_list_opciones) references lista_opciones(id_lista_opciones)
);

CREATE TABLE respuestas(
    id_r SERIAL,
    id_estudiante int,
    id_pregunta int,
    fecha_respuesta date,
    tipo varchar(250),
		descripcion varchar(500),
    PRIMARY KEY(id_r),
    FOREIGN KEY(id_estudiante) references estudiantes(id_usuarios),
    FOREIGN KEY(id_pregunta) references preguntas(id_pregunta)
);

CREATE TABLE asistencia(
    id_asistencia SERIAL,
    id_estudiantes int,
    id_cursos int,
    id_pruebas int,
    fecha timestamp,
    PRIMARY KEY(id_asistencia),
    FOREIGN KEY(id_estudiantes) references estudiantes(id_usuarios),
    FOREIGN KEY(id_cursos) references cursos(id_cursos),
    FOREIGN KEY(id_pruebas) references pruebas(id_pruebas)
);

