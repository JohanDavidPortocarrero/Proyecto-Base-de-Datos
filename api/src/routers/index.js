const {
    Router
} = require('express');
const router = Router();

router.get('/', (req, res) => res.send("<h1>No se encontro la ruta</h1>"));


module.exports = router;