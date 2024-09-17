const Book = require('./book');
const Author = require('./author');

// Définir les relations entre les modèles avec des alias
Author.hasMany(Book, { as: 'books', foreignKey: 'authorId' });
Book.belongsTo(Author, { as: 'author', foreignKey: 'authorId' });

module.exports = { Book, Author };
