import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { AuthorContext } from "../../context/AuthorContextProvider";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { login } from "../../data/fetch";




const Home = props => {
  const {token, setToken} = useContext(AuthorContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formValue, setFormValue] = useState({email:"", password:""})

  const handleChange = (event) =>{
    setFormValue({
      ...formValue, 
      [event.target.name] : event.target.value
    })
  }

  const handleLogin = async () => {
    const tokenObj = await login(formValue) //così abbiamo il token da mettere nel localstorage
    localStorage.setItem('token', tokenObj.token) //lssetitem accetta 2 parametri: la chiave con cui vuoi salvare e poi il valore
    setToken(tokenObj.token) //dentro token obj c'è la risposta completa dell'end point che è un oggetto e noi dobbiamo prendere solo la propiretà token
    handleClose()
  }

  // console.log(posts)
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      {!token && <Button variant="primary" onClick={handleShow}>
        Login
      </Button>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" onChange={handleChange} placeholder="la tua password" />
      </Form.Group>
      </Form>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login now
          </Button>
        </Modal.Footer>
      </Modal>
     {token && <BlogList />}
    </Container>
  );
};

export default Home;
