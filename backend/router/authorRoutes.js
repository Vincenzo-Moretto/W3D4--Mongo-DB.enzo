import express, {json} from 'express';
import AuthorR from '../models/authorRegSchema.js'
import uploadCloudinary from '../middleware/uploadCloudinary.js';
import { getAuthors, getSingleAuthor, addAuthor, editAuthor, deleteAuthor, patchAuthor } from '../controllers/author.controller.js';


const router = express.Router()

router.get('/', getAuthors)
router.get('/:id',getSingleAuthor)
router.post('/', addAuthor)
router.put ('/:id', editAuthor)
router.delete ('/:id', deleteAuthor)
router.patch('/:authorId/avatar', uploadCloudinary.single('avatar'), patchAuthor)

// get per richiamare tutti gli autori
/*router.get("/", async (req,res)=>{
    const page = req.query.page || 1
    let perPage = req.query.perPage || 3
    perPage = perPage > 10 ? 5 : perPage
    try {
        const allAuthors = await Author.find({})
        .collation({locale: 'it'}) //serve per ignorare maiuscole e minuscole nell'ordine alfabetico del sort
        .sort({name:1, surname:1}) 
        .skip((page-1)*perPage)//salto la pagina precedente
        .limit(perPage)
        const totalResults = await Author.countDocuments()// mi da il numero totale di documenti
        const totalPages = Math.ceil(totalResults / perPage )  
        // res.send(allAuthors)
        res.send({
            dati: allAuthors,
            totalResults,
            totalPages,
            page,

        })
    } catch (error) {
        res.status(404).send({message: 'Not Found'})
    }
    
})*/

//questa è la get per richiamare un singolo autore tramite id
/*
router.get("/:id", async (req,res)=>{
    const {id} =req.params
    try {
        const author = await Author.findById(id)
        res.status(200).send(author) 
    } catch (error) {
        res.status(404).send({message: 'Not Found'}) 
    }
})*/

/*router.post("/", async (req,res)=>{
    //crea un nuova istanza del modello autore con i dati definiti nella parentesi tonde (prendendoli dal body)
    // console.log(req.body)
    const author = new Author (req.body)
    author.avatar = author.avatar ? author.avatar : "https://picsum.photos/40" //se l'avatar c'è me lo restituisci così com'è altrimenti mi restituisci la stringa "https://picsum.photos/40"
    try {
         //salva i dati prendendoli nel db , prendendoli dall'istanza
        const newAuthor = await author.save()
        //invia i dati al database
        res.status(200).send(newAuthor)
    } catch (error) {
        res.status(400).send(error)
    }
})*/

/*router.put("/:id", async (req,res)=>{
    const {id} =req.params
    try {
        const author = await Author.findByIdAndUpdate(id, req.body, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
        await author.save();
        // res.send(`sono la put e modifico l'autore con id ${id}`)
        res.status(200).send(author)
    } catch (error) {
        res.status(400).send(error)
    }
    
})*/

/*router.delete("/:id", async (req,res)=>{
    const {id} =req.params
    try {
        //se l'id esiste nello schema allora fai la delete
        if (await Author.exists({_id:id})){
            await Author.findByIdAndDelete(id)
            res.status(200).send(`ho eliminato l'autore con id: ${id}`)
        }else {res.status(404).send({message: `ID ${id} not found`})}
        
    } catch (error) {
        res.status(404).send({message: `ID ${id} not found`})
    }
    
})*/

/*router.patch('/:authorId/avatar', uploadCloudinary.single('avatar'),async (req,res)=>{ //importo il middlware uploadCloudinary
    const {authorId} =req.params
    try {
        const author = await Author.findByIdAndUpdate(authorId, {avatar: req.file.path}, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
        await author.save();//non è necessario
        res.status(200).send(author)
    } catch (error) {
        res.status(400).send(error)
    }
    
})//uso patch per modificare il contenuto sul server di una risorsa che esiste già sul db.
*/

export default router