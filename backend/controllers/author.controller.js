import AuthorR from "../models/authorRegSchema.js";

export const getAuthors = async (req, res) => {
  const page = req.query.page || 1;
  let perPage = req.query.perPage || 5;
  perPage = perPage > 10 ? 5 : perPage;
  try {
    const allAuthors = await AuthorR.find({})
      .collation({ locale: "it" }) //serve per ignorare maiuscole e minuscole nell'ordine alfabetico del sort
      .sort({ name: 1, surname: 1 })
      .skip((page - 1) * perPage) //salto la pagina precedente
      .limit(perPage);
    const totalResults = await AuthorR.countDocuments(); // mi da il numero totale di documenti
    const totalPages = Math.ceil(totalResults / perPage);
    // res.send(allAuthors)
    res.send({
      dati: allAuthors,
      totalResults,
      totalPages,
      page,
    });
  } catch (error) {
    res.status(404).send({ message: "Not Found" });
  }
};

export const getSingleAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await AuthorR.findById(id);
    res.status(200).send(author);
  } catch (error) {
    res.status(404).send({ message: "Not Found" });
  }
};

export const addAuthor = async (req, res) => {
  //crea un nuova istanza del modello autore con i dati definiti nella parentesi tonde (prendendoli dal body)
  // console.log(req.body)
  const author = new AuthorR(req.body);
  author.avatar = author.avatar ? author.avatar : "https://picsum.photos/40"; //se l'avatar c'è me lo restituisci così com'è altrimenti mi restituisci la stringa "https://picsum.photos/40"
  try {
    //salva i dati prendendoli nel db , prendendoli dall'istanza
    const newAuthor = await author.save();
    //invia i dati al database
    res.status(200).send(newAuthor);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const editAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await AuthorR.findByIdAndUpdate(id, req.body, { new: true }); //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
    await author.save();
    // res.send(`sono la put e modifico l'autore con id ${id}`)
    res.status(200).send(author);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    //se l'id esiste nello schema allora fai la delete
    if (await AuthorR.exists({ _id: id })) {
      await AuthorR.findByIdAndDelete(id);
      res.status(200).send(`ho eliminato l'autore con id: ${id}`);
    } else {
      res.status(404).send({ message: `ID ${id} not found` });
    }
  } catch (error) {
    res.status(404).send({ message: `ID ${id} not found` });
  }
};

export const patchAuthor = async (req, res) => {
  //importo il middlware uploadCloudinary
  const { authorId } = req.params;
  try {
    const author = await AuthorR.findByIdAndUpdate(authorId, { avatar: req.file.path }, { new: true }); //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
    await author.save(); //non è necessario
    res.status(200).send(author);
  } catch (error) {
    res.status(400).send(error);
  }
}; //uso patch per modificare il contenuto sul server di una risorsa che esiste già sul db.
