import React, { useEffect } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadAuthors, loadPosts} from "./data/fetch";
import AuthorContextProvider from "./context/AuthorContextProvider";

function App() {
  // useEffect(()=> {
  //   loadAuthors().then((data => console.log(data)))
  // },[])
  useEffect(()=> {
    loadPosts().then((data => console.log(data)))
  },[])

  return (
    <AuthorContextProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
    </AuthorContextProvider>
  );
}

export default App;
