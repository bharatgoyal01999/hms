import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import { Alert } from 'react-native';

export const registerDoctor = (email, Password,name,lic,spec,phone) => {
  if(email && Password){
  
  firebase.auth()
  .createUserWithEmailAndPassword(email, Password)
  .then(() => {
    alert('User account created & signed in!');
    const user = firebase.auth().currentUser
    if(user){
      AsyncStorage.setItem("UID",user.uid);
      const path_ref=firebase.database().ref('/Doctor').child(user.uid).child('personalInfo')
      const Personal_Info={
        Name:name,
        Email:email,
        LicenseNumber:lic,
        Speciality:spec,
        Phone: phone,
      }
      path_ref.set(Personal_Info)
    }
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      alert('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      alert('That email address is invalid!');
    }

    console.error(error);
    alert(error)
  });
  return user.name;
}
  else{
    alert('Enter details to signup!')
  }
}


export const registerUser = (user_details) => {
  console.log(user_details)
  if(user_details.Email && user_details.Password){
  firebase
  .auth()
    .createUserWithEmailAndPassword(user_details.Email, user_details.Password)
    .then( async () => {
     
      const user = await firebase.auth().currentUser;
     console.log(firebase.auth().currentUser)
      if(user){
        AsyncStorage.setItem("UID",user.uid);
        const path_ref=firebase.database().ref('/User').child(user.uid).child('personalInfo')
        const Personal_Info={

          Name:user_details.Name ,
          Email:user_details.Email,
          Phone: user_details.Phone,
          Age:user_details.Age,
          height:user_details.height,
          weight:user_details.weight

        }
        path_ref.set(Personal_Info)
        alert('User account created & signed in!');
     
      }
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      }
  
      console.error(error);
      alert(error)
    });
   
  }
    else{
      alert('Enter details to signup!')
    }
  }


  export const loginUser = (email, Password) => {
    if(email && Password){
    firebase.auth().signInWithEmailAndPassword(email, Password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-Password') {
        alert('Wrong Password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
  else{
    alert('Enter details to login!')
  }
}

export const logoutUser = () =>{
  firebase.auth().signOut()
  .then(() => {
  console.log('Signed Out');
})
.catch(error=>{
 console.error('Sign Out Error', error);
});
}

