const db = require("../models/connection")

exports.afficherLocation = (req, res) => {
    //SELECT (SUM((vehicule.pourcentage*(((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))))/(SUM((((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))))) AS somme FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule;
    //SELECT SUM((((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))) AS somme FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule;
    const q = "SELECT location.id_location AS id_location, location.matricule AS matricule, clients.nom AS nom , clients.prenom AS prenom, DATE_FORMAT(location.date_debut, '%Y-%m-%d') AS date_debut, DATE_FORMAT(location.date_fin, '%Y- %m-%d') AS date_fin, (DATEDIFF(location.date_fin, location.date_debut)) AS nombre_jours, location.montant AS montant, location.statut AS statut FROM location, clients WHERE location.client = clients.id_client";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.json({
            data : data
        })
    })
};

exports.rechercheLocation = (req, res) => {
    const matricule = req.body.searchTerm;
    const recherche = `%${matricule}%`; 
    const q = "SELECT location.id_location AS id_location, location.matricule AS matricule, clients.nom AS nom , clients.prenom AS prenom, DATE_FORMAT(location.date_debut, '%Y-%m-%d') AS date_debut, DATE_FORMAT(location.date_fin, '%Y- %m-%d') AS date_fin, (DATEDIFF(location.date_fin, location.date_debut)) AS nombre_jours, location.montant AS montant, location.statut AS statut FROM location, clients WHERE location.client = clients.id_client AND(location.matricule LIKE ? OR clients.nom LIKE ? OR clients.prenom LIKE ? OR DATE_FORMAT(location.date_debut, '%Y-%m-%d') LIKE ?)";
    db.query(q, [recherche, recherche, recherche, recherche], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data
        })
    })
};

exports.montantApayer = (req, res) => {
    const date1 = req.body.searchTerm1;
    const date2 = req.body.searchTerm2;
    const voiture = req.body.searchTerm3;
    const q = "SELECT (DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) AS montantpayer FROM location, vehicule WHERE vehicule.matricule = ? AND location.date_debut = ? AND location.date_fin = ?";
    db.query(q, [matricule], (err, data) => {
        if (err) return res.json(err);

        return res.json({
            data: data
        });
    });
};
exports.afficherMontantVehicule = (req,res) => {
    const matricule = req.body.searchTerm;
    const q = "SELECT prix_location FROM vehicule WHERE matricule = ?"
    db.query(q, [matricule], (err,data) => {
        if (err) return res.json(err)

        return res.json({
            "data" : data 
        });
    })
};

exports.afficherSommeLocation = (req, res) => {
    //SELECT (SUM((vehicule.pourcentage*(((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))))/(SUM((((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))))) AS somme FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule;
    //SELECT SUM((((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))) AS somme FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule;
    const q = "SELECT SUM((((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))) AS somme FROM vehicule, location WHERE location.matricule = vehicule.matricule";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.json({
            data : data
        })
    })
};
exports.afficherGainLocation = (req, res) => {
    //SELECT (SUM((vehicule.pourcentage*(((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))))/(SUM((((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))))) AS somme FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule;
    //SELECT SUM((((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))) AS somme FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule;
    const q = "SELECT (SUM((vehicule.pourcentage*(((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))))/(SUM((((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) ))))) AS gain FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.json({
            data : data
        })
    })
};
exports.afficherTauxLocation = (req, res) => {
    const q = "SELECT MONTH(location.date_debut) AS mois, SUM((vehicule.pourcentage*(((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) )))/100) AS pourcentageVola FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule GROUP BY MONTH(location.date_debut)";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.json({
            data : data
        })
    })
};
exports.afficherVamBevola = (req, res) => {
    const q = "SELECT vehicule.nomVoiture AS nomVoiture, SUM((vehicule.pourcentage*(((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) )))/100) AS pourcentageVola FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule GROUP BY vehicule.matricule ORDER BY pourcentageVola DESC LIMIT 5";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.json({
            data : data
        })
    })
};
exports.afficherDette = (req, res) => {
    const q = "SELECT SUM(((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) - location.montant))*100/(SUM((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location))) AS pourcentage FROM location, vehicule WHERE location.matricule = vehicule.matricule";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.json({
            data : data
        })
    })
};

exports.afficherClients = (req, res) => {
    const q = "SELECT * FROM clients";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.json({
            data : data
        })
    })
};
exports.afficherLocationModifier = (req,res) => {
    const id = req.params.id
    const q = "SELECT id_location, matricule, client, DATE_FORMAT(date_debut, '%Y/%m/%d') AS date_debut,  DATE_FORMAT(date_fin, '%Y/%m/%d') AS date_fin, montant, statut FROM location WHERE id_location = ?"
    db.query(q, [id], (err,data) => {
        if (err) return res.json(err)

        return res.json({
            data : data 
        });
    })
};

exports.ajouterLocation = (req, res) => {
    const q = "INSERT INTO location (matricule, client, date_debut, date_fin, montant, statut) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.matricule, req.body.client, req.body.date_debut, req.body.date_fin, req.body.montant, req.body.statut];
    db.query(q, values, (err, data) => {
        if(err) return res.json(err)
         
        return res.json({
            message: "Véhicule modifié avec succès",
            status: true
        });
    })
};

exports.modifierLocation = (req, res) => {
    const id = req.params.id
    const q = `UPDATE location SET matricule = "${req.body.matricule}", ` +
    `client = "${req.body.client}", date_debut = "${req.body.date_debut}", date_fin = "${req.body.date_fin}", ` +
    `montant = "${req.body.montant}", statut = "${req.body.statut}" WHERE id_location = ${id}`;
    db.query(q, (err, data) => {
        if(err)  return res.json(err)
        
        return res.json({
            data : data,
            result : "Location modifiée avec succès"
        })
    })
}

exports.supprimerLocation = (req, res) => {
    const id = req.params.id
    const q = "DELETE FROM location WHERE id_location = ?"
    db.query(q, [id], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            message : "Location supprimé avec succès",
            status : true
        })
    })
}