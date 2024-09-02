import express, {json} from 'express';
import Post from '../models/postSchema.js'
import uploadCloudinary from '../middleware/uploadCloudinary.js';
import {addPost, deletePost, editPost, getPost, getSinglePost, patchPost } from '../controllers/post.controller.js';
import { createComment, deleteComment, editComment, getComments, getSingleComment } from '../controllers/comment.controller.js';


const router = express.Router()
//rotte per i post
router.get('/', getPost)
router.get('/:id', getSinglePost)
router.post ('/',  uploadCloudinary.single('cover'), addPost )
router.put ('/:id', editPost)
router.delete ('/:id', deletePost)
router.patch('/:blogPostId/cover', uploadCloudinary.single('cover'), patchPost)

//rotte per i commenti
router.post('/:postId/comments',createComment)
router.get('/:postId/comments', getComments)
router.get('/:postId/comments/:commentId', getSingleComment)
router.put('/:postId/comment/:commentId', editComment)
router.delete('/:postId/comment/:commentId', deleteComment)

// get per richiamare tutti i post
/*router.get("/", async (req,res)=>{
    const page = req.query.page || 1
    let perPage = req.query.perPage || 8
    perPage = perPage > 10 ? 8 : perPage
    try {
        const allPosts = await Post.find(req.query.title? {title: {$regex: req.query.title ,$options: "i"}}: {}) //il find sulla ricerca di un post con il titolo
        .collation({locale: 'it'}) //serve per ignorare maiuscole e minuscole nell'ordine alfabetico del sort
        .sort({ title:1, category:1})
        .skip((page-1)*perPage)
        .limit(perPage)

        const totalResults = await Post.countDocuments()// mi da il numero totale di documenti
        const totalPages = Math.ceil(totalResults / perPage ) 
        res.send({
            dati: allPosts,
            page,
            totalPages,
            totalResults,
        })
        
    } catch (error) {
        res.status(404).send({message: 'Not Found'})
    }
    
})*/

//questa è la get per richiamare un singolo post tramite id
/*router.get("/:id", async (req,res)=>{
        const {id} =req.params
        try {
            const post = await Post.findById(id)
            res.send(post) 
        } catch (error) {
            res.status(404).send({message: 'Not Found'})
        }
    
})*/

/*router.post("/", async (req,res)=>{
    //crea un nuova istanza del modello autore con i dati definiti nella parentesi tonde (prendendoli dal body)
    // console.log(req.body)
    const post = new Post (req.body)
    //res.send("sono la post che crea un nuovo post")
    try {
        //salva i dati prendendoli nel db , prendendoli dall'istanza
        const newPost = await post.save()
        //se è andato tutto bene mando la mail
        await transport.sendMail({
            from: 'noreply@epicoders.com', // sender address
            to: newPost.author, // list of receivers
            subject: "New Post", // Subject line
            text: "You have created a new blog post!", // plain text body
            html: "<b>You have created a new blog post!</b>" // html body
        })
        //invia i dati al database
        res.send(newPost)
    } catch (error) {
        res.status(400).send(error)
    }
})*/

/*router.put("/:id", async (req,res)=>{
    const {id} =req.params
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
        await post.save();
        // res.send(`sono la put e modifico il post con id ${id}`)
        res.status(200).send(post)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
})*/

/*router.delete("/:id", async (req,res)=>{
    const {id} =req.params
    try {
        if (await Post.exists({_id:id})){
            await Post.findByIdAndDelete(id)
            res.status(200).send(`ho eliminato il post con id: ${id}`)
        }else{res.status(404).send({message: `ID ${id} not found`})}   
    } catch (error) {
        res.status(404).send({message: `ID ${id} not found`})
    }
    
})*/

/*router.patch('/:blogPostId/cover', uploadCloudinary.single('cover'),async (req,res)=>{ //importo il middlware uploadCloudinary
    const {blogPostId} =req.params
    try {
        const post = await Post.findByIdAndUpdate(blogPostId, {cover: req.file.path}, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
        await post.save();//non è necessario
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send(error)
    }
    
})*/


export default router
