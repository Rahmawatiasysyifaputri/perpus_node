const db = require("../../config/connection")

module.exports ={
    
    serviceGetPetugas: callBack =>{
        db.query(
            'SELECT * FROM petugas',(err,result,fields)=>{
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, result)
                } 
            }
        )
    },
    serviceGetPetugasById: (kd_petugas, callBack) => {
        db.query(
            `select * from petugas where kd_petugas = ?`,
            [kd_petugas],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results[0]);
                }
            }
        );
    },

    serviceAddPetugas: (data, callBack)=>{
        db.query(
            'insert into petugas(nm_petugas, jabatan, tlpn_petugas, email, password) values (?,?,?,?,?)',
            [
                data.nm_petugas,
                data.jabatan,
                data.tlpn_petugas,
                data.email,
                data.password
            ],
            (err, result, fields) =>{
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, result)
                }
            }
        )
    },

serviceUpdatePetugas: (data, callBack)=>{
    db.query(
        `update petugas set nm_petugas=?, jabatan=?, tlpn_petugas=?, email=?, password=? where kd_petugas=?`,
        [
            data.nm_petugas,
            data.jabatan,
            data.tlpn_petugas,
            data.email,
            data.password,
            data.id
        ],
        (err, results, fields) =>{
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results)
            }
          }
        )
    },

serviceDeletePetugas: (data, callBack) =>{
    db.query(
            `delete from petugas where kd_petugas=?`,
            [data.id],
            (err, result,)=>{
                if (err) {
                    return callBack(err)
                }if(!result){
                    callBack(result)
                }
                else{
                    return callBack(null, result)
                }    
            }
            
        )
    },
    serviceGetPetugasByEmail: (email, callBack) => {
        db.query(
            `select kd_petugas, nm_petugas, email, password from petugas where email=?`,
            [email],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results[0]);
                }
            }
        );
    }
}