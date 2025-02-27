const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Verificar se o token existe no header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Se não houver token, retorna erro
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Acesso não autorizado. Token não fornecido.'
      });
    }

    try {
      // Verificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adicionar usuário à requisição
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido ou expirado'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao autenticar usuário'
    });
  }
};

// Middleware para verificar permissões de usuário
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Usuário com role '${req.user.role}' não tem permissão para acessar esta rota`
      });
    }
    next();
  };
};

// Middleware para gerar token JWT
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};