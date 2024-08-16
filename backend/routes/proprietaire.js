const express = require("express")
const router = express.Router()

const ClientController = require("../controllers/proprietaire")

router.get("/", ClientController.afficherClient)
router.post("/", ClientController.ajouterClient)
router.post("/filtrerParStatut", ClientController.afficherClientStatut)
router.post("/recherche", ClientController.rechercheClient)
router.put("/:id", ClientController.modifierClient)
router.delete("/:id", ClientController.supprimerClient)

module.exports = router