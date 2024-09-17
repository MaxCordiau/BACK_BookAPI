const { Book, Author } = require('../models');

// Create
exports.createBook = async (req, res, next) => {
    try {
        const { title, description, isbn, publishedYear, authorId, authorName } = req.body;
        let author;

        if (authorId) {
            author = await Author.findByPk(authorId);
            if (!author) {
                return res.status(404).json({ message: "Auteur non trouvé" });
            }
        } else if (authorName) {
            [author] = await Author.findOrCreate({
                where: { name: authorName }
            });
        } else {
            return res.status(400).json({ message: "Informations d'auteur manquantes" });
        }

        const book = await Book.create({
            title,
            description,
            isbn,
            publishedYear,
            authorId: author.id
        });

        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
};

// Read (All)
exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.findAll({
            include: { model: Author, as: 'author' }  // Utilisation de l'alias
        });
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

// Read (One)
exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: { model: Author, as: 'author' }  // Utilisation de l'alias
        });
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

// Update
exports.updateBook = async (req, res, next) => {
    try {
        const { title, description, isbn, publishedYear, authorId, authorName } = req.body;
        const bookId = req.params.id;

        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }

        let author;
        if (authorId) {
            author = await Author.findByPk(authorId);
            if (!author) {
                return res.status(404).json({ message: "Auteur non trouvé" });
            }
        } else if (authorName) {
            [author] = await Author.findOrCreate({
                where: { name: authorName }
            });
        }

        await book.update({
            title,
            description,
            isbn,
            publishedYear,
            authorId: author ? author.id : book.authorId
        });

        const updatedBook = await Book.findByPk(bookId, {
            include: { model: Author, as: 'author' }  // Utilisation de l'alias
        });
        res.status(200).json(updatedBook);
    } catch (err) {
        next(err);
    }
};

// Delete
exports.deleteBook = async (req, res, next) => {
    try {
        const deleted = await Book.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send("Livre supprimé");
        }
        throw new Error('Livre non trouvé');
    } catch (err) {
        next(err);
    }
};
