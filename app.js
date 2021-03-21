require("dotenv").config();
const express = require('express')
const app = express()
const petugasRouter = require("./api/petugas/petugasRouter")
const anggotaRouter = require("./api/anggota/anggotaRouter")
const bukuRouter = require("./api/buku/bukuRouter")

const bodyParser = require('body-parser')

// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));
app.use("/api/petugas", petugasRouter)
app.use("/api/anggota", anggotaRouter)
app.use("/api/buku", bukuRouter)

app.listen(process.env.APP_PORT, ()=>{
    console.log("running on port "+process.env.APP_PORT)
})