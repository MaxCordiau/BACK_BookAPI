const Author = require('./author');
const Book = require('./book');
const User = require('./user'); // Assurez-vous que ce modèle est correctement configuré

// Définir les relations entre les modèles avec des alias uniques
Author.hasMany(Book, { as: 'books', foreignKey: 'authorId' });
Book.belongsTo(Author, { as: 'author', foreignKey: 'authorId' });

// Exporte les modèles
module.exports = { Author, Book, User };
