const {
    serviceAddPinjam,
    serviceGetPinjam,
    serviceGetPinjamById,
    serviceUpdatePinjam,
    serviceDeletePinjam
} = require('./pinjam.service');
let { genSaltSync, hashSync } = require("bcrypt");
const { verify } = require('jsonwebtoken');

module.exports = {
    controllerPeminjaman: (req, res) => {
        const body = req.body
        const token = req.get("authorization")
        if (token) {
            let wow = token.slice(7)
            verify(wow, "secretkey", (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Login First"
                    })
                } else {
                    var user = decoded.result
                    const data = {
                        kd_buku: body.kd_buku,
                        kd_anggota: body.kd_anggota,
                        kd_petugas: user.kd_petugas,
                        tgl_pinjam: body.tgl,
                    }
                    serviceAddPinjam(data, (err, results) => {
                        if (err) {
                            if (err === "out of stok") {
                                return res.json({
                                    success: 0,
                                    message: "Stok Habis"
                                })
                            }
                            if (err === "stok tdk cukup") {
                                return res.json({
                                    success: 0,
                                    message: "Permintaan Terlalu Banyak"
                                })
                            }
                            if (err === "No-Id") {
                                return res.json({
                                    success: 0,
                                    message: "Tidak Ditemukan"
                                })
                            }
                            console.log(err);
                            return;
                        }
                        if (!results) {
                            return res.json({
                                success: 0,
                                message: "Tidak Ditemukan"
                            })
                        } else {
                            return res.json({
                                success: 1,
                                message: "Terpinjam"
                            })
                        }
                    })
                }
            })
        }
    },
    controllerGetPinjamById: (req, res) => {
        let no_pinjam = req.params.id;
        serviceGetPinjamById(no_pinjam, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Record not found"
                });
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerGetPinjam: (req, res) => {
        serviceGetPinjam((err, results) => {
            if (err) {
                console.error(err);
                return;
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerUpdatePinjam: (req, res) => {
        let body = req.body;
        serviceUpdatePinjam(body, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "update failed"
                });
            } else {
                return res.json({
                    succes: 1,
                    message: "update lur"
                });
            }
        });
    },
    controllerDeletePinjam: (req, res) => {
        let data = req.body
        serviceDeletePinjam(data, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Record not found"
                });
            } else {
                return res.json({
                    succes: 1,
                    message: "user delete succesfuly"
                });
            }
        });
    }

}