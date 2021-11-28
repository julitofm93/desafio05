import express from 'express'
import multer from 'multer'
import Contenedor from '../classes/contenedor.js';
import upload from '../services/upload.js'
const router = express.Router();
const contenedor = new Contenedor();


//GET - Devuelve todos los productos
router.get('/',(req,res)=>{
    contenedor.getAll().then(result=>{
        res.render('result')
    })
})

//POST - Recibe y agrega un producto, y lo devuelve con su ID asignado
router.post('/',upload.single('image'),(req,res)=>{
    let file = req.file;
    let event = req.body;
    event.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
    contenedor.save(event).then(result=>{
        console.log(event)
        res.send(result);
    })
})


export default router;