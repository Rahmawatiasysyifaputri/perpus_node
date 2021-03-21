const {
    serviceAddAnggota,
    serviceGetAnggota,
    serviceUpdateAnggota,
    serviceDeleteAnggota,
    serviceGetAnggotaByEmail,
    serviceGetAnggotaById
} = require("./anggotaService")
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    controllerGetAnggota:(req,res)=>{
        serviceGetAnggota((err,result)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success : 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                result
            })
        })
    },
    controllerGetAnggotaById: (req, res) => {
        let kd_anggota = req.params.id;
        serviceGetAnggotaById(kd_anggota, (err, results) => {
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
    controllerAddAnggota: (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(`${body.password}`, salt);
        serviceAddAnggota(body, (err, results)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success : 0,
                    message: "Database connection error"
                })
            }else {
                return res.status(200).json({
                    success: 1,
                    body
                });
            }
        })
    },
    controllerUpdateAnggota: (req,res) =>{
        const body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        serviceUpdateAnggota(body, (err, results) =>{
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message:"update failed"
                })
            }else{
                return res.json({
                    success: 1,
                    message: "update berhasil",
                })
            }
        })
    },
    controllerDeleteAnggota: (req, res) =>{
        const id = req.params

        serviceDeleteAnggota(id, (err, results)=>{
            if (err) {
                console.log(err)
                return res.json({
                    message: "Delete Anggota Failed"
                })
            } else {
                res.json({
                    message: "Data berhasil dihapus"
                })
            }
        })
    },
    controllerLogin: (req, res) => {
        let body = req.body;
        serviceGetAnggotaByEmail(body.email, (err, results) => {
            if (err) {
                console.error(err);
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Invalid email or password"
                });
            }
            let result = compareSync(body.password, results.password);

            if (result) {
                results.password = undefined;
                let jsonwebtoken = sign({ result: results }, "secretkey", {
                    expiresIn: "1h"
                });
                return res.json({
                    succes: 1,
                    message: "login succesfuly, your Account Already Use",
                    account: results,
                    token: jsonwebtoken
                });
            } else {
                return res.json({
                    succes: 0,
                    message: "email or password invalid"
                });
            }
        });
    }
}

