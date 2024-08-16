const express = require("express")
const router = express.Router()

const LocationController = require("../controllers/location")

router.get("/", LocationController.afficherLocation)
router.get("/taux", LocationController.afficherTauxLocation)
router.get("/somme", LocationController.afficherSommeLocation)
router.get("/gain", LocationController.afficherGainLocation)
router.get("/dette", LocationController.afficherDette)
router.get("/vambevola", LocationController.afficherVamBevola)
router.get("/clients", LocationController.afficherClients);
router.get("/:id", LocationController.afficherLocationModifier)
router.post("/recherche", LocationController.rechercheLocation)
router.post("/", LocationController.ajouterLocation)
router.post("/montant", LocationController.afficherMontantVehicule)
router.post("/modif/montant", LocationController.montantApayer)
router.put("/:id", LocationController.modifierLocation)
router.delete("/:id", LocationController.supprimerLocation)

module.exports = router