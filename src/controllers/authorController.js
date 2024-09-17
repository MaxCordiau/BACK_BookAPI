const { Author, Book } = require('../models');

// Fonction pour créer un auteur
exports.createAuthor = async (req, res, next) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (err) {
        next(err);
    }
};

// Fonction pour obtenir tous les auteurs
exports.getAllAuthors = async (req, res, next) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (err) {
        next(err);
    }
};

// Fonction pour obtenir un auteur par son ID
exports.getAuthorById = async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({ message: "Auteur non trouvé" });
        }
        res.status(200).json(author);
    } catch (err) {
        next(err);
    }
};

// Fonction pour mettre à jour un auteur
exports.updateAuthor = async (req, res, next) => {
    try {
        const [updated] = await Author.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedAuthor = await Author.findByPk(req.params.id);
            return res.status(200).json(updatedAuthor);
        }
        throw new Error('Auteur non trouvé');
    } catch (err) {
        next(err);
    }
};

// Fonction pour supprimer un auteur
exports.deleteAuthor = async (req, res, next) => {
    try {
        const deleted = await Author.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send("Auteur supprimé");
        }
        throw new Error('Auteur non trouvé');
    } catch (err) {
        next(err);
    }
};

// Fonction pour obtenir tous les livres d'un auteur spécifique
exports.getAuthorBooks = async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.id, {
            include: [{ model: Book, as: 'books' }]  // Assurez-vous que 'books' correspond à l'alias défini dans l'association
        });
        if (!author) {
            return res.status(404).json({ message: "Auteur non trouvé" });
        }
        res.status(200).json(author.books);  // 'author.books' au lieu de 'author.Books'
    } catch (err) {
        next(err);
    }
};