const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
  getWorks,
  getWork,
  createWork,
  updateWork,
  deleteWork,
  getWorksByGrupamento
} = require('../controllers/workController');

// Rotas públicas
router.get('/', getWorks);
router.get('/:id', getWork);
router.get('/grupamento/:grupamento', getWorksByGrupamento);

// Rotas protegidas (apenas admin)
router.post('/', protect, authorize('admin'), createWork);
router.put('/:id', protect, authorize('admin'), updateWork);
router.delete('/:id', protect, authorize('admin'), deleteWork);

module.exports = router;