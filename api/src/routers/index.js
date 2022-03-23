const {
    Router
} = require('express');
const router = Router();

router.get('/', (req, res) => res.send("<h1>No se encontro la ruta</h1>"));

const {
    getUsers,
    getUser,
    getStudents,
    agregarPersonal,
    agregarEstudiante,
    actualizarEstudiantes,
    autenticarUsuario
} = require('../controllers/UsuariosController');

router.get('/all-users/', getUsers);
router.get('/users/:id/', getUser)
router.get('/students/', getStudents)
router.post('/students/', agregarEstudiante);
router.post('/personal/', agregarPersonal);
router.post('/users/', autenticarUsuario);
router.put('/users/:id/', actualizarEstudiantes);

const {
    getCursos,
    getCurso,
    getDocenteCursos,
    crearCurso,
    actualizarCurso,
    actualizarcursosAdmin,
    eliminarCurso
} = require('../controllers/CursosController');

router.get('/all-cursos/', getCursos);
router.get('/cursos/:id', getCurso);
router.get('/docentecursos/:id', getDocenteCursos);
router.post('/cursos/', crearCurso);
router.put('/cursoadmin/:id', actualizarcursosAdmin);
router.put('/cursos/:id', actualizarCurso);
router.delete('/cursos/:id', eliminarCurso);

const {
    getInscripciones,
    getInscripcionStudent,
    getInscripcionCurso,
    getCursosStudentInscripto,
    incribirEstudiante,
    actualizarInscripcion,
    deleteIncripcion
} = require('../controllers/InscricionController');

router.get('/all-inscripcion/', getInscripciones);
router.get('/inscripcionstudent/:id', getInscripcionStudent);
router.get('/inscripcioncurso/:id', getInscripcionCurso);
router.get('/cursosinscriptostudent/:id', getCursosStudentInscripto);
router.post('/inscripcion/', incribirEstudiante);
router.put('/inscripcion/:id', actualizarInscripcion);
router.delete('/inscripcion/:id', deleteIncripcion)

const {
    getPruebas,
    getPrueba,
    getPruebaCurso,
    crearPrueba,
    insertarPregunta,
    insertarOpcion,
    actualizarPrueba,
    actualizarPregunta,
    actualizarOpcion,
    deleteOpcion,
    deletePregunta,
    deletePrueba
} = require('../controllers/PruebasController');

router.get('/all-pruebas/', getPruebas);
router.get('/prueba/:id', getPrueba);
router.get('/prueba-curso/:id', getPruebaCurso);
router.post('/prueba/', crearPrueba);
router.post('/pregunta/', insertarPregunta);
router.post('/opcion/', insertarOpcion);
router.put('/prueba/:id', actualizarPrueba);
router.put('/pregunta/:id', actualizarPregunta);
router.put('/opcion/:id', actualizarOpcion);
router.delete('/prueba/:id', deletePrueba);
router.delete('/pregunta/:id', deletePregunta);
router.delete('/opcion/:id', deleteOpcion);

const {
    getAsistencia,
    getStudentsAsistencia,
    getCursoAsistencia,
    marcarAsistencia,
    deleteAsistencia
} = require('../controllers/AsistenciaController');

router.get('/all-asistencia/', getAsistencia);
router.get('/asistencia-estudiante/:id', getStudentsAsistencia);
router.get('/asistencia-curso', getCursoAsistencia);
router.post('/asistencia/', marcarAsistencia);
router.delete('/asistencia/:id', deleteAsistencia);

module.exports = router;