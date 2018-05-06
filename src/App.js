import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {firebase, db} from './utils/firebase';

class WriteForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form className="Write-form">
        <input type="text" />
        <textarea />
        <button>submit</button>
      </form>
    )
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  render() {
    const {tryLogin} = this.props;

    return (
      <form onSubmit={ ev => {
        ev.preventDefault();
        tryLogin(this.state.email, this.state.password);
      }}>
        <input type="text" value={this.state.email} placeholder="email" onChange={ (ev) => {
          this.setState({email : ev.target.value});
        }} />
        <input type="password" value={this.state.password} onChange={ (ev) => {
          this.setState({password : ev.target.value});
        }} />
        <button>login</button>
      </form>
    );
  }
}

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {post} = this.props;

    return (
      <div className="Post">
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
      posts: [],
      user: {isLoggedIn: false, name: "guest"}
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.isLoggedIn = true;
        user.name = user.email.split("@")[0]
        this.setState({user});
      } else {
        this.setState({user: {isLoggedIn: false, name: "guest"}});
      }
    });

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

    this.tryLogin = this.tryLogin.bind(this);
  }

  tryLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.posts.map( post => <Post key={post.id} post={post} />)
        }

        {
          !this.state.user.isLoggedIn && <LoginForm tryLogin={this.tryLogin} />
        }
        {
          this.state.user.isLoggedIn && <WriteForm />
        }
      </div>
    );
  }
}

export default App;
