import React, { useEffect, useState } from "react";
import { onChildAdded, ref as databaseRef } from "firebase/database";
import { database } from "./Firebase";
import "./NewsFeed.css";
import Card from "react-bootstrap/Card";

const POSTS_FOLDER_NAME = "posts";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = databaseRef(database, POSTS_FOLDER_NAME);
    onChildAdded(postsRef, (data) => {
      const value = data.val();
      setPosts((state) => [
        ...state,
        {
          key: data.key,
          image: value.imageLink,
          author: value.authorEmail,
          caption: value.caption,
          location: value.locationName,
          rating: value.rating,
        },
      ]);
    });
  }, []);

  let postCards = posts.map((post) => (
    <Card key={post.key} className="Card">
      <Card.Img variant="top" src={post.image} className="Card-Img" />
      <Card.Text>Rating: {post.rating}</Card.Text>
      <Card.Text>Caption: {post.caption}</Card.Text>
      <Card.Text>Location: {post.location}</Card.Text>
      <Card.Text>Author: {post.author}</Card.Text>
    </Card>
  ));
  postCards.reverse();
  return postCards;
};

export default NewsFeed;
