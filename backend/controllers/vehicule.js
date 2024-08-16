const db = require("../models/connection");
const fileSystem = require("fs");

/*exports.afficherVehicule = (req,res) => {
    const q = "SELECT * FROM vehicule"
    db.query(q, (err,data) => {
        if (err) return res.json(err)

        return res.json({
            "data" : data 
        });
    })
};*/

exports.afficherVehicule = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Numéro de la page, par défaut 1
    const pageSize = parseInt(req.query.pageSize) || 8; // Taille de la page, par défaut 4
    const offset = (page - 1) * pageSize;

    // Requête pour compter le nombre total de lignes dans la table
    const countQuery = `SELECT COUNT(*) AS total FROM vehicule`;
    db.query(countQuery, (err, countResult) => {
        if (err) return res.json(err);

        const totalRows = countResult[0].total;

        // Requête pour récupérer les données paginées
        const q = `SELECT * FROM vehicule LIMIT ${pageSize} OFFSET ${offset}`;
        db.query(q, (err, data) => {
            if (err) return res.json(err);

            const totalPages = Math.ceil(totalRows / pageSize);

            return res.json({
                currentPage: page,
                pageSize: pageSize,
                totalCount: totalRows,
                totalPages: totalPages,
                data: data
            });
        });
    });
};



exports.afficherNbVehicule = (req, res) => {
    //  const q = "SELECT clients.id_client AS id_client, clients.nom AS nom, clients.prenom AS prenom, clients.email AS email, clients.password AS password, clients.telephone AS telephone , clients.adresse AS adresse, DATEDIFF(location.date_debut, location.date_fin) AS nombre_jours, ((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) - location.montant) AS reste_payer FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule";
    const q = "SELECT COUNT(*) AS nombre FROM vehicule";
      db.query(q, (err, data) => {
          if(err)  return res.json(err)
  
          return res.json({
              data : data
          })
      })
  };

  exports.afficherPropVehicule = (req, res) => {
    //  const q = "SELECT clients.id_client AS id_client, clients.nom AS nom, clients.prenom AS prenom, clients.email AS email, clients.password AS password, clients.telephone AS telephone , clients.adresse AS adresse, DATEDIFF(location.date_debut, location.date_fin) AS nombre_jours, ((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) - location.montant) AS reste_payer FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule";
    const q = "SELECT COUNT(*) AS nombre FROM vehicule WHERE idPropretaire = 2";
      db.query(q, (err, data) => {
          if(err)  return res.json(err)
  
          return res.json({
              data : data
          })
      })
  };
exports.afficherProprietaire = (req,res) => {
    const q = "SELECT * FROM proprietaire"
    db.query(q, (err,data) => {
        if (err) return res.json(err)

        return res.json({
            "data" : data 
        });
    })
};

exports.afficherVehiculeModifier = (req,res) => {
    const matricule = req.params.matricule
    const q = "SELECT * FROM vehicule WHERE matricule = ?"
    db.query(q, [matricule], (err,data) => {
        if (err) return res.json(err)

        return res.json({
            data : data 
        });
    })
};
exports.rechercheVehicule = (req, res) => {
    const matricule = req.body.searchTerm;
    const recherche = `%${matricule}%`; // Ajoutez des '%' pour rechercher dans les parties du texte.

    const q = "SELECT * FROM vehicule WHERE matricule LIKE ? OR nomVoiture LIKE ? OR marque LIKE ?";
    // Vous devez passer une liste de paramètres correspondant aux ? dans votre requête.
    db.query(q, [recherche, recherche, recherche], (err, data) => {
        if (err) return res.json(err);

        return res.json({
            data: data
        });
    });
};

exports.rechercheVehiculeParProprietaire = (req, res) => {
    const matricule = req.body.searchTerm;
    const q = "SELECT * FROM vehicule WHERE idPropretaire = ?";
    db.query(q, [matricule], (err, data) => {
        if (err) return res.json(err);

        return res.json({
            data: data
        });
    });
};

/*exports.rechercheVehiculeParDisponibilite = (req, res) => {
    const matricule = req.body.searchTerm;
    const q = "SELECT * FROM vehicule WHERE disponibilite = ?";
    db.query(q, [matricule], (err, data) => {
        if (err) return res.json(err);

        return res.json({
            data: data
        });
    });
};*/

exports.rechercheVehiculeParDisponibilite = (req, res) => {
    const date1 = req.body.searchTerm1;
    const date2 = req.body.searchTerm2;
  //  const q = "SELECT vehicule.matricule AS matricule, vehicule.nomVoiture AS nomVoiture, vehicule.marque AS marque, vehicule.idPropretaire AS idPropretaire, vehicule.prix_location AS prix_location, vehicule.pourcentage AS pourcentage, vehicule.nbPlace AS nbPlace, vehicule.carburant AS carburant, vehicule.disponibilite AS disponibilite, location.id_location AS id FROM vehicule, location WHERE vehicule.matricule = location.matricule AND ((location.date_debut <= ? AND location.date_fin >= ? ) OR (location.date_debut <= ? AND location.date_fin >= ?)) GROUP BY vehicule.matricule";
  const q = "SELECT vehicule.matricule AS matricule, vehicule.nomVoiture AS nomVoiture, vehicule.marque AS marque, vehicule.idPropretaire AS idPropretaire, vehicule.prix_location AS prix_location, vehicule.pourcentage AS pourcentage, vehicule.nbPlace AS nbPlace, vehicule.carburant AS carburant, vehicule.disponibilite AS disponibilite, vehicule.attachment AS attachment FROM vehicule WHERE vehicule.matricule NOT IN (SELECT location.matricule FROM location WHERE ((location.date_debut <= ? AND location.date_fin >= ?) OR (location.date_debut <= ? AND location.date_fin >= ?)))";
    db.query(q, [date1, date1, date2, date2], (err, data) => {
        if (err) return res.json(err);

        return res.json({
            data: data
        });
    });
};

exports.rechercheVehiculeAgenda = (req, res) => {
    const matricule = req.body.searchTerm;
  //  const q = "SELECT vehicule.matricule AS matricule, vehicule.nomVoiture AS nomVoiture, vehicule.marque AS marque, vehicule.idPropretaire AS idPropretaire, vehicule.prix_location AS prix_location, vehicule.pourcentage AS pourcentage, vehicule.nbPlace AS nbPlace, vehicule.carburant AS carburant, vehicule.disponibilite AS disponibilite, location.id_location AS id FROM vehicule, location WHERE vehicule.matricule = location.matricule AND ((location.date_debut <= ? AND location.date_fin >= ? ) OR (location.date_debut <= ? AND location.date_fin >= ?)) GROUP BY vehicule.matricule";
  const q = "SELECT vehicule.matricule AS matricule, vehicule.nomVoiture AS nomVoiture, location.id_location AS id_location, DATE_FORMAT(location.date_debut, '%Y-%m-%d') AS date_debut, DATE_FORMAT(location.date_fin, '%Y-%m-%d') AS date_fin FROM vehicule, location WHERE vehicule.matricule = location.matricule AND vehicule.matricule = ?";
    db.query(q, [matricule], (err, data) => {
        if (err) return res.json(err);

        return res.json({
            data: data
        });
    });
};



/*exports.ajouterVehicule = (req, res) => {
    const attachment = req.files ? req.files.attachment : null;
    const q = "INSERT INTO vehicule (matricule, nomVoiture, marque, idPropretaire, prix_location, pourcentage, nbPlace, carburant, disponibilite, attachment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.matricule,
        req.body.nomVoiture,
        req.body.marque,
        req.body.idPropretaire,
        req.body.prix_location,
        req.body.pourcentage,
        req.body.nbPlace,
        req.body.carburant,
        req.body.disponibilite,
        null // La valeur par défaut de l'attachment
    ];

    if (attachment && attachment.size > 0) {
        if (!fileSystem.existsSync("uploads")) {
            fileSystem.mkdirSync("uploads");
        }

        const createdAt = new Date().getTime();
        const filePath = `uploads/${createdAt}-${attachment.name}`;
        fileSystem.copyFile(attachment.path, filePath, (error) => {
            if (error) {
                console.log(error);
                return res.json({
                    message: "Erreur lors de l'enregistrement du fichier",
                    status: false
                });
            }
            values[10] = filePath; // Utilisez l'indice correct pour la colonne 'attachment'
            db.query(q, values, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        message: "Erreur lors de l'insertion dans la base de données",
                        status: false
                    });
                }
                console.log(attachment ? attachment.name : '');
                return res.json({
                    message: "Véhicule ajouté avec succès",
                    status: true
                });
            });
        });
    } else {
        db.query(q, values, (err, data) => {
            if (err) {
                console.log(err);
                return res.json({
                    message: "Erreur lors de l'insertion dans la base de données",
                    status: false
                });
            }
            console.log(attachment ? attachment.name : '');
            return res.json({
                message: "Véhicule ajouté avec succès",
                status: true
            });
        });
    }
};*/
const multer = require("multer");
const path = require('path');

// Configuration de Multer pour gérer les fichiers d'attachement
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'); // Specify the destination directory for file uploads
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); // Specify the filename for uploaded files
    }
  });
  
const upload = multer({ storage: storage }).single('attachment');



exports.ajouterVehicule = (req, res) => {
    // Valider que le champ "matricule" est unique
    const qCheckMatricule = 'SELECT COUNT(*) AS count FROM vehicule WHERE matricule = ?';
    const valuesCheckMatricule = [req.body.matricule];

    db.query(qCheckMatricule, valuesCheckMatricule, (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Error querying database', status: false });
        }
        
        // Vérifiez si le matricule existe déjà dans la base de données
        if (result[0].count > 0) {
            console.log(result[0].count);
            return res.status(409).json({ message: 'Matricule already exists', status: false });
        } else {
            // Utilisez multer pour gérer les fichiers d'attachement
            upload(req, res, function (err) {
                if (err) {
                    // Handle error from multer
                    console.error('Error uploading file:', err);
                    return res.status(500).json({ message: 'Error uploading file', status: false });
                }

                const attachmentPath = req.file ? req.file.path : null;
                const q = 'INSERT INTO vehicule (matricule, nomVoiture, marque, idPropretaire, prix_location, pourcentage, nbPlace, carburant, disponibilite, attachment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const values = [
                    req.body.matricule,
                    req.body.nomVoiture,
                    req.body.marque,
                    req.body.idPropretaire,
                    req.body.prix_location,
                    req.body.pourcentage,
                    req.body.nbPlace,
                    req.body.carburant,
                    req.body.disponibilite,
                    attachmentPath
                ];

                db.query(q, values, (err, data) => {
                    if (err) {
                        console.error('Error inserting into database:', err);
                        return res.status(500).json({ message: 'Error inserting into database', status: false });
                    }
                    return res.status(200).json({ message: 'Vehicle added successfully', status: true });
                });
            });
        }
    });
};

//        const updateLocationQuery = `UPDATE location SET matricule = "${newMatricule}" WHERE matricule = "${matricule}"`;

exports.modifierVehicule = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            // Gérer l'erreur renvoyée par multer
            console.error('Erreur lors du téléversement du fichier :', err);
            return res.status(500).json({ message: 'Erreur lors du téléversement du fichier', status: false });
        }

        const attachmentPath = req.file ? req.file.path.replace(/\\/g, '/') : null;
        const matricule = req.params.matricule;
        const q = `UPDATE vehicule SET matricule = "${req.body.matricule}", nomVoiture = "${req.body.nomVoiture}", ` +
        `marque = "${req.body.marque}", idPropretaire  = "${req.body.idPropretaire}", ` +
        `prix_location = "${req.body.prix_location}", pourcentage = "${req.body.pourcentage}", ` +
        `nbPlace = "${req.body.nbPlace}", carburant = "${req.body.carburant}", disponibilite = "${req.body.disponibilite}", ` +
        `attachment = "${attachmentPath}" WHERE matricule = "${matricule}"`;
        const p = `UPDATE vehicule SET matricule = "${req.body.matricule}", nomVoiture = "${req.body.nomVoiture}", ` +
        `marque = "${req.body.marque}", idPropretaire  = "${req.body.idPropretaire}", ` +
        `prix_location = "${req.body.prix_location}", pourcentage = "${req.body.pourcentage}", ` +
        `nbPlace = "${req.body.nbPlace}", carburant = "${req.body.carburant}", disponibilite = "${req.body.disponibilite}"` +
        `WHERE matricule = "${matricule}"`;
        if (attachmentPath != null){
            db.query(q, (err, data) => {
                if (err) {
                    return res.json({
                        message: err,
                        status: false
                    });
                }
    
                return res.json({
                    message: "Véhicule modifié avec succès",
                    status: true
                });
            });
        } else {
            db.query(p, (err, data) => {
                if (err) {
                    return res.json({
                        message: err,
                        status: false
                    });
                }
    
                return res.json({
                    message: "Véhicule modifié avec succès",
                    status: true
                });
            });
        }


    });
};
/*exports.modifierVehicule = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            // Gérer l'erreur renvoyée par multer
            console.error('Erreur lors du téléversement du fichier :', err);
            return res.status(500).json({ message: 'Erreur lors du téléversement du fichier', status: false });
        }
        
        const attachmentPath = req.file ? req.file.path.replace(/\\/g, '/') : null;
        const matricule = req.params.matricule;
        const newMatricule = req.body.matricule;
        const q = `UPDATE vehicule SET matricule = "${req.body.matricule}", nomVoiture = "${req.body.nomVoiture}", ` +
        `marque = "${req.body.marque}", idPropretaire  = "${req.body.idPropretaire}", ` +
        `prix_location = "${req.body.prix_location}", pourcentage = "${req.body.pourcentage}", ` +
        `nbPlace = "${req.body.nbPlace}", carburant = "${req.body.carburant}", disponibilite = "${req.body.disponibilite}", ` +
        `attachment = "${attachmentPath}" WHERE matricule = "${matricule}"`;
        const p = `UPDATE vehicule SET matricule = "${req.body.matricule}", nomVoiture = "${req.body.nomVoiture}", ` +
        `marque = "${req.body.marque}", idPropretaire  = "${req.body.idPropretaire}", ` +
        `prix_location = "${req.body.prix_location}", pourcentage = "${req.body.pourcentage}", ` +
        `nbPlace = "${req.body.nbPlace}", carburant = "${req.body.carburant}", disponibilite = "${req.body.disponibilite}"` +
        `WHERE matricule = "${matricule}"`;
        const updateLocationQuery = `UPDATE location SET matricule = "${newMatricule}" WHERE matricule = "${matricule}"`;
        if (attachmentPath != null){
            db.query(q, (err, data) => {
                if (err) {
                    return res.json({
                        message: err,
                        status: false
                    });
                }
                db.query(updateLocationQuery, (err, locationData) => {
                    if (err) {
                        return res.json({
                            message: err,
                            status: false
                        });
                    }
                        
                return res.json({
                    message: "Véhicule modifié avec succès",
                    status: true
                });
                })
            });
        } else {
            db.query(p, (err, data) => {
                if (err) {
                    return res.json({
                        message: err,
                        status: false
                    });
                }
                db.query(updateLocationQuery, (err, locationData) => {
                    if (err) {
                        return res.json({
                            message: err,
                            status: false
                        });
                    }
                        
                return res.json({
                    message: "Véhicule modifié et location avec succès",
                    status: true
                });
                })
            });
        }


    });
};*/


exports.supprimerVehicule = (req,res) =>{
    const matricule = req.params.id
    const q = "DELETE FROM vehicule WHERE matricule = ?"
    db.query(q,[matricule],(err,data) =>{
        if (err) return res.json({
            message : "Vehicule n'est pas supprimé avec succès",
            status: false
        })

        return res.json({  
            message : "Vehicule supprimé avec succès",
            status : true
        })
    })
};