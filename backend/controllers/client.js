const db = require("../models/connection.js")

exports.afficherClient = (req, res) => {
  //  const q = "SELECT clients.id_client AS id_client, clients.nom AS nom, clients.prenom AS prenom, clients.email AS email, clients.password AS password, clients.telephone AS telephone , clients.adresse AS adresse, DATEDIFF(location.date_debut, location.date_fin) AS nombre_jours, ((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) - location.montant) AS reste_payer FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule";
  const q = "SELECT * FROM clients";
    db.query(q, (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data
        })
    })
};
exports.afficherNbClient = (req, res) => {
    //  const q = "SELECT clients.id_client AS id_client, clients.nom AS nom, clients.prenom AS prenom, clients.email AS email, clients.password AS password, clients.telephone AS telephone , clients.adresse AS adresse, DATEDIFF(location.date_debut, location.date_fin) AS nombre_jours, ((DATEDIFF(location.date_fin, location.date_debut)*vehicule.prix_location) - location.montant) AS reste_payer FROM clients, vehicule, location WHERE location.client = clients.id_client AND location.matricule = vehicule.matricule";
    const q = "SELECT COUNT(*) AS nombre FROM clients";
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
    const q = "SELECT id_client, nom, prenom, email, password, telephone , adresse FROM clients WHERE nom LIKE ? OR prenom LIKE ? OR telephone LIKE ? OR adresse LIKE ?";
    db.query(q, [recherche, recherche, recherche, recherche], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data
        })
    })
};

exports.ajouterClient = (req, res) => {
    const q = "INSERT INTO clients(nom, prenom, email, password, telephone, adresse) VALUES(?)"
    const values = [req.body.nom, req.body.prenom, req.body.email, req.body.password,
    req.body.telephone, req.body.adresse]
    db.query(q, [values], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data,
            retour : "Client ajouté avec succès"
        })
    })
};

exports.modifierClient = (req, res) => {
    const id = req.params.id
    q = `UPDATE clients SET nom = "${req.body.nom}", prenom = "${req.body.prenom}", email = "${req.body.email}", ` + 
    `password = "${req.body.password}", telephone = "${req.body.telephone}", adresse = "${req.body.adresse}" WHERE id_client = ${id}`
    db.query(q, (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data,
            retour : "Client modifié avec succès"
        })
    })
}

exports.supprimerClient = (req, res) => {
    const id = req.params.id
    q = "DELETE FROM clients WHERE id_client = ?"
    db.query(q, [id], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data,
            retour : "Client supprimé avec succès"
        })
    })
}