const db = require("../../config/connection")

module.exports ={
    serviceGetAnggota:(callBack)=>{
        db.query(
            'SELECT * FROM anggota',(err,result,fields)=>{
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, result)
                } 
            }
        )
    },
    serviceGetAnggotaById: (kd_anggota, callBack) => {
        db.query(
            `select * from anggota where kd_anggota = ?`,
            [kd_anggota],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results[0]);
                }
            }
        );
    },
    serviceAddAnggota: (data, callBack)=>{
        db.query(
            'insert into anggota(nm_anggota, alamat, tlpn, email, password) values (?,?,?,?,?)',
            [
                data.nm_anggota,
                data.alamat,
                data.tlpn,
                data.email,
                data.password,
                data.kd_anggota
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

serviceUpdateAnggota: (data, callBack) =>{
    db.query(
        'update anggota set nm_anggota=?, alamat=?, tlpn=?, email=?, password=? where kd_anggota=?',
        [
            data.nm_anggota,
            data.alamat,
            data.tlpn,
            data.email,
            data.password,
            data.kd_anggota
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

    serviceDeleteAnggota: (data, callBack) =>{
        db.query(
            `delete from anggota where kd_anggota=?`,
            [data.id],
            (err, result)=>{
                if (err) {
                    return callBack(err)
                }if(!result){
                    callBack(result)
                }
                else {
                    return callBack(null, result)
                }
            }
        )
    },
    serviceGetAnggotaByEmail: (email, callBack) => {
        db.query(
            `select nm_anggota, email, password from anggota where email = ?`,
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
