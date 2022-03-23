--insert usuarios (revisar descripcion y rol)
insert into usuarios (rol, nombre, email, password_user, descripcion) 
	values 
	('administrador', 'Julietta', 'jbriggdale0@dedecms.com', '123456', 'Unsp inj extn musc/fasc/tend r mid finger at forarm lv, init'), 
	( 'administrador', 'Glyn', 'geast1@washington.edu', '123456', 'Other congenital malformations of gallbladder'), 
	('administrador', 'Floris', 'fghiotto2@4shared.com', '123456', 'Abdominal aortic aneurysm, ruptured'), 
	('personal', 'Rae', 'rrigts3@biblegateway.com', '123456', 'Open bite, left lower leg, subsequent encounter'), 
	('personal', 'Shanon', 'sjohnys4@discovery.com', '123456', 'Displaced pilon fracture of left tibia, init for clos fx'), 
	('personal', 'Carlin', 'cgauvain5@pinterest.com', '123456', 'Peripheral vascular angioplasty status'),
	('personal', 'Esmaria', 'ebundey6@blog.com', '123456', 'Sublux of proximal interphaln joint of l little finger, init'),
	('estudiante', 'Lindsay', 'lmckinnell7@nps.gov', '123456', 'Blister (nonthermal) of right index finger, sequela'),
	('estudiante', 'Jacinta', 'jgierardi8@posterous.com', '123456', 'Underdosing of barbiturates, subsequent encounter'),
	('estudiante', 'Fifi', 'fyegorkin9@liveinternet.ru', '123456', 'Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('estudiante', 'Vikky', 'vseppeya@mediafire.com', '123456', 'Acute lacrimal canaliculitis of left lacrimal passage'),
	('estudiante', 'Heddie', 'hturkb@purevolume.com', '123456', 'Unspecified injury of axillary or brachial vein'),
	('estudiante', 'Sheryl', 'sluetkemeyerc@zdnet.com', '123456', 'Encounter for suprvsn of normal pregnancy, unsp trimester'),
	('administrador', 'Maggee', 'mrickertsend@imageshack.us', '123456', 'Displaced oblique fracture of shaft of unsp radius, sequela'),
	('personal', 'Melodie', 'mprobbingse@hud.gov', '123456', 'Osteochondritis dissecans, left hip');

--insert estudiante
insert into estudiantes (id_usuarios, codigo_estudiante) 
	values 
	(8, 200245),
	(9, 201455),
	(10, 219550),
	(11, 200354),
	(12, 212019),
	(13, 208810);

--insert cursos
insert into cursos (codigo_curso, id_usuarios, nombre_c, creditos, descripcion) values 
	('12354M', 4, 'Quality Engineer', 2, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('202354M', 4, 'Business Systems Development Analyst', 3, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('223354M', 5, 'Quality Control Specialist', 3, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('260354M', 5, 'Research Associate', 4, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('482354M', 6, 'Structural Engineer', 4, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('452354M', 6, 'Automation Specialist II', 4, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('962354M', 7, 'Data Coordiator', 3, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('752354M', 7, 'Environmental Tech', 2, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('782354M', 15, 'Research Assistant IV', 4, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('85254M', 15, 'General Manager', 2, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('36254M', 7, 'Human Resources Assistant II', 4, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('212354M', 6, 'Clinical Specialist', 3, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('712354M', 4, 'Nurse Practicioner', 3, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('912354M', 5, 'Technical Writer', 4, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
	('85354M', 15, 'Recruiter', 2, 'Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela');

--insert inscripcion
insert into inscripcion (id_cursos, id_usuarios, id_estudiante) values 
	(1, 4, 8),
	(1, 4, 9),
	(1, 4, 10),
	(2, 4, 8),
	(2, 4, 11),
	(3, 5, 12),
	(3, 5, 13),
	(4, 5, 8),
	(4, 5, 9),
	(5, 6, 10),
	(5, 6, 11),
	(10, 15, 12),
	(10, 15, 13),
	(11, 7, 9),
	(11, 7, 8);

insert into pruebas (id_usuarios, id_curso, nombre, fecha_publicacion, descripcion_estado) values
 (4,1,'Prueba 1','2021-11-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (4,2,'Prueba 2','2021-12-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (6,2,'Prueba 3','2021-09-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (4,3,'Prueba 4','2021-08-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (7,4,'Prueba 5','2021-07-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (7,5,'Prueba 6','2021-06-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (7,10,'Prueba 7','2021-05-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (5,10,'Prueba 8','2021-04-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (5,4,'Prueba 9','2021-03-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (6,3,'Prueba 10','2021-02-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela'),
 (6,5,'Prueba 11','2021-01-10','Other congenital malformations of gallbladder, abdominal aortic aneurysm, ruptured. Occup of hv veh injured in clsn w hv veh nontraf, sequela');


insert into preguntas(id_prueba, descripcion, tipo) values
(1,'¿Que es React?','abierta'),
(2,'¿Que es Vue?','Cerrada'),
(3,'¿Que es Javascript?','cerrada'),
(4,'¿Que es un algoritmo?','abierta'),
(5,'¿Que es DDL?','abierta'),
(6,'¿Que es DDA?','abierta'),
(7,'¿Que es una variable?','abierta'),
(8,'¿Que es una funcion?','abierta'),
(9,'¿Que es una clase?','abierta'),
(10,'¿Que es boolean?','Cerrada'),
(11,'¿Que es Postgres?','cerrada');

insert into lista_opciones( id_pregunta) values
(2),
(3),
(10),
(11);

insert into opciones (id_list_opciones, opcion) values
(2,'Un framework'),(2,'Un lenguaje'),(2,'Un framework'),
(3,'Un lenguaje de programacion'),(3,'Un framework'),(3,'Un tipo de dato'),
(10,'Un tipo de dato'),(10,'Un framework'),(10,'Un lenguaje de programacion'),
(11,'Un sistema gesto de bases de datos'),(11,'Un framework'),(11,'Un framework');

insert into respuestas (id_estudiante, id_pregunta, fecha_respuesta, tipo, descripcion) values
(8,11,'2021-10-10','cerrada',''),
(9,10,'2021-10-10','cerrada',''),
(10,3,'2021-10-10','cerrada',''),
(11,2,'2021-10-10','cerrada',''),
(12,9,'2021-10-10','abierta','Una plantilla para crear objetos'),
(13,8,'2021-10-10','abierta','Es un bloque de codigo que realiza alguna funcion');


insert into asistencia (id_estudiantes, id_cursos, id_pruebas, fecha) values
(8,1,1,'2021-05-01 16:00:00'),
(9,2,2,'2021-05-01 16:05:00'),
(10,3,3,'2021-05-01 16:10:00'),
(11,4,4,'2021-05-01 16:15:00'),
(12,5,5,'2021-05-01 16:03:00'),
(13,10,6,'2021-05-01 16:04:00');