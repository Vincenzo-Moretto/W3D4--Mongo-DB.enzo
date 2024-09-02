import jwt from "jsonwebtoken";
import AuthorR from "../models/authorRegSchema.js";

export default (req, res, next) => {
  //verificare se c'è l'header Authorization e se è di tipo Bearer
  //// Authorization: Bearer asdhklasdre.bkjdskdfhkshksdfjsdbf.ddsf
  if (!req.headers.authorization) return res.status(401).send();
  const parts = req.headers.authorization.split(" ");
  if (parts.length != 2) return res.status(401).send();
  if (parts[0] != "Bearer") return res.status(401).send();

  const jwtToken = parts[1];

  //verificare la firma del token
  jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, payload) => {
    //errore: probabilmente il token è stato manomesso
    if (err) return res.status(401).send();

    //recuperiamo i dati dell'utente dal database escludendo il campo password
    const author = await AuthorR.findById(payload.authorId); //.select('-password');

    //l'utente potrebbe aver eliminato l'account nel frattempo quindi non esistere più nel db
    if (!author) return res.status(401).send();

    //aggiungiamo i dati dell'utente loggato all'oggetto req in maniera da
    //essere utilizzabili dai middlwares successivi in caso ne avessero bisogno
    req.loggedAuthor = author;
    console.log(author);

    //chiamiamo il prossimo middleware
    next();
  });
};
