const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewears/auth');
const authorController = require('../controllers/authorController');

// Route pour créer un nouvel auteur
router.post('/', authMiddleware,authorController.createAuthor);

// Route pour obtenir tous les auteurs
router.get('/', authorController.getAllAuthors);

// Nouvelle route pour obtenir tous les livres d'un auteur spécifique
router.get('/:id/books', authorController.getAuthorBooks);

// Route pour obtenir un auteur spécifique par son ID
router.get('/:id', authorController.getAuthorById);

// Route pour mettre à jour un auteur
router.put('/:id', authMiddleware,authorController.updateAuthor);

// Route pour supprimer un auteur
router.delete('/:id', authMiddleware,authorController.deleteAuthor);


module.exports = router;