const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewears/auth');
const bookController = require('../controllers/bookController');

// Route pour créer un nouveau livre
router.post('/', authMiddleware, bookController.createBook);

// Route pour obtenir tous les livres
router.get('/', bookController.getAllBooks);

// Route pour obtenir un livre spécifique par son ID
router.get('/:id', bookController.getBookById);

// Route pour mettre à jour un livre
router.put('/:id', authMiddleware,bookController.updateBook);

// Route pour supprimer un livre
router.delete('/:id', authMiddleware,bookController.deleteBook);

module.exports = router;