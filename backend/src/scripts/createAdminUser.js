require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdminUser = async () => {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Criar usuário admin
    const adminData = {
      username: 'admin',
      password: 'admin123456',
      role: 'admin'
    };

    // Verificar se já existe um admin
    const adminExists = await User.findOne({ username: adminData.username });
    
    if (adminExists) {
      console.log('Usuário admin já existe!');
      process.exit(0);
    }

    // Criar novo admin
    const admin = await User.create(adminData);
    
    console.log('Usuário admin criado com sucesso!');
    console.log('Username:', adminData.username);
    console.log('Senha:', adminData.password);
    console.log('Por favor, altere a senha após o primeiro login.');

  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

createAdminUser();