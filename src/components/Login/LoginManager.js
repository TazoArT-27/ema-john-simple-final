import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
}
    }

export const handleGoogleSignIn = () => {

    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
    .then(result => {
      const {displayName, photoURL, email} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      setUserToken();
      //sessionStorage.setItem('token', signedInUser);
      return(signedInUser);
      //console.log(displayName, photoURL, email)
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    
    })
  }

  const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token', idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

     return firebase.auth().signInWithPopup(fbProvider)
     .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
      
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

 export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(result => {
      const signedOutUser = {
        isSignedIn: false,
        name:'',
        photo: '',
        email: '',
      }
      return(signedOutUser)
    })
    .catch(error => {
        
    })
  }

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    // Handle Errors here.
    .then(response => {
      const newUserInfo = response.user;
      newUserInfo.error = '';
      //console.log(response)
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })

    .catch(error =>{
    const newUserInfo = {};
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorCode,errorMessage)
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
    
    })
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(response => {
      const newUserInfo = response.user;
        newUserInfo.error = '';
        //console.log(response)
        newUserInfo.success = true;
        return newUserInfo;
        //console.log('sign in user info', response.user)
    })
    .catch(function(error) {
      const newUserInfo = {};
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode,errorMessage)
      newUserInfo.error = error.message;
      newUserInfo.success = false;
    //   setUser(newUserInfo);
      return newUserInfo;
    });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
        
      }).then(function() {
        // Update successful.
        //console.log(username updated successfully)
      }).catch(function(error) {
        // An error happened.
      });
  }


const LoginManager = () => {
    return (
        <div>
            
        </div>
    );
};

export default LoginManager;