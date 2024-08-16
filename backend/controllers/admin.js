const db = require('../models/connection')

exports.afficherAdmin = (req, res) => {
    const q = "SELECT * FROM admin"
    db.query(q, (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data
        })
    })
}

exports.ajouterAdmin = (req, res) => {
    const q = "INSERT INTO admin(idAdmin, nom, mot_de_passe) VALUES(?)"
    const values = [null, req.body.nom, req.body.mot_de_passe]
    db.query(q, [values], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data,
            retour : "Admin ajouté avec succès"
        })
    })
}

exports.modifierAdmin = (req, res) => {
    const id = req.params.id
    const q = `UPDATE admin SET nom = "${req.body.nom}", mot_de_passe = "${req.body.mot_de_passe}" ` +
    `WHERE idAdmin = ${id}`
    db.query(q, (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data,
            retour : "Admin modifié avec succès"
        })
    })
}

exports.supprimerAdmin = (req, res) => {
    const id = req.params.id
    const q = "DELETE FROM admin WHERE idAdmin = ?"
    db.query(q, [id], (err, data) => {
        if(err)  return res.json(err)

        return res.json({
            data : data,
            retour : "Admin supprimé avec succès"
        })
    })
}