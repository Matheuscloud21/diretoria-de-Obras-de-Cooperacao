const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  om: {
    type: String,
    required: [true, 'OM é obrigatória']
  },
  nome: {
    type: String,
    required: [true, 'Nome da obra é obrigatório']
  },
  ptrab: {
    type: Number,
    required: [true, 'Valor do PTrab é obrigatório']
  },
  orgaoFinanciador: {
    type: String,
    required: [true, 'Órgão financiador é obrigatório']
  },
  grupamento: {
    type: String,
    required: [true, 'Grupamento é obrigatório']
  },
  coordenadas: {
    type: [Number],
    required: [true, 'Coordenadas são obrigatórias'],
    validate: {
      validator: function(v) {
        return v.length === 2 && 
               v[0] >= -90 && v[0] <= 90 && 
               v[1] >= -180 && v[1] <= 180;
      },
      message: 'Coordenadas inválidas'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Atualizar o timestamp de updatedAt antes de salvar
workSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Work', workSchema);