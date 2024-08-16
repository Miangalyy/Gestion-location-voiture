const express = require('express');
const router = express.Router();

// Middleware pour vérifier l'authentification de l'utilisateur
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next(); // L'utilisateur est authentifié, continuez
  } else {
    res.status(401).json({ message: 'Unauthorized' }); // Utilisateur non autorisé
  }
};

// Endpoint pour récupérer les informations de l'utilisateur
router.get('/', isAuthenticated, (req, res) => {
  const user = req.session.user; // Récupérez les informations de l'utilisateur depuis la session
  res.status(200).json({ name: user.name, email: user.email });
});

module.exports = router;