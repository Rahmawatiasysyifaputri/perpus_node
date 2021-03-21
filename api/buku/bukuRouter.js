const{
    controllerAddBuku,
    controllerGetBuku,
    controllerUpdateBuku,
    controllerDeleteBuku

} = require("./bukuController");

const router = require("express").Router();

router.post("/", controllerAddBuku);
router.get("/", controllerGetBuku);
router.patch("/:id", controllerUpdateBuku);
router.delete("/:id", controllerDeleteBuku);

module.exports = router;