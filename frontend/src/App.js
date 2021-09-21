import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import img from './profile.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      users: [],
      newText: '',
      isLoggedIn: false,
      registerEmail: '',
      registerPassword1: '',
      registerPassword2: '',
      registerUsername: '',
      loginEmail: '',
      loginPassword: '',
      loginError: false,
      registerError: false,
      currentEmail: '',
      currentUser:null,
      registerUser: false,
    };
    this.refreshList();

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegEmail = this.handleRegEmail.bind(this);
    this.handleRegPassword1=this.handleRegPassword1.bind(this);
    this.handleRegPassword2 = this.handleRegPassword2.bind(this);
    this.handleRegUsername=this.handleRegUsername.bind(this);
    this.register = this.register.bind(this);
    this.handleLoginEmail = this.handleLoginEmail.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/tweets/")
      .then((res) => this.setState({tweets : res.data}))
      .catch((err) => console.log(err))
    
    axios
      .get("/api/users/")
      .then((res) => this.setState({users : res.data}))
      .catch((err) => console.log(err))
    
    for (let i = 0; i < Object.keys(this.state.users).length; i++) {
      if (this.state.users[i].email === this.state.currentEmail) {
        this.setState({currentUser: this.state.users[i].id});
      };
    }
  }

  handleTextChange(event) {
    this.setState({newText : event.target.value})
  }

  handleSubmit(event) {
    var currentDate = new Date();
    var user = null;
    var date = currentDate.getFullYear()+ '-' + (currentDate.getMonth()+1)+ '-' + currentDate.getDate()+'T' + currentDate.getHours()+":"+currentDate.getMinutes()+":00Z"
    for (let i = 0; i < Object.keys(this.state.users).length; i++) {
      if (this.state.users[i].email === this.state.currentEmail) {
        this.setState({currentUser: this.state.users[i].id});
        user = this.state.users[i].id;
      };
    }
    
    const item = {
      user: user,
      post_text: this.state.newText,
      likes: [],
      image: null,
      pub_date: date,
    }
    console.log(item)
    axios
      .post("/api/tweets/", item)
      .then((res) => this.refreshList());
  }

  handleLike(item) {
    var tempLikes = item.likes.slice();
    const id = item.id;
    tempLikes.push(this.state.currentUser);
    const newTweet = {
      id: item.id,
      user: item.user,
      post_text: item.post_text,
      likes: tempLikes,
      image: item.image,
      pub_date: item.pub_date.substring(6, 10)+'-'+item.pub_date.substring(0, 2)+'-'+item.pub_date.substring(3, 5)+'T'+item.pub_date.substring(11, 16)+":00Z",
    };
    console.log(newTweet);
    axios
      .put("/api/tweets/"+ id +"/", newTweet)
      .then((res) => this.refreshList())
      .catch((error) => {
        console.log(error.response)
      });
  }

  handleUnlike(item) {
    var tempLikes = item.likes.slice();
    const id = item.id;
    tempLikes.splice(item.likes.indexOf(this.state.currentUser), 1);
    const newTweet = {
      id: item.id,
      user: item.user,
      post_text: item.post_text,
      likes: tempLikes,
      image: item.image,
      pub_date: item.pub_date.substring(6, 10)+'-'+item.pub_date.substring(0, 2)+'-'+item.pub_date.substring(3, 5)+'T'+item.pub_date.substring(11, 16)+":00Z",
    };
    console.log(newTweet);
    axios
      .put("/api/tweets/"+ id +"/", newTweet)
      .then((res) => this.refreshList())
      .catch((error) => {
        console.log(error.response)
      });
  }
  handleRegEmail(event) {
    this.setState({registerEmail : event.target.value})
  }

  handleRegPassword1(event) {
    this.setState({registerPassword1: event.target.value})
  }

  handleRegPassword2(event) {
    this.setState({registerPassword2: event.target.value})
  }

  handleRegUsername(event) {
    this.setState({registerUsername: event.target.value})
  }

  handleChange(event) {
    this.setState(prevstate =>
      ({registerUser : !prevstate.registerUser})
    )
  }

  register(event) {
    event.preventDefault();

    const user = {
      email: this.state.registerEmail,
      username: this.state.registerUsername,
      password1: this.state.registerPassword1,
      password2: this.state.registerPassword2,
    };

    fetch ('http://127.0.0.1:8000/api/v1/users/auth/register/', {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key)
          this.setState({currentEmail: user.email})
          this.setState({isLoggedIn : true});
          this.refreshList();
        } else {
          this.setState({registerEmail: ''});
          this.setState({registerPassword1: ''});
          this.setState({registerPassword2: ''});
          this.setState({registerUsername: ''});
          this.setState({registerError: 'true'});
          localStorage.clear();
        }
        });
  };

  handleLoginEmail(event) {
    this.setState({loginEmail : event.target.value})
  }
  
  handleLoginPassword(event) {
    this.setState({loginPassword: event.target.value})
  }

  login(event) {
    event.preventDefault();

    const user = {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
    };

    
    fetch ('http://127.0.0.1:8000/api/v1/users/auth/login/', {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key);
          this.setState({currentEmail : user.email})
          this.setState({isLoggedIn : true});
          this.refreshList();
        } else {
          this.setState({loginEmail: ''});
          this.setState({loginPassword: ''});
          this.setState({loginError: true});
          localStorage.clear();
        }
        });
  };

  renderTweets = () => {
    const tweetList = this.state.tweets;
    
    return tweetList.map((item) => (
      <li key = {item.id}
      className = "list-group-item d-flex justify-content-between align-items-center">
        <span className="tweets">
          <img className="profile-pic-post" src={img} alt="profilepic"/>
          <h2>{this.state.users[item.user - 1].username} </h2>
          <br/>
              {item.post_text} 
          <br/>
          {item.likes.includes(this.state.currentUser) && 
            <div>
              <button className = "btn btn-primary">{item.likes.length} Likes </button>
              <button className = "btn btn-danger" onClick={()=>this.handleUnlike(item)}>Unlike</button>
            </div>
          }
          {!item.likes.includes(this.state.currentUser) &&
            <button className = "btn btn-primary" onClick={()=>this.handleLike(item)}>{item.likes.length} Likes</button>
          }
        </span>
      </li>
    ));
  };


  render() {
    return (
      <div>
      { this.state.isLoggedIn && 
      <main className="bg-white">
        <h1 className="text-black text-center bg-info my-4">Twitter Replica</h1>
        <div class = "input-group mb-3 col-md-6 col-sm-10 mx-auto">
          <input type="text" className = "form-control form-control-lg flex-nowrap mx-auto" placeholder = "enter tweet here" value = {this.state.newText} onChange = {this.handleTextChange}/>
          <div className = "input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.handleSubmit}>Tweet!</button>
          </div>
        </div>
        <div className="flex-container">
          <div className="col-md-6 col-sm-10 mx-auto p-0 text-wrap">
                {this.renderTweets()}
          </div>
        </div>
      </main>
      }
      { !this.state.isLoggedIn && !this.state.registerUser &&
      <main className>
        <h1 className="text-black text-center bg-info my-4">Twitter Replica</h1>
        <div class="wrapper fadeInDown">
          <div id = "formContent">
            <form>
              <h2>Sign in </h2>
              {this.state.loginError === true && <h2 className="text-danger"> Cannot Login With the Provided Credentials</h2>}
              <br/>
              <input type = "text" id = "email" className = "fadeIn second" name = "email" placeholder = "email" value = {this.state.loginEmail} onChange = {this.handleLoginEmail}/>
              <br/>
              <input type = "password" id = "password" className = "fadeIn third" name = "password" placeholder = "password" value = {this.state.loginPassword} onChange = {this.handleLoginPassword}/>
              <br/>
              <input type = "submit" className = "fadeIn fourth" value = "Sign In" onClick={this.login}/>
            </form>
            <div id="formFooter">
              <br/>
              <button className = "underlineHover" onClick={this.handleChange}>Register</button>
            </div>
          </div>
        </div>
      </main>
      }
      { !this.state.isLoggedIn && this.state.registerUser &&
      <main className>
        <h1 className="text-black text-center bg-info my-4">Twitter Replica</h1>
        <div class="wrapper fadeInDown">
          <div id = "formContent">
            <form>
              <h2>Register </h2>
              <br/>
              {this.state.registerError && <h2 className = "text-danger">Username or Email already taken!</h2>}
              <br/>
              <input type = "text" id = "regemail" className = "fadeIn second" name = "email" placeholder = "email" value = {this.state.registerEmail} onChange = {this.handleRegEmail}/>
              <br/>
              <input type = "username" id = "regusername" className = "fadeIn third" name = "username" placeholder = "username" value = {this.state.registerUsername} onChange = {this.handleRegUsername}/>
              <br/>
              <input type = "password" id = "password1" className = "fadeIn fourth" name = "password1" placeholder = "password" value = {this.state.registerPassword1} onChange = {this.handleRegPassword1}/>
              <br/>
              <input type = "password" id = "password2" className = "fadeIn fourth" name = "password2" placeholder = "enter password again" value = {this.state.registerPassword2} onChange = {this.handleRegPassword2}/>
              <br/>
              <input type = "submit" className = "fadeIn fifth" value = "Register!" onClick={this.register}/>
            </form>
            <div id="formFooter">
              <button type="submit" className = "underlineHover" onClick={this.handleChange}>Already Have An Account?</button>
            </div>
          </div>
        </div>
      </main>
      }
      </div>
    );
  }

}

export default App;

