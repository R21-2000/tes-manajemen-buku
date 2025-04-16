const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const { Location } = require('../models/location'); 

router.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    try {
        const books = await Book.find().sort('name');
        const locations = await Location.find().sort('nama_lokasi');
        res.render('index', { books, locations });
    } catch (error) {
        console.error("Error mengambil data:", error);
        res.status(500).send("Terjadi kesalahan.");
    }
});

module.exports = router;
