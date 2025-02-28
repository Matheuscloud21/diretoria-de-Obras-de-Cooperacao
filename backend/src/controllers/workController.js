const Work = require('../models/Work');

// @desc    Obter todas as obras
// @route   GET /api/works
// @access  Public
exports.getWorks = async (req, res) => {
  try {
    const works = await Work.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: works.length,
      data: works
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar obras',
      error: error.message
    });
  }
};

// @desc    Obter uma obra específica
// @route   GET /api/works/:id
// @access  Public
exports.getWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Obra não encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: work
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar obra',
      error: error.message
    });
  }
};

// @desc    Criar nova obra
// @route   POST /api/works
// @access  Private/Admin
exports.createWork = async (req, res) => {
  try {
    const work = await Work.create(req.body);

    res.status(201).json({
      success: true,
      data: work
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar obra',
      error: error.message
    });
  }
};

// @desc    Atualizar obra
// @route   PUT /api/works/:id
// @access  Private/Admin
exports.updateWork = async (req, res) => {
  try {
    let work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Obra não encontrada'
      });
    }

    work = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: work
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar obra',
      error: error.message
    });
  }
};

// @desc    Deletar obra
// @route   DELETE /api/works/:id
// @access  Private/Admin
exports.deleteWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Obra não encontrada'
      });
    }

    await work.remove();

    res.status(200).json({
      success: true,
      message: 'Obra removida com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar obra',
      error: error.message
    });
  }
};

// @desc    Buscar obras por grupamento
// @route   GET /api/works/grupamento/:grupamento
// @access  Public
exports.getWorksByGrupamento = async (req, res) => {
  try {
    const works = await Work.find({ grupamento: req.params.grupamento }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: works.length,
      data: works
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar obras por grupamento',
      error: error.message
    });
  }
};