const express = require('express');
const { Location, validateLocation } = require('../models/location');
const router = express.Router();

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find().sort('nama_lokasi');
    res.send(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).send('Internal server error');
  }
});

// POST new location
router.post('/', async (req, res) => {
  const { error } = validateLocation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Cek jika nama_lokasi kosong
  if (!req.body.nama_lokasi || req.body.nama_lokasi.trim() === '') {
    return res.status(400).send('Nama lokasi tidak boleh kosong');
  }

  try {
    const location = new Location({
      id_lokasi: req.body.id_lokasi,
      nama_lokasi: req.body.nama_lokasi.trim()
    });

    await location.save();
    res.status(201).send(location);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send('Nama lokasi atau ID sudah ada');
    }
    res.status(500).send('Gagal menyimpan lokasi');
  }
});

// PUT update location
router.put('/:id', async (req, res) => {
  const { error } = validateLocation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if the new id_lokasi conflicts with others
    if (req.body.id_lokasi) {
      const conflict = await Location.findOne({ 
        id_lokasi: req.body.id_lokasi,
        _id: { $ne: req.params.id }
      });
      if (conflict) return res.status(400).send('Location ID already exists');
    }

    const location = await Location.findByIdAndUpdate(
      req.params.id,
      {
        id_lokasi: req.body.id_lokasi,
        nama_lokasi: req.body.nama_lokasi
      },
      { new: true, runValidators: true }
    );

    if (!location) return res.status(404).send('Location not found');
    res.send(location);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).send('Failed to update location');
  }
});

// DELETE location
router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).send('Location not found');
    res.send({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).send('Failed to delete location');
  }
});

module.exports = router;