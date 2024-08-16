const express = require(("express"))
const router = express.Router()

const AdminController = require("../controllers/admin")

router.get("/", AdminController.afficherAdmin)
router.post("/", AdminController.ajouterAdmin)
router.put("/:id", AdminController.modifierAdmin)
router.delete("/:id", AdminController.supprimerAdmin)

module.exports = router