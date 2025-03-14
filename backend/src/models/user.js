<<<<<<< HEAD
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  nome: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
  collection: 'users'
});

=======
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  nome: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
  collection: 'users'
});

>>>>>>> 8b2bcb1891a14ea629320f1bc04f9438dedd163f
export const User = mongoose.model('User', userSchema);