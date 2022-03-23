-- Crear una vista para sustentar el reporte de asistencia y respuestas de los estudiantes

CREATE VIEW reporteAsistencia
 AS 
	SELECT 
		U.nombre,
		E.codigo_estudiante,
		C.nombre_c,
		P.tipo,
		P.descrpcion,
		R.descripcion
 		FROM  
			usuarios as U,
			cursos as C,
			asistencia as A,
			preguntas as P,
			respuestas as R,
			estudiantes as E
 		WHERE 
			(U.id_usuarios = E.id_usuarios) and
			(E.id_usuarios = R.id_estudiante) and
			(C.id_cursos = A.id_cursos) and
			(A.id_pruebas = P.id_pruebas) and
			(R.id_pregunta = P.id_pregunta)


-- Si se borra un curso se debe borra de la inscripcion
CREATE TRIGGER del_curso
 AFTER DELETE of id_cursos ON cursos
FOR EACH ROW 
  BEGIN
    DELETE --id.cursos
      FROM inscripcion
     WHERE  cursos.id_cursos = incripcion.id_cursos;
END

-- Si se borra un curso se debe borra de la inscripcion
CREATE TRIGGER del_prueba
 AFTER DELETE of id_pruebas ON preguntas
FOR EACH ROW 
  BEGIN
    DELETE --id_pruebas
      FROM pruebas
     WHERE preguntas.id_prueba = pruebas.id_prueba;
END


--Antes de inscribir un estudiante se debe verificar que exista
CREATE TRIGGER verificarEstudiante
 BEFORE INSERT OF codigo_estudiante ON inscripcion
 FOR EACH ROW
        WHEN NOT EXISTS(SELECT codigo_estudiante FROM estudiantes
        WHERE codigo_estudiante = NEW.codigo_estudiante);
 BEGIN
        RAISE EXCEPTION('No se encuentra el estudiante');
END;        


CREATE TRIGGER verificarEstudiante
 BEFORE INSERT OF codigo_estudiante ON inscripcion
 FOR EACH ROW
        WHEN NOT EXISTS(OLD.estudiantes.codigo_estudiante);
 BEGIN
        RAISE EXCEPTION('No se encuentra el estudiante');
END;  

--Procedimiento que realiza la inscrpcion de un estudiante
CREATE PROCEDURE inscripcion_student(id_personal INT, id_estudiante INT, id_curso INT)
LANGUAGE SQL
AS $$   
    BEGIN
        INSERT INTO incripcion VALUES(id_personal, id_estudiante, id_curso);
        COMMIT;
    END;
$$

--Contar las asistencias cuando termine el semestre.
CREATE OR REPLACE PROCEDURE many_asistencias(id_student INT) 
LANGUAGE SQL
  AS $$
BEGIN
 INSERT INTO asistencias
 SELECT count(id_asistencia) FROM asistencias WHERE id_student=codigo_estudiante
 and day='2022-03-18 12:00:00.00';
 COMMIT;
END;
$$






