const express = require("express")
const router = express.Router()

const VehiculeController = require('../controllers/vehicule')

router.get("/", VehiculeController.afficherVehicule)
router.get("/nombre", VehiculeController.afficherNbVehicule)
router.get("/propnombre", VehiculeController.afficherPropVehicule)
router.get("/proprietaire", VehiculeController.afficherProprietaire)
router.get("/:matricule", VehiculeController.afficherVehiculeModifier)
router.post("/search", VehiculeController.rechercheVehicule)
router.post("/agenda", VehiculeController.rechercheVehiculeAgenda)
router.post("/filtrerParProprietaire", VehiculeController.rechercheVehiculeParProprietaire)
router.post("/filtrerParDisponibilite", VehiculeController.rechercheVehiculeParDisponibilite)
router.post("/", VehiculeController.ajouterVehicule)
router.put("/:matricule", VehiculeController.modifierVehicule)
router.delete("/:id", VehiculeController.supprimerVehicule)

module.exports = router