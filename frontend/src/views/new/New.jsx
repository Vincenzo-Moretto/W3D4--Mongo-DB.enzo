import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import {convertToRaw} from "draft-js"
import draftToHtml from "draftjs-to-html"
import { newPost } from "../../data/fetch";
import Alert from 'react-bootstrap/Alert';


const NewBlogPost = props => {
  const [text, setText] = useState("");
  const [cover, setCover] = useState("");
  
  const initialFormValue = {
    category: "",
    title: "",
    cover: "",
    readTime: {
        value: 0,
        unit: ""
    },
    author: "66d1cf98c91a0ac1fe5d7b1a",
    content: ""
  }
  const [formValue, setFormValue] = useState(initialFormValue)
  const handleChangeFormValue = (event) =>{
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeImage = (event) =>{
    handleChangeFormValue(event)
    setCover(event.target.files[0])
  }

  const handleChange = useCallback(value => {
  
    setText(draftToHtml(value));
    console.log(text)
    // console.log(convertToRaw(value.getCurrentContent()))
    setFormValue({
      ...formValue,
      content:draftToHtml(value) //questo drafToHtml(value) prende il valore della text area e lo converte in html
    })
  });

  return (
    
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          {/* l'onChange cattura l'evento e lo passa alla funzione */}
          <Form.Control size="lg" placeholder="Title" name="title" onChange={(event)=>handleChangeFormValue(event)} />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" name="category" onChange={(event)=>handleChangeFormValue(event)}>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId="cover" className="mt-3 mb-3" >
        <Form.Label>Cover</Form.Label>
        <Form.Control type="file" name="cover" onChange={handleChangeImage} />
      </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="button"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }} onClick={()=>newPost(formValue,cover)}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
