let db = require('../../config/connection');

module.exports = {
    serviceAddPinjam: (data, callBack) => {
        db.query(
            `select * from buku where kd_buku=?`,
            [data.kd_buku], (err, results) => {
                if (err) {
                    console.log(err);
                    return callBack(err)
                } if (results.length < 1) {
                    return callBack("No-Id")
                } else if (results[0].stok <= 0) {
                    return callBack("out of stok")
                } else if (results[0].stok < data.stok) {
                    return callBack("stok tdk cukup")
                }
                else {
                    const data_barang = results[0];
                    const sedia = data_barang.stok - 1;
                    // const kategori = data_barang.item_kategori;
                    // console.log(results[0].namaBarang);
                    db.query(
                        `update buku set stok=? where kd_buku=?`,
                        [
                            sedia,
                            data.kd_buku
                            // data.kategori
                        ]
                    );
                    db.query(
                        `insert into peminjam(kd_buku,kd_anggota,kd_petugas,tgl_pinjam)
                            values(?,?,?,?)`,
                        [
                            data_barang.kd_buku,
                            data.kd_anggota,
                            data.kd_petugas,
                            data.tgl_pinjam
                        ],
                        (err, res) => {
                            console.log(res, err);

                        }
                    );
                    return callBack(null, results)
                }
            }
        )
    },
    serviceGetPinjam: callBack => {
        db.query(`select * from peminjam`, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    serviceGetPinjamById: (no_pinjam, callBack) => {
        db.query(
            `select * from peminjam where no_pinjam = ?`,
            [no_pinjam],
            (err, resuls, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, resuls[0]);
                }
            }
        );
    },
    serviceUpdatePinjam: (data, callBack) => {
        db.query(
            `update peminjam set kd_buku=?, kd_anggota=? ,tgl_pinjam=? where no_pinjam=?`,
            [
                data.kd_buku,
                data.kd_anggota,
                data.tgl_pinjam,
                data.no_pinjam
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    serviceDeletePinjam: (data, callBack) => {
        db.query(`select * from peminjam where no_pinjam=?`,
            [data.no_pinjam],
            (err, result) => {
                if (err) {
                    callBack(err)
                } if (!result) {
                    callBack(result)
                } else {
                    db.query(`delete from peminjam where no_pinjam=?`,
                        [data.no_pinjam])
                    return callBack(null, result[0])
                }
            })
    }
};