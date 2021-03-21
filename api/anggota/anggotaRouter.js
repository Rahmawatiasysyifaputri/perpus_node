const {
    controllerAddAnggota,
    controllerGetAnggota,
    controllerGetAnggotaById,
    controllerUpdateAnggota,
    controllerDeleteAnggota,
    controllerLogin

} = require("./anggotaController");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/", controllerAddAnggota);
router.get("/", checkToken, controllerGetAnggota);
router.get("/:id", checkToken, controllerGetAnggotaById)
router.patch("/:id", checkToken, controllerUpdateAnggota);
router.delete("/:id", checkToken, controllerDeleteAnggota);
router.post("/login", checkToken, controllerLogin)

module.exports = router;