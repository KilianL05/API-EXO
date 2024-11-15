const {Router} = require('express');
const {createChapters, getChapters, getChaptersById, deleteChapters} = require("../controllers/chapter_controllers");

const router = Router();

router.post('/', createChapters);
router.get('/', getChapters);
router.get('/:id', getChaptersById);
router.delete('/:id', deleteChapters);

module.exports = router;