const {
    controllerPeminjaman,
    controllerGetPinjam,
    controllerGetPinjamById,
    controllerUpdatePinjam,
    controllerDeletePinjam
} = require("./pinjam.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token");

router.post("/tambahpinjam", checkToken, controllerPeminjaman);
router.get("/ambilpinjam", checkToken, controllerGetPinjam);
router.get("/:id", checkToken, controllerGetPinjamById);
router.patch("/editpinjam", checkToken, controllerUpdatePinjam);
router.delete("/hapuspinjam", checkToken, controllerDeletePinjam);


module.exports = router;