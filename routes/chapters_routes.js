const {Router} = require('express');
const {createChapters, getChapters, getChaptersById, deleteChapters,searchChapters} = require("../controllers/chapter_controllers");

const router = Router();

router.post('/', createChapters);
router.get('/', getChapters);
router.get('/:id', getChaptersById);
router.delete('/:id', deleteChapters);
router.get('/search/:name', searchChapters);

module.exports = router;