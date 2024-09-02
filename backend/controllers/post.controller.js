import Post from '../models/postSchema.js'
import Author from '../models/authorSchema.js'
import AuthorR from '../models/authorRegSchema.js'
import Comment from '../models/commentSchema.js'
import transport from '../services/mailService.js';

export const getPost = async (req,res)=>{
    const page = req.query.page || 1
    let perPage = req.query.perPage || 8
    perPage = perPage > 10 ? 8 : perPage
    try {
        const allPosts = await Post.find(req.query.title? {title: {$regex: req.query.title ,$options: "i"}}: {}) //il find sulla ricerca di un post con il titolo
        .collation({locale: 'it'}) //serve per ignorare maiuscole e minuscole nell'ordine alfabetico del sort
        .sort({ title:1, category:1})
        .skip((page-1)*perPage)
        .limit(perPage)
        .populate('author')

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
}

export const getSinglePost = async (req,res)=>{
    const {id} =req.params
    try {
        const post = await Post.findById(id)
        .populate('author')
        res.send(post) 
    } catch (error) {
        res.status(404).send({message: 'Not Found'})
    }
}

export const addPost = async (req,res)=>{
    //crea un nuova istanza del modello autore con i dati definiti nella parentesi tonde (prendendoli dal body)
    // console.log(req.body)
    const post = new Post ({...req.body, cover: req.file.path, readTime: JSON.parse(req.body.readTime)})
    // const post = new Post (req.body)
    let newPost
    //res.send("sono la post che crea un nuovo post")
    try {
        //salva i dati prendendoli nel db , prendendoli dall'istanza
        newPost = await post.save()
        //se è andato tutto bene mando la mail
        //invia i dati al database
        res.send(newPost) //non facciamo il return sennò non fa il try catch successivo
    } catch (error) {
       return res.status(400).send(error) //qui ci vuole il return perchè non devo inviare la mail di post creato con successo
    }
    try {
        const author = await AuthorR.findById(newPost.author)
        await transport.sendMail({
            from: 'noreply@epicoders.com', // sender address
            to: author.email, // list of receivers
            subject: "New Post", // Subject line
            text: "You have created a new blog post!", // plain text body
            html: "<b>You have created a new blog post!</b>" // html body
        })
    } catch (error) {
        console.log(error)
    }
}

export const editPost = async (req,res)=>{
    const {id} =req.params
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
        await post.save();
        // res.send(`sono la put e modifico il post con id ${id}`)
        res.status(200).send(post)
        
    } catch (error) {
        res.status(400).send(error)
    }
}

export const deletePost = async (req,res)=>{
    const {id} =req.params
    try {
        if (await Post.exists({_id:id})){
            await Post.findByIdAndDelete(id)
            res.status(200).send(`ho eliminato il post con id: ${id}`)
        }else{res.status(404).send({message: `ID ${id} not found`})}   
    } catch (error) {
        res.status(404).send({message: `ID ${id} not found`})
    }  
}

export const patchPost = async (req,res)=>{ //importo il middlware uploadCloudinary
    const {blogPostId} =req.params
    try {
        const post = await Post.findByIdAndUpdate(blogPostId, {cover: req.file.path}, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
        await post.save();//non è necessario
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send(error)
    }
}


