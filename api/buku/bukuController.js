const {
    serviceAddBuku,
    serviceGetBuku,
    serviceUpdateBuku,
    serviceDeleteBuku

} = require("./bukuService")

module.exports = {
    controllerGetBuku: (req, res)=>{
        const body = req.body;
        serviceGetBuku((err, result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                result
            })
        })
    },
    controllerGetBukuById: (req, res) => {
        let kd_buku = req.params.id;
        serviceGetBukukuById(kd_buku, (err, results) => {
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
    controllerAddBuku: (req, res)=>{
        const data = req.body;
        console.log(data);
        serviceAddBuku(data, (err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data
            })
        })
    },
    controllerUpdateBuku: (req, res)=>{
        const body = req.body
        const param = req.params
        const data = {
            nm_buku : body.nm_buku,
            pengarang : body.pengarang,
            penerbit : body.penerbit,
            tarif : body.tarif,
            durasi : body.durasi,
            kd_buku : param

        }
        serviceUpdateBuku(body, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Update failed" 
                })
            }else{
                return res.json({
                    success: 1,
                    message: "Update Successfuly",
                    body
                })
            }
        })
    },
    controllerDeleteBuku: (req, res)=>{
        const id = req.params
        serviceDeleteBuku(id, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }else{
                return res.json({
                    success: 1,
                    message: "Delete Success"
                })
            }
        })
    }
}
