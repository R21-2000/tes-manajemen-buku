const mongoose = require('mongoose');
const Joi = require('joi');

// Skema data untuk Lokasi
const locationSchema = new mongoose.Schema({
  // ID unik lokasi, bisa dicari lewat endpoint
  id_lokasi: {
    type: String,
    required: true,
    trim: true
  },
  // Nama lokasi, minimal 3 karakter dan maksimal 50 karakter
  nama_lokasi: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  }
});

// Fungsi validasi data lokasi menggunakan Joi
function validateLocation(location) {
  const schema = Joi.object({
    id_lokasi: Joi.string().required(),
    nama_lokasi: Joi.string().min(3).max(50).required()
  });

  return schema.validate(location);
}

// Export model dan validator
const Location = mongoose.model('Location', locationSchema);

module.exports = {
  Location,
  validateLocation
};
