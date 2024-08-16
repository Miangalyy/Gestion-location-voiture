const db = require("../models/connection.js")

exports.afficherClient = (req, res) => {
  //  const q = "SELECT clients.id_client AS id_client, clients.nom AS nom, clients.prenom AS prenom, clients.email AS email, clients.password AS password, clients.telephone AS telephone , clients.adresse AS adresse, DATEDIFF(location.date_debut, location.date_fin) AS nombre_jours, ((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) - location.montant) AS reste_payer FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule";
  const q = "SELECT * FROM proprietaire";
    db.query(q, (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data
        })
    })
};
exports.afficherClientStatut = (req, res) => {
    const statut = req.body.statut;
    const q = "SELECT clients.id_client AS id_client, clients.nom AS nom, clients.prenom AS prenom, clients.email AS email, clients.password AS password, clients.telephone AS telephone , clients.adresse AS adresse, DATEDIFF(location.date_debut, location.date_fin) AS nombre_jours, SUM(((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) - location.montant)) AS reste_payer FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule AND location.statut = ? GROUP BY clients.id_client";
    db.query(q, [statut], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data
        })
    })
};

exports.rechercheClient = (req, res) => {
    const matricule = req.body.searchTerm;
    const recherche = `%${matricule}%`; 
    const q = "SELECT id_propretaire, nom, prenom, mail, telephone, adresse FROM proprietaire WHERE nom LIKE ? OR prenom LIKE ? OR telephone LIKE ? OR adresse LIKE ?";
    db.query(q, [recherche, recherche, recherche, recherche], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data
        })
    })
};

exports.ajouterClient = (req, res) => {
    const q = "INSERT INTO proprietaire(nom, prenom, mail, telephone, adresse) VALUES(?)"
    const values = [req.body.nom, req.body.prenom, req.body.email, req.body.telephone, req.body.adresse]
    db.query(q, [values], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data,
            retour : "Proprietaire ajouté avec succès"
        })
    })
};

exports.modifierClient = (req, res) => {
    const id = req.params.id
    q = `UPDATE proprietaire SET nom = "${req.body.nom}", prenom = "${req.body.prenom}", mail = "${req.body.email}", ` + 
    `telephone = "${req.body.telephone}", adresse = "${req.body.adresse}" WHERE id_propretaire = ${id}`
    db.query(q, (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data,
            retour : "Proprietaire modifié avec succès"
        })
    })
}

exports.supprimerClient = (req, res) => {
    const id = req.params.id
    q = "DELETE FROM proprietaire WHERE id_propretaire = ?"
    db.query(q, [id], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data,
            retour : "Proprietaire supprimé avec succès"
        })
    })
}