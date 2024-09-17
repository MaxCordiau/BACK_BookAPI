const Book = require('./book');
const Author = require('./author');
const User = require('./user'); // Ajoutez cette ligne pour importer le modèle User

// Définir les relations entre les modèles avec des alias
Author.hasMany(Book, { as: 'books', foreignKey: 'authorId' });
Book.belongsTo(Author, { as: 'author', foreignKey: 'authorId' });

// Exporte les modèles
module.exports = { Book, Author, User }; // Ajoutez User aux exportations
