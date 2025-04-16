const Joi = require('joi');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {  // Ganti 'penulis' dengan 'name' (lebih standar)
    type: String,
    required: true,
    unique: true  // Agar nama penulis unik
  },
  // Tambahkan properti lain jika perlu
  biography: {
    type: String,
    default: 'Tidak ada deskripsi'
  }
});

// Validasi Joi yang sesuai dengan schema
function validateAuthor(author) {
  const schema = Joi.object({
    name: Joi.string().required(),  // Sesuai field 'name' di schema
    biography: Joi.string().optional()
  });
  return schema.validate(author);
}

const Author = mongoose.model('Author', authorSchema);
module.exports = {
  Author,
  validateAuthor
};