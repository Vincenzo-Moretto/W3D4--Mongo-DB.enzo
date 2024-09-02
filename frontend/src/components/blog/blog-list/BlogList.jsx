import { Col, Row } from "react-bootstrap";
// import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { loadPosts } from "../../../data/fetch";
import React, { useEffect, useState } from "react";

const BlogList = () => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    loadPosts().then(data => setPosts(data.dati))
  },[])
  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
