import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {firebase, db} from './utils/firebase';


class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {post} = this.props;

    return (
      <div>
        <h1>{post.title}</h1>
        {
          post.img &&
          <img src={post.img} />
        }
        <div>
          {post.text}
        </div>
      </div>
    )
  }
}


class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    }

    db.collection("posts").get()
    .then(snapshot => {
      let posts = [];
      snapshot.forEach(doc => {
        posts.push({
          id: doc.id,
          ...doc.data()
        })
      });
      this.setState({posts});
    })
    .catch(err => console.error(err));
  }
  render() {
    return (
      <div className="App">
        {
          this.state.posts.map( post => <Post post={post} />)
        }
      </div>
    );
  }
}

export default App;
