import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword} from './LoginManager';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function Login() {

  const classes = useStyles();

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

  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
        <Button style={{margin: '8px',outline: 'none'}} color="secondary"  variant="contained" onClick={googleSignIn}>
        <PersonPinIcon style={{marginRight:'5px'}}></PersonPinIcon>Sign In With Google
        </Button>
      }
      <br/>
      {/* <button onClick={fbSignIn}>Sign Facebook</button> */}
      <Button style={{margin: '8px', outline: 'none'}} onClick={fbSignIn} variant="contained" color="primary">
        <FacebookIcon style={{marginRight:'5px'}}></FacebookIcon>Sign in with Facebook
      </Button>
      <br/>

      {/* <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/> */}
      {/* <label htmlFor="newUser">New User Sign Up</label> */}
      {/* <form onSubmit={handleSubmit} action="">
        {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='name' required/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="write your email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="your password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Submit' : 'Sign In'}></input>
      </form> */}

      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
     { newUser && <TextField id="outlined-basic" name='name' onBlur={handleBlur} placeholder='enter your name' required label="Name" variant="outlined" />}
     <br/>
      <TextField id="outlined-basic" label="Email" variant="outlined" name="email" onBlur={handleBlur} placeholder="enter your email" required/>
      <br/>
      <TextField type='password' id="outlined-basic" label="Password" variant="outlined" name="password" onBlur={handleBlur} placeholder="enter your password" required />
      <br/>
      <Button type="submit" style={{outline: 'none'}} variant="contained" color="primary">
        {newUser ? 'Submit' : 'Sign In'}
      </Button>
    </form>

    <FormControlLabel
        control={<Checkbox onChange={handleChange}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        onChange={() => setNewUser(!newUser)} 
        name="newUser" />}
        label="New Here? Please, Sign Up"
      />


      {/* <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'logged in'} success!</p>
      } */}
    </div>
  );
}

export default Login;
