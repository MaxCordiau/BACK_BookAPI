const errorHandler = (err, req, res, next) => {
    console.log(err);
    // 500 is the HTTP status code for "Internal Server Error"
    res.status(500).json({ message: 'Une erreur coté serveur est survenue.' });
};

module.exports = errorHandler;