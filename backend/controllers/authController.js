const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models/connection');
const auth = require('./auth')

// Endpoint pour l'inscription
exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    const checkEmailQuery = 'SELECT id FROM utilisateurs WHERE email = ?';
    db.query(checkEmailQuery, [email], async (error, results) => {
      if (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

          // Hashage du mot de passe
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error', status: false });
      }
      // Enregistrement de l'utilisateur dans la base de données
      const q = 'INSERT INTO utilisateurs (name, email, password) VALUES (?, ?, ?)';
      db.query(q, [name, email, hash], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to create user', status: false });
        }
        return res.status(201).json({ message: 'User created successfully', status: true });
      });
    });
    });

  };

  // Endpoint pour la connexion
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the database
  db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(401).json({ message: 'Authentication failed' });
    } else {
      // Compare the provided password with the hashed password stored in the database
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, 'jwtSecret1234567890', { expiresIn: '2h' });
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    }
  });
  };
  
  exports.updateProfile = async (req, res) => {
    const { name, email, oldPassword, newPassword } = req.body;
    const userId = req.query.id; // ID de l'utilisateur authentifié
  
    try {
      const checkEmailQuery = 'SELECT id FROM utilisateurs WHERE email = ? AND id != ?';
      db.query(checkEmailQuery, [email, userId], async (error, results) => {
        if (error) {
          console.error('Error checking email:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length > 0) {
          return res.status(400).json({ message: 'Email already exists' });
        }

              // Vérifiez si l'ancien mot de passe est fourni
      if (oldPassword) {
        // Récupérez le mot de passe actuel de l'utilisateur depuis la base de données
        const getPasswordQuery = 'SELECT password FROM utilisateurs WHERE id = ?';
        db.query(getPasswordQuery, [userId], async (error, results) => {
          if (error) {
            console.error('Error retrieving current password:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
          if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
          }
          const user = results[0];
  
          // Vérifiez si l'ancien mot de passe fourni correspond au mot de passe actuel
          const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  
          if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect old password' });
          }
  
          // Hash du nouveau mot de passe
          let newPasswordHash = null;
          if (newPassword && newPassword.trim() !== '') {
            newPasswordHash = await bcrypt.hash(newPassword, 10);
          } else if (oldPassword) {
            const oldPasswordHash = await bcrypt.hash(oldPassword, 10);
            newPasswordHash = oldPasswordHash;
          }
  
          // Mettre à jour le mot de passe de l'utilisateur dans la base de données
          const updatePasswordQuery = 'UPDATE utilisateurs SET password = ? WHERE id = ?';
          db.query(updatePasswordQuery, [newPasswordHash, userId], (error, _) => {
            if (error) {
              console.error('Error updating password:', error);
              return res.status(500).json({ message: 'Internal server error' });
            }
            // Mettre à jour le nom et/ou l'email de l'utilisateur dans la base de données
            const updateProfileQuery = 'UPDATE utilisateurs SET name = ?, email = ? WHERE id = ?';
            db.query(updateProfileQuery, [name, email, userId], (error, _) => {
              if (error) {
                console.error('Error updating profile:', error);
                return res.status(500).json({ message: 'Internal server error' });
              }
              res.json({ message: 'User profile updated successfully' });
            });
          });
        });
      } else {
        // Si aucun ancien mot de passe n'est fourni, mettez simplement à jour le nom et l'email de l'utilisateur
        const updateProfileQuery = 'UPDATE utilisateurs SET name = ?, email = ? WHERE id = ?';
        db.query(updateProfileQuery, [name, email, userId], (error, _) => {
          if (error) {
            console.error('Error updating profile:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
          res.json({ message: 'User profile updated successfully' });
        });
      }
      
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
// Endpoint pour récupérer les informations de l'utilisateur
exports.getUserInfo = (req, res) => {
  // Assurez-vous que l'utilisateur est authentifié
  if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
  }
  // Récupérez les informations de l'utilisateur à partir de la session
  const { name, email } = req.session.user;
  res.status(200).json({ name, email });
};


// Modifier la fonction `logout` pour déconnecter l'utilisateur en supprimant la session
exports.logout = (req, res) => {
    // Détruisez la session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Error destroying session', status: false });
        }
        // Envoyez une réponse réussie
        res.status(200).json({ message: 'Logout successful', status: true });
    });
};
exports.afficherUser = (req, res) => {
  //  const q = "SELECT clients.id_client AS id_client, clients.nom AS nom, clients.prenom AS prenom, clients.email AS email, clients.password AS password, clients.telephone AS telephone , clients.adresse AS adresse, DATEDIFF(location.date_debut, location.date_fin) AS nombre_jours, ((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) - location.montant) AS reste_payer FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule";
  const q = "SELECT * FROM utilisateurs WHERE id = ?";
  const id = req.query.id;
    db.query(q, [id], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data
        })
    })
};
  /*exports.logout = (req, res) => {
    // Assurez-vous que req.session existe avant de tenter de le détruire
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error logging out:', err);
          return res.status(500).json({ message: 'Error logging out', status: false });
        }
        return res.status(200).json({ message: 'Logged out successfully', status: true });
      });
    } else {
      // Si la session n'existe pas, renvoyez une réponse appropriée
      return res.status(400).json({ message: 'No active session to log out', status: false });
    }
  };*/