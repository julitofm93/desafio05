//DEPENDENCIAS
import express from 'express';
import cors from 'cors'
import Contenedor from './classes/Contenedor.js'
import productosRouter from './routes/productos.js'
import upload from './services/upload.js'
const app = express();


//CONFIGURO EL SERVIDOR
const server = app.listen(8080,()=>{
    console.log("server listening on port 8080")
})


const contenedor = new Contenedor();

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.static('public'))
app.use('/api/productos',productosRouter);

app.get('/',(req,res)=>{
    res.render('formulario')
})

app.post('/api/uploadfile',upload.single('file'),(req,res)=>{
    const file = req.file;
    if(!file||file.length===0){
        res.status(500).send({message:"No se subio ningun archivo"})
    }
    res.send(file);
})

app.get('/views/productos',(req,res)=>{
    contenedor.getAll().then(result=>{
        let info = result.payload;
        let preparedObject = {
            productos : info
        }
        
        res.render('productos', preparedObject)
        
    })
})
