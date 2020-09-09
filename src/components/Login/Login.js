import React, { useState, useContext } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword} from './LoginManager';



function Login() {
  const [newUser, setNewUser] =useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext) 
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (response, redirect) => {
    setUser(response);
    setLoggedInUser(response);
    if(redirect){
        history.replace(from);
    }
  }
  
  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(response => {
        handleResponse(response, true)
      })
  }

  const signOut = () => {
      handleSignOut()
      .then(response => {
          handleResponse(response, false);    
      })
  }

//   const handleResponse = (response, redirect) => {
//     setUser(response);
//     setLoggedInUser(response);
//     if(redirect){
//         history.replace(from);
//     }
//   }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(response => {
        handleResponse(response, true)
    })
}
  
  
  

  const handleSubmit = (event) => {
    //console.log(user.email, user.password)
    if(newUser && user.email && user.password){
       //console.log('submitting')
      
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(response => {
            handleResponse(response, true)
        })
      
    }
    
    if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(response => {
            handleResponse(response, true)
        })
    }

    event.preventDefault()
  }

  

 

  const handleBlur = (event) => {
    let isFieldValid;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isFieldValid);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test( event.target.value)
      isFieldValid = isPasswordValid && passwordHasNumber;

    }
    if(event.target.name === 'name'){
      isFieldValid = event.target.value;
      console.log(isFieldValid);
    }
    if(isFieldValid){
     const newUserInfo = {...user};
     newUserInfo[event.target.name] = event.target.value;
     setUser(newUserInfo);

    }
     //console.log(event.target.value);
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign Facebook</button>
      {
        user.isSignedIn && <div>
        <p> Welcome, {user.name}</p>
        
        <p>Email: {user.email}</p>
        <img src={user.photo} alt=""/>
        </div>
      }


      <h1> Our Own Authentication</h1>
      
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit} action="">
        {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='name' required/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="write your email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="your password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Submit' : 'Sign In'}></input>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'logged in'} success!</p>
      }
    </div>
  );
}

export default Login;
