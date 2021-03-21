const {
    controllerAddPetugas,
    controllerUpdatePetugas,
    controllerGetPetugas,
    controllerDeletePetugas,
    controllerGetPetugasById,
    controllerLogin


} = require("./petugasController");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/", controllerAddPetugas);
router.get("/", checkToken, controllerGetPetugas);
router.get("/:id", checkToken, controllerGetPetugasById);
router.patch("/:id", checkToken, controllerUpdatePetugas);
router.delete("/:id", checkToken, controllerDeletePetugas);
router.post("/login", controllerLogin);

module.exports = router;