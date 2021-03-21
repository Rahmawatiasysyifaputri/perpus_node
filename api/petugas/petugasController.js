const {
    serviceAddPetugas,
    serviceGetPetugas,
    serviceUpdatePetugas,
    serviceDeletePetugas,
    serviceGetPetugasByEmail,
    serviceGetPetugasById

} = require("./petugasService")
let { genSaltSync, hashSync, compareSync } = require("bcrypt");
let { sign } = require("jsonwebtoken");

module.exports = {
    controllerGetPetugas:(req,res)=>{
        serviceGetPetugas((err,result)=>{
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
    controllerGetPetugasById: (req, res) => {
        const id = req.params.id;
        serviceGetPetugasById(id, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Record not found"
                })
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerAddPetugas: (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        serviceAddPetugas(body, (err, results)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success : 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    controllerUpdatePetugas: (req, res) =>{
        //const id = req.params
        const body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        serviceUpdatePetugas( body, (err, results) =>{
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
                    results
                })
            }
        })
    },
    controllerDeletePetugas: (req, res) =>{
        const id = req.params

        serviceDeletePetugas(id, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            else if(!results){
                return res.json({
                    success: 0,
                    message: "record not found"
                })
            }
            else{
                return res.json({
                    success: 1,
                    message: "Berhasil dihapus"
                })
            }
        })
    },
    controllerLogin: (req, res)=> {
        const body = req.body;
        serviceGetPetugasByEmail(body.email, (err, results)=>{
            console.log(results)
            if(err){
                console.log(err)
            }
            if(!results){ 
                return res.json({
                    success: 0,
                    message: "Invalid email",
                   
                });
            }
            const result = compareSync(body.password, results.password);
            console.log(result);

            if(result){
                results.password = undefined;
                const jsonwebtoken = sign({ result: results }, "secretkey",{
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfuly, your account already use",
                    account: results,
                    token: jsonwebtoken
                });
            }else{
                return res.json({
                    success: 0,
                    message: "password invalid"
                });
            }
        });
    }
};

